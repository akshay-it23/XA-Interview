"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function checkUser() {
  try {
    // --- BYPASS MODE: Return a dummy user for local development ---
    // This allows you to see the Dashboard even if MongoDB is not connected.
    return {
      id: "dummy-id",
      authUserId: "dummy-auth-id",
      name: "Akshay (Local Mode)",
      email: "local@example.com",
      industry: "Technology", // Setting this avoids the onboarding redirect
      experience: 5,
      bio: "This is a local dummy user for UI testing.",
      skills: ["React", "Next.js", "Tailwind"],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    /* Original Logic (Disabled for Local Mode):
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return null;
    }

    const { name, email, id: authUserId } = session.user as any;

    const loggedInUser = await prisma.user.findUnique({
      where: { authUserId: authUserId },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const newUser = await prisma.user.create({
      data: {
        authUserId: authUserId,
        name: name || "User",
        email: email || "",
        industry: null,
        experience: null,
        bio: null,
        skills: [],
      },
    });

    return newUser;
    */
  } catch (error) {
    console.error("🚨 Error in checkUser Bridge:", error);
    return null;
  }
}