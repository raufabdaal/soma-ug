import { NextRequest, NextResponse } from "next/server";
import { getMarkingResponse } from "@/lib/ai/groq";
import { MARKING_SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * AI Marking endpoint.
 *
 * Takes a student's answer to a question and returns a marked result
 * with score, grade, feedback, and a model answer.
 *
 * Uses Groq (Llama 3.3). See DEC-003.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, studentAnswer, subject, marks, markingScheme, requiredKeywords } = body;

    if (!question || !studentAnswer) {
      return NextResponse.json(
        { error: "Missing question or studentAnswer." },
        { status: 400 }
      );
    }

    // Build the prompt by filling in the template
    const prompt = MARKING_SYSTEM_PROMPT
      .replace(/\{\{SUBJECT\}\}/g, subject || "Mathematics")
      .replace(/\{\{LEVEL\}\}/g, "S3/S4")
      .replace(/\{\{TOPIC\}\}/g, "Algebra")
      .replace(/\{\{QUESTION_TEXT\}\}/g, question)
      .replace(/\{\{MARKS\}\}/g, String(marks || 4))
      .replace(/\{\{MARKING_SCHEME\}\}/g, markingScheme || "Standard UNEB marking scheme for this topic.")
      .replace(/\{\{REQUIRED_KEYWORDS\}\}/g, (requiredKeywords || []).join(", ") || "N/A")
      .replace(/\{\{COMMON_MISTAKES\}\}/g, "Sign errors, forgetting to multiply every term, not showing working")
      .replace(/\{\{STUDENT_ANSWER\}\}/g, studentAnswer);

    const result = await getMarkingResponse(studentAnswer, prompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI Mark] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
