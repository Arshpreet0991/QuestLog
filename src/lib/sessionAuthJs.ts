import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function sessionAuthJs() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    return user;
  } catch (error) {
    console.log("Error fetching the userId from session: ", error);
  }
}
