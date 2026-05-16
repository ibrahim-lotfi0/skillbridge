"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { detectSkillGaps } from "@/lib/gemini";
import { revalidatePath } from "next/cache";

export async function analysisSkillGapsAction(targetRole: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  if (!user?.profile?.parsedData) {
    throw new Error("Please upload and parse your resume first");
  }

  try {
    const analysis = await detectSkillGaps(user.profile.parsedData, targetRole);

    // Save analysis to profile
    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        skillGaps: analysis,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, analysis };
  } catch (error) {
    console.error("Analysis Error:", error);
    return { success: false, error: "Failed to generate AI analysis" };
  }
}
