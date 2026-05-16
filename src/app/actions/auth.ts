"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUserAction(formData: any) {
  try {
    // MOCK DATA: Simulating registration success without database
    console.log("Mock Registration:", formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error("Registration Action Error:", error);
    return { success: false, error: "An unexpected error occurred during registration" };
  }
}
