import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Love Island - Social Simulation Demo",
  description: "Observe AI NPCs navigate the dating market",
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
