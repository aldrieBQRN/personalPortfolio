import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azure Haven Hotel & Resort | Escape to Pure Serenity",
  description:
    "Luxury oceanfront accommodations, world-class dining, and unforgettable experiences at Azure Haven Hotel & Resort. Book your stay today.",
  keywords: [
    "luxury resort",
    "beach hotel",
    "oceanfront resort",
    "Azure Haven",
  ],
  openGraph: {
    title: "Azure Haven Hotel & Resort",
    description:
      "Luxury accommodations, breathtaking views, and unforgettable experiences await you.",
    type: "website",
  },
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
