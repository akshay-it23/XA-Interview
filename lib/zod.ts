// --- BOILERPLATE: Standard Zod setup ---
import { z } from "zod";

// --- CORE LOGIC: The "Contract" for Onboarding ---
export const onboardingSchema = z.object({
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  experience: z
    .string() // We'll receive a string from the browser input
    .transform((val) => parseInt(val, 10)) // CORE LOGIC: Convert string "5" to number 5
    .pipe(z.number().min(0).max(50)), // Ensure it's a realistic number (0 to 50)
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500),
  skills: z.string().min(2, "Please enter at least one skill"),
});
