"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createJobAction(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "EMPLOYER") {
    throw new Error("Unauthorized: Only employers can post jobs");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const salaryRange = formData.get("salaryRange") as string;
  const requirementsString = formData.get("requirements") as string;

  // Split requirements into an array
  const requirements = requirementsString
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  try {
    const job = await prisma.job.create({
      data: {
        employerId: session.user.id,
        title,
        description,
        location,
        salaryRange,
        requirements,
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard");
    return { success: true, jobId: job.id };
  } catch (error) {
    console.error("Job Creation Error:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function getJobApplicantsAction(jobId: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "EMPLOYER") {
      return { success: false, error: "Unauthorized" };
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          include: {
            seeker: {
              include: { profile: true }
            }
          },
          orderBy: { matchScore: "desc" }
        }
      }
    });

    if (!job || job.employerId !== session.user.id) {
      return { success: false, error: "Job not found or unauthorized" };
    }

    return { success: true, applications: job.applications };
  } catch (error) {
    return { success: false, error: "Failed to fetch applicants" };
  }
}

export async function updateApplicationStatusAction(applicationId: string, status: any) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "EMPLOYER") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.application.update({
      where: { id: applicationId },
      data: { status }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function toggleSavedJobAction(jobId: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const userId = session.user.id;

    const existing = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: { userId, jobId }
      }
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: { id: existing.id }
      });
      revalidatePath("/jobs");
      revalidatePath("/dashboard");
      return { success: true, saved: false };
    } else {
      await prisma.savedJob.create({
        data: { userId, jobId }
      });
      revalidatePath("/jobs");
      revalidatePath("/dashboard");
      return { success: true, saved: true };
    }
  } catch (error) {
    return { success: false, error: "Failed to toggle saved job" };
  }
}
