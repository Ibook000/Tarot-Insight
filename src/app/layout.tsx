import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "塔罗牌占卜 - 探索内心智慧，揭示生命奥秘",
  description: "通过古老的塔罗牌艺术，结合现代AI技术，为你提供深刻的洞察和指引。探索内心的智慧，揭示生命的奥秘。",
  keywords: ["塔罗牌", "占卜", "AI解读", "心灵指引", "神秘学", "智慧", "占卜术"],
  authors: [{ name: "塔罗牌占卜" }],
  openGraph: {
    title: "塔罗牌占卜 - 探索内心智慧",
    description: "通过古老的塔罗牌艺术，结合现代AI技术，为你提供深刻的洞察和指引",
    url: "https://chat.z.ai",
    siteName: "塔罗牌占卜",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "塔罗牌占卜 - 探索内心智慧",
    description: "通过古老的塔罗牌艺术，结合现代AI技术，为你提供深刻的洞察和指引",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
