import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snapcart | 10 minutes grocery delivery snapcart",
  description: "10 minutes grocery delivery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-green-200 to-white">
        {children}
      </body>
    </html>
  );
}