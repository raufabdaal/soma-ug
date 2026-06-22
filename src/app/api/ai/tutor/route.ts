import { NextRequest, NextResponse } from "next/server";
import { getAiResponse } from "@/lib/ai/groq";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * AI Tutor endpoint.
 *
 * Takes a student's question and returns a helpful, concise answer
 * that guides understanding without doing the work for them.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, subject, topic, history } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Missing message." },
        { status: 400 }
      );
    }

    const systemPrompt = TUTOR_SYSTEM_PROMPT
      .replace(/\{\{SUBJECT\}\}/g, subject || "Mathematics")
      .replace(/\{\{LEVEL\}\}/g, "S3/S4")
      .replace(/\{\{TOPIC_TITLE\}\}/g, topic || "Algebra")
      .replace(/\{\{GENERAL_GUIDANCE\}\}/g, "Focus on showing clear working step by step. UNEB awards method marks.")
      .replace(/\{\{KEY_TERMS\}\}/g, "elimination, substitution, coefficient, variable");

    const reply = await getAiResponse(
      message,
      systemPrompt,
      history || []
    );

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[AI Tutor] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";

    // Return a friendly fallback instead of crashing
    return NextResponse.json({
      reply: "I'm having trouble connecting right now. Please try again in a moment.",
      error: message,
    });
  }
}
