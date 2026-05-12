"use server"; // --- BOILERPLATE: This MUST be the first line ---

import { checkUser } from "./user.actions";
import prisma from "@/lib/prisma";
import { onboardingSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitOnboarding(formData: any) {
  // 1. Validate the data using our "Bouncer" (Zod)
  const result = onboardingSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, error: "Invalid form data" };
  }

  // 2. Identify the current user using our "Bridge"
  const user = await checkUser();

  if (!user) {
    return { success: false, error: "Authentication failed" };
  }

  // --- CORE LOGIC: Database Update ---
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        industry: result.data.industry,
        experience: result.data.experience,
        bio: result.data.bio,
        skills: result.data.skills.split(",").map((s) => s.trim()), // "React, Next" -> ["React", "Next"]
      },
    });

    // 3. Clear the cache and send user to dashboard!
    revalidatePath("/dashboard");
    return { success: true };
    
  } catch (error) {
    console.error("Failed to save onboarding:", error);
    return { success: false, error: "Database error" };
  }
}
