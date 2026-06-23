import { NextRequest, NextResponse } from "next/server";
import { getAiResponse } from "@/lib/ai/groq";

/**
 * AI Practice Question Generator.
 *
 * When a student exhausts the pre-written question bank, this endpoint
 * generates fresh practice questions for a given topic.
 */

const TOPIC_INFO: Record<string, { subject: string; context: string }> = {
  "number-bases": { subject: "Mathematics", context: "converting between number bases (base 2, 5, 8, 10), place value, addition in different bases" },
  "integers": { subject: "Mathematics", context: "operations with positive and negative integers, prime factorisation, HCF, LCM" },
  "fractions-percentages-decimals": { subject: "Mathematics", context: "simplifying fractions, converting between fractions decimals and percentages, real-life percentage problems" },
  "algebra-1": { subject: "Mathematics", context: "simplifying expressions, expanding brackets, factorising, solving linear equations" },
  "business-arithmetic": { subject: "Mathematics", context: "profit, loss, percentage profit, discounts, simple interest" },
};

export async function POST(req: NextRequest) {
  let topicId = "";
  try {
    const body = await req.json();
    topicId = body.topicId || "";
    const type = body.type || "mcq";
    const difficulty = body.difficulty || "medium";

    if (!topicId) {
      return NextResponse.json({ error: "Missing topicId." }, { status: 400 });
    }

    const info = TOPIC_INFO[topicId] || { subject: "Mathematics", context: "general S1 mathematics" };

    const prompt = `You are creating a practice question for a Senior 1 student in Uganda studying ${info.subject}.
Topic: ${info.context}
Difficulty: ${difficulty}
Question type: ${type}

Create ONE original practice question that is different from standard textbook examples, appropriate for the difficulty, and relevant to Ugandan context where possible.

Return ONLY a valid JSON object:

For MCQ:
{"type":"mcq","difficulty":"${difficulty}","question":"the question","options":["A","B","C","D"],"correctIndex":0,"explanation":"why correct"}

For short answer:
{"type":"short_answer","difficulty":"${difficulty}","question":"the question","correctAnswer":"model answer","markingKey":["keyword1","keyword2"],"explanation":"how to solve"}`;

    const response = await getAiResponse(prompt, "You are a Ugandan mathematics teacher creating practice questions for S1 students. Return only valid JSON.");

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : response;
    const question = JSON.parse(cleanJson);

    question.id = `ai-${Date.now()}`;
    question.topicId = topicId;

    return NextResponse.json(question);
  } catch (error) {
    console.error("[AI Practice] Error:", error);

    return NextResponse.json({
      id: `fallback-${Date.now()}`,
      type: "mcq",
      topicId,
      difficulty: "medium",
      question: "What is 7 + 6?",
      options: ["11", "12", "13", "14"],
      correctIndex: 2,
      explanation: "7 + 6 = 13.",
    });
  }
}
