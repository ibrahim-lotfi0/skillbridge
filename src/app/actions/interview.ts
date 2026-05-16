"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { geminiProModel } from "@/lib/gemini";

export async function generateInterviewQuestionsAction(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { employer: true }
    });

    if (!job) return { success: false, error: "Job not found" };

    const prompt = `
      You are an expert HR Interviewer for the role: ${job.title}.
      Job Description: ${job.description}
      Job Requirements: ${job.requirements}
      
      Generate exactly 5 professional interview questions for this specific role. 
      Include a mix of technical (3) and behavioral (2) questions.
      
      Return ONLY a JSON array of strings: ["Question 1", "Question 2", ...]
    `;

    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    const questions = JSON.parse(jsonText);

    return { success: true, questions };
  } catch (error) {
    console.error("Generate Interview Error:", error);
    return { success: false, error: "Failed to generate interview questions." };
  }
}

export async function evaluateInterviewAction(jobId: string, qaPairs: { question: string, answer: string }[]) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    const prompt = `
      You are an expert AI Interview Evaluator.
      Role: ${job?.title}
      
      Evaluate the candidate's responses to the following interview questions:
      ${JSON.stringify(qaPairs, null, 2)}
      
      Analyze each answer and provide a JSON object with:
      - overallScore: number (0-100)
      - feedback: string (Professional summary of their performance)
      - strengths: string[] (What they did well)
      - improvements: string[] (Specific advice on how to improve their answers)
      - modelAnswers: { question: string, idealPoint: string }[] (One key point they should have mentioned for each question)
      
      Return ONLY the JSON object.
    `;

    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    const evaluation = JSON.parse(jsonText);

    return { success: true, evaluation };
  } catch (error) {
    console.error("Evaluate Interview Error:", error);
    return { success: false, error: "Failed to evaluate the interview." };
  }
}

export async function getSalaryInsightsAction(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) return { success: false, error: "Job not found" };

    const prompt = `
      You are an expert Job Market Analyst.
      Analyze the following job and location:
      Title: ${job.title}
      Location: ${job.location}
      Requirements: ${job.requirements}
      
      Estimate the fair market annual salary range for this role.
      Also provide 3 factors influencing this range.
      
      Return a JSON object:
      {
        "min": number,
        "max": number,
        "currency": string,
        "confidence": "low" | "medium" | "high",
        "factors": string[]
      }
      
      Return ONLY the JSON object.
    `;

    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    return { success: true, insights: JSON.parse(jsonText) };
  } catch (error) {
    return { success: false, error: "Salary insights unavailable." };
  }
}
