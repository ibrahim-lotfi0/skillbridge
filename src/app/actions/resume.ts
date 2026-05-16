"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseResume } from "@/lib/gemini";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");
import { revalidatePath } from "next/cache";

export async function uploadResumeAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("resume") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // 1. Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // 2. Parse text into JSON using Gemini
    const parsedData = await parseResume(resumeText);

    // 3. Update or create Profile in DB
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: parsedData.summary,
        skills: parsedData.skills,
        parsedData: parsedData,
        // In a real app, we'd upload the file to S3/Cloudinary here and save the URL
        resumeUrl: "mock_url_placeholder", 
      },
      create: {
        userId: session.user.id,
        bio: parsedData.summary,
        skills: parsedData.skills,
        parsedData: parsedData,
        resumeUrl: "mock_url_placeholder",
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: parsedData };
  } catch (error) {
    console.error("Resume Upload Error:", error);
    return { success: false, error: "Failed to process resume" };
  }
}
