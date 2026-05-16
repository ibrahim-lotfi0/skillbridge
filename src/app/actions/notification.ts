"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markAsReadAction(id: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false };

    await prisma.notification.update({
      where: { id, userId: session.user.id },
      data: { read: true }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function markAllAsReadAction() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false };

    await prisma.notification.updateMany({
      where: { userId: session.user.id, read: false },
      data: { read: true }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
