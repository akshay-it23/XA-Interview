import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // --- Validation ---
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // --- Check if user already exists ---
    const client = await clientPromise;
    const db = client.db();
    console.log("📝 Registering user in DB:", db.databaseName);
    
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 } // 409 Conflict
      );
    }
    // --- Hash the password ---
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Create the user ---
    console.log("🔨 Creating user record...");
    const result = await db.collection("users").insertOne({
      name: name || null,
      email,
      hashedPassword,
      emailVerified: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    // Returning the actual error message to help the user debug locally
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: `Server Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}