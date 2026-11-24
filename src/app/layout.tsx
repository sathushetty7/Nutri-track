import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriTrack - AI-Powered Nutrition Tracking & Smart Meal Planning",
  description: "Track your nutrition, scan meals with AI, discover recipes by available ingredients, and reach your wellness goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[var(--color-cream)] text-[var(--color-primary-text)] font-sans">
        {children}
      </body>
    </html>
  );
}
