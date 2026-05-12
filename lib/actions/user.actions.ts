"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function checkUser() {
  try {
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

    // --- CORE LOGIC: Safe creation of new users ---
    const newUser = await prisma.user.create({
      data: {
        authUserId: authUserId,
        name: name || "User",
        email: email || "",
        // We initialize these to null/empty so the database is happy!
        industry: null,
        experience: null,
        bio: null,
        skills: [],
      },
    });

    return newUser;
  } catch (error) {
    // If you see this in your terminal, it's a database error
    console.error("🚨 Error in checkUser Bridge:", error);
    return null;
  }
}