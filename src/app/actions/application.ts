"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { matchCandidateToJob } from "@/lib/gemini";
import { revalidatePath } from "next/cache";

export async function applyToJobAction(jobId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "You must be logged in to apply" };
    }

    const userId = session.user.id;

    // Check if user has a profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user?.profile?.parsedData) {
      return { 
        success: false, 
        error: "Please upload and parse your resume before applying so we can match you with the job." 
      };
    }

    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        seekerId: userId,
      },
    });

    if (existingApplication) {
      return { success: false, error: "You have already applied for this position." };
    }

    // Fetch Job Details
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { success: false, error: "Job not found" };
    }

    // Calculate/Get Match Score using AI
    let matchScore = 0;
    try {
      const matchData = await matchCandidateToJob(
        user.profile.parsedData,
        job.description + " " + ((job.requirements as string[])?.join(" ") || "")
      );
      matchScore = matchData.matchPercentage;
    } catch (e) {
      console.error("Match calculation error during application:", e);
      // Fallback to a zero score if AI fails, rather than blocking the app
    }

    // Create Application
    await prisma.application.create({
      data: {
        jobId,
        seekerId: userId,
        matchScore,
        status: "PENDING",
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath(`/dashboard`);

    return { success: true };
  } catch (error) {
    console.error("Apply Action Error:", error);
    return { success: false, error: "Failed to submit application" };
  }
}

export async function getSeekerApplicationsAction() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const applications = await prisma.application.findMany({
      where: { seekerId: session.user.id },
      include: {
        job: {
          include: { employer: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return { success: true, applications };
  } catch (error) {
    return { success: false, error: "Failed to fetch applications" };
  }
}
