import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spoti",
  description: "Campus study spot finder",
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