import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
<<<<<<< HEAD
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/User.Model";
=======

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";
import { errorResponse } from "@/lib/response";
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "abc@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
<<<<<<< HEAD
=======
          console.log("Auth secret : ", process.env.NEXT_AUTH_SECRET);

>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
