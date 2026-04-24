import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

export function EmailTemplate({ username, otp }: EmailTemplateProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "30px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              color: "#1a1a1a",
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            Welcome to The Main Quest ⚔️
          </h1>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Hey {username}, your verification code is:
          </p>
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "6px",
              padding: "16px",
              textAlign: "center",
              margin: "24px 0",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: "bold",
                letterSpacing: "8px",
              }}
            >
              {otp}
            </span>
          </div>
          <p style={{ color: "#555", fontSize: "14px" }}>
            This code expires in <strong>1 hour</strong>. If you didn't sign up
            for The Main Quest, ignore this email.
          </p>
        </div>
      </div>
    </div>
  );
}
