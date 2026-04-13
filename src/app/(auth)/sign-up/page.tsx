"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { email } from "zod";

function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/sign-up", user);

      if (response.data.error) {
        console.log("Invalid credentials");
      } else {
        router.push(`/verify-code?email=${encodeURIComponent(user.email)}`);
        toast.success("Account Created, please verify.");
      }
    } catch (error) {
      console.log("cannot log in ", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl m-4">Sign Up</h1>
      <form
        className="bg-gray-400 flex flex-col gap-2 rounded-sm p-3"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-white p-1 text-black rounded-sm"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
        <button className="bg-black p-1 rounded-sm">Create Account</button>
      </form>
      <Link className="m-5 " href="/sign-in">
        Already registered?{" "}
        <span className="bg-blue-400 p-2 rounded-sm text-black">Sign-In</span>
      </Link>
    </div>
  );
}

export default SignUpPage;
