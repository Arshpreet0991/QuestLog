import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

export function EmailTemplate({ username, otp }: EmailTemplateProps) {
  return (
    <div>
      <h1>
        Hello, {username}! welcome to Quest Logger. please verify your account
        by entering the otp otp :{otp}
      </h1>
    </div>
  );
}
