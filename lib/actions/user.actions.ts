"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function checkUser() {
  try {
    // 1. Get the NextAuth session (from MongoDB/JWT)
    const session = await getServerSession(authOptions);

    // 2. If no session, user is not logged in!
    if (!session || !session.user || !(session.user as any).id) {
      return null;
    }

    const { name, email, id: authUserId } = session.user as any;

    // 3. Try to find this user in PostgreSQL using the MongoDB ID (authUserId)
    const loggedInUser = await prisma.user.findUnique({
      where: {
        authUserId: authUserId,
      },
    });

    // 4. If user exists, return it!
    if (loggedInUser) {
      return loggedInUser;
    }

    // 5. If user DOES NOT exist in PostgreSQL, Create them! (THE BRIDGE)
    const newUser = await prisma.user.create({
      data: {
        authUserId: authUserId,
        name: name || "User",
        email: email || "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser Bridge:", error);
    return null;
  }
}
