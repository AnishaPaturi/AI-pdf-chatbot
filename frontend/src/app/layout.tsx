import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuMind | Chat with Your PDFs",
  description: "Upload PDFs and chat with them using AI. Get instant answers from your documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
