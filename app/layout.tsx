import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Night Reach",
  description: "World is yours to conquer",
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