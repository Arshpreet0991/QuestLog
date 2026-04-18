import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Cinzel, Cinzel_Decorative } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cinzel.className}>
      <body className="min-h-full flex flex-col ">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
