import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }
}

// alternative way of declaring a module
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
  }
}
