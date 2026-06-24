/**
 * AI provider abstraction.
 *
 * Currently uses Groq (Llama 3.3 70B, free tier, no card).
 * See DEC-003 in DECISIONS.md.
 *
 * To swap to a different provider later (Claude, GPT, Gemini),
 * you only change this file + the GROQ_API_KEY env var.
 * Nothing else in the app needs to change.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

/**
 * Get a response from the AI for the tutor chat.
 * Returns plain text.
 */
export async function getAiResponse(
  userMessage: string,
  systemPrompt: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    throw new Error(
      "GROQ_API_KEY is not set. Add it to .env.local. See MANUAL_TASKS.md MT-001."
    );
  }

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...conversationHistory.slice(-6).map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userMessage },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 1024,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AI] Groq API error ${response.status}:`, errorText);
      throw new Error(`AI service returned an error (${response.status}).`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || content.trim().length === 0) {
      throw new Error("AI returned an empty response.");
    }

    return content.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    const err = error as { name?: string; message?: string };
    if (err.name === "AbortError") {
      throw new Error("AI request timed out. Please try again.");
    }
    throw error;
  }
}

/**
 * Get a structured marking response from the AI.
 * Parses the JSON response and returns it.
 */
export async function getMarkingResponse(
  userMessage: string,
  systemPrompt: string
): Promise<Record<string, unknown>> {
  const raw = await getAiResponse(userMessage, systemPrompt);

  try {
    // Extract JSON from the response (handles markdown code fences too)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : raw;
    return JSON.parse(cleanJson);
  } catch {
    console.error("[AI] Failed to parse marking JSON:", raw);
    // Return a safe fallback so the UI doesn't crash
    return {
      score: 0,
      outOf: 0,
      percentage: 0,
      grade: "F",
      keyPointsEarned: [],
      keyPointsMissed: ["Could not generate feedback. Please try again."],
      feedback: "We received your answer but had trouble generating feedback. Please try again.",
      improvedAnswer: "N/A",
      examTip: "Keep practicing!",
    };
  }
}
