import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orra Pod | Modular living, made inevitable",
  description:
    "A cinematic product experience for a futuristic modular pod company, blending guided configuration with immersive storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

