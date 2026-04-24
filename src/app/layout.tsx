import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Cinzel, Cinzel_Decorative, IM_Fell_English } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const imFell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-im-fell",
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${imFell.variable} w-full min-h-screen`}
    >
      <body className="min-h-screen flex flex-col  ">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
