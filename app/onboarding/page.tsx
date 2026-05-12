"use client"; // --- BOILERPLATE: This MUST be a client component for forms ---

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/zod";
import { submitOnboarding } from "@/lib/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // For nice notification popups
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  // --- CORE LOGIC: Initialize the Form ---
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  // --- CORE LOGIC: Handle Form Submission ---
  const onSubmit = async (data: any) => {
    const result = await submitOnboarding(data);
    
    if (result.success) {
      toast.success("Profile updated!");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-lg shadow-xl border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Onboarding</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete your profile to start your AI interview journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- CORE LOGIC: The Form --- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="e.g. Technology, Finance" {...register("industry")} />
              {errors.industry && <p className="text-sm text-red-500 font-medium">{errors.industry.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" placeholder="5" {...register("experience")} />
              {errors.experience && <p className="text-sm text-red-500 font-medium">{errors.experience.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (Comma separated)</Label>
              <Input id="skills" placeholder="React, Next.js, Node.js" {...register("skills")} />
              {errors.skills && <p className="text-sm text-red-500 font-medium">{errors.skills.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea id="bio" placeholder="Tell us about your career..." className="min-h-[100px]" {...register("bio")} />
              {errors.bio && <p className="text-sm text-red-500 font-medium">{errors.bio.message?.toString()}</p>}
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Saving Your Profile..." : "Complete Profile 🚀"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
