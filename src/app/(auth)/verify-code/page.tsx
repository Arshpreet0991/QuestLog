import { Suspense } from "react";
import VerifyCodeClient from "./VerifyCodeClient";

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCodeClient />
    </Suspense>
  );
}
