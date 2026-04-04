"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import axios from "axios";

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
        console.log("login success");
      }
    } catch (error) {
      console.log("cannot log in ", error);
    }
  };

  return (
    <>
      <div className="flex">
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
      </div>
    </>
  );
}

export default SignInPage;
