import NextAuth from "next-auth";
import { authOptions } from "./options";

// method must be named handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
