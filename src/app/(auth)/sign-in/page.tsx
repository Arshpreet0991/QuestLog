"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

function SignInPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Invalid credentials");
      } else {
        router.push("/dashboard");
        toast.success("Login Successful");
      }
    } catch (error) {
      console.log("cannot log in ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl m-4">Sign In</h1>
        <form
          className="bg-gray-400 flex flex-col gap-2 rounded-sm p-3"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-white p-1 text-black rounded-sm"
            type="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="bg-white p-1 text-black rounded-sm"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button className="bg-black p-1 rounded-sm">Sign-In</button>
        </form>
        <Link className="m-5 " href="/sign-up">
          New User?{" "}
          <span className="bg-blue-400 p-2 rounded-sm text-black">
            Create Account
          </span>
        </Link>
      </div>
    </>
  );
}

export default SignInPage;
