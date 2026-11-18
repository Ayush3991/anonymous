import type { Metadata } from "next";
import { Dancing_Script, Quicksand } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Princess Day 👑",
  description: "A magical surprise made just for you ♡",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${quicksand.variable} h-full`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
