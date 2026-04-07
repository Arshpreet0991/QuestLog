import "./globals.css";
import AuthProvider from "@/context/authProvider";
import ToastProvider from "@/context/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className=" ">
          <ToastProvider />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
