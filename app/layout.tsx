import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaathuOS - Personal Operating System Portfolio",
  description: "A premium macOS-inspired personal web operating system built by Sathvik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
