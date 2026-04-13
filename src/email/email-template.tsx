import { verify } from "crypto";
import * as React from "react";

interface EmailTemplateProps {
  username: string;
  verifyCode: number;
}

export function EmailTemplate({ username, verifyCode }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>
        Please verify your account by entering the verify code: {verifyCode}
      </p>
    </div>
  );
}
