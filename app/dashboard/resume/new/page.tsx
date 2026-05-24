import React from "react";
import { checkUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { NewResumeBuilder } from "@/components/resume-builder/NewResumeBuilder";

export default async function NewResumePage() {
  const user = await checkUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return <NewResumeBuilder user={user} />;
}
