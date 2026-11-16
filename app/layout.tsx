import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanderly — Plan. Explore. Travel.",
  description: "Your AI-powered travel companion. Discover destinations, plan perfect itineraries, and book with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}