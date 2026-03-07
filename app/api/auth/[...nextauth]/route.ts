import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  // Use MongoDB to persist users, accounts, & sessions
  adapter: MongoDBAdapter(clientPromise) as any,

  // Configure authentication providers
  providers: [
    // --- Email & Password Provider ---
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Connect to MongoDB and find the user
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        // If user doesn't exist, throw error
        if (!user) {
          throw new Error("No user found with this email");
        }

        // If user exists but has no password (signed up via OAuth), throw error
        if (!user.hashedPassword) {
          throw new Error("Please sign in with Google or GitHub instead");
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return the user object (NextAuth will create a session)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for serverless compatibility
  },

  // Customize the JWT and Session callbacks
  callbacks: {
    async jwt({ token, user }) {
      // When the user first signs in, add their ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the user ID available in the session object
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  // Custom pages (we'll build these later)
  pages: {
    signIn: "/auth/signin",
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };