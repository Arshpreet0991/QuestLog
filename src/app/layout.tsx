import "./globals.css";
<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
=======
import AuthProvider from "@/context/authProvider";
import ToastProvider from "@/context/ToastProvider";
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
=======
      <AuthProvider>
        <body className=" ">
          <ToastProvider />
          {children}
        </body>
      </AuthProvider>
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    </html>
  );
}
