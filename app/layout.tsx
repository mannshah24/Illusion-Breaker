import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Illusion Breaker - Misinformation Analysis Tool",
  description:
    "AI-powered content analysis for detecting misinformation and verifying claims",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
