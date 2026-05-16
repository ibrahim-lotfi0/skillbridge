"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { geminiProModel } from "@/lib/gemini";

export async function chatWithCoachAction(messages: { role: "user" | "assistant", content: string }[]) {
  try {
    const session = await auth();
    let userContext = "";

    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true },
      });

      if (user?.profile?.parsedData) {
        userContext = `
          The user is a candidate with the following professional background:
          ${JSON.stringify(user.profile.parsedData, null, 2)}
        `;
      }
    }

    const systemInstruction = `
      You are the SkillBridge AI Career Coach. 
      Your goal is to provide expert, empathetic, and actionable career advice.
      ${userContext}
      
      Guidelines:
      1. If the user has a profile, use their background to give specific advice.
      2. help with CV improvements, interview prep, and skill development.
      3. Be concise and professional.
      4. Use formatting like bullet points to make advice readable.
      5. If they ask about jobs, encourage them to look at the "Jobs" section of SkillBridge.
    `;

    // Convert messages to Gemini format
    const chat = geminiProModel.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Add system instruction as prefix to the latest message or use a specialized chat session if supported
    // For simplicity with the current helper, we'll prepend instructions to the first prompt or as a preamble
    const latestMessage = messages[messages.length - 1].content;
    const prompt = messages.length === 1 
      ? `${systemInstruction}\n\nUser Question: ${latestMessage}`
      : latestMessage;

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, error: "The coach is currently offline (API Key Missing). Please contact support." };
    }

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return { success: true, content: response.text() };
  } catch (error) {
    console.error("Chat Action Error:", error);
    return { success: false, error: "The coach is currently unavailable. Please try again later." };
  }
}
