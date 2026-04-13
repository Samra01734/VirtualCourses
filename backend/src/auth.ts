import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connectDb from "./lib/db";
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await connectDb();

          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) return null;

          const user = await User.findOne({ email });

          // ❌ FIX 1: NEVER return Error object
          if (!user) return null;

          const isMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!isMatch) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.log("AUTH ERROR:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",

    // ❌ FIX 2: seconds not milliseconds
    maxAge: 10 * 24 * 60 * 60,
  },

  // recommended fallback
  secret: process.env.AUTH_SECRET,
});