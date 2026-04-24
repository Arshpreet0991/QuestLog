"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const [verifyCode, setVerifyCode] = useState("");

  const handleVerification = async () => {
    try {
      const response = await axios.post("/api/auth/verify-code", {
        userEmail,
        verifyCode,
      });

      if (response.data.success) {
        toast.success("User verified");
      }

      router.push("/dashboard");
    } catch (error) {
      toast.error("Verification failed");
      console.error("User verification failed: " + error);
      return toast.error("User verification failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5">
      <p className="text-2xl p-2 rounded-sm text-black bg- bg-amber-100">
        {" "}
        {userEmail}
      </p>
      <input
        type="number"
        placeholder="Verify Code"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value)}
        className="bg-white text-black rounded-sm text-2xl p-1"
      />
      <button
        className="bg-white text-black rounded-sm text-2xl p-2"
        onClick={handleVerification}
      >
        Verify Account
      </button>
    </div>
  );
}
