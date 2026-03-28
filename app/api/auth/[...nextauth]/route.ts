import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";    // ← NEW
import GitHubProvider from "next-auth/providers/github";    // ← NEW
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,

  providers: [
    // --- Google OAuth Provider ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // --- GitHub OAuth Provider ---
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // --- Email & Password Provider (from Day 4) ---
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

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.hashedPassword) {
          throw new Error("Please sign in with Google or GitHub instead");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      // Store the provider used (useful for the bridge logic later)
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };