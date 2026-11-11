import type { Metadata } from "next";

import { FavoritesProvider } from "@/components/layout/FavoritesProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudySpot",
  description:
    "Find the right study space, not just an available one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
