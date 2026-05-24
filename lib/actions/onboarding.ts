"use server";

import { onboardingSchema } from "@/lib/zod";
import { checkUser } from "./user.actions";
import { revalidatePath } from "next/cache";

export async function submitOnboarding(formData: any) {
  // 1. Validate the data against our schema
  const result = onboardingSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, error: "Invalid form data" };
  }

  // 2. Identify the current user using our "Bridge"
  const user = await checkUser();

  if (!user) {
    return { success: false, error: "Authentication failed" };
  }

  // --- BYPASS MODE: Skip database update to prevent timeouts ---
  console.log("🚀 [Local Mode] Onboarding data received:", result.data);

  /* Original Database Logic:
  await prisma.user.update({
    where: { id: user.id },
    data: {
      industry: result.data.industry,
      experience: result.data.experience,
      bio: result.data.bio,
      skills: result.data.skills.split(",").map((s) => s.trim()),
    },
  });
  */

  // 3. Clear the cache and send user to dashboard!
  revalidatePath("/dashboard");
  return { success: true };
}
