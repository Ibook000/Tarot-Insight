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
  title: "Mystic Tarot Reading - 探索内心智慧，揭示生命奥秘",
  description: "Ancient wisdom meets modern insight. Through the mystical art of tarot, discover profound revelations and spiritual guidance. 通过古老的塔罗牌艺术，结合现代AI技术，为你提供深刻的洞察和指引。探索内心的智慧，揭示生命的奥秘。",
  keywords: ["塔罗牌", "Tarot", "占卜", "Divination", "AI解读", "心灵指引", "Spiritual Guidance", "神秘学", "Mysticism", "智慧", "Wisdom"],
  authors: [{ name: "Mystic Tarot Oracle" }],
  openGraph: {
    title: "Mystic Tarot Reading - Ancient Wisdom & Modern Insight",
    description: "Discover your destiny through the mystical art of tarot. Ancient wisdom meets modern technology for profound spiritual guidance.",
    url: "https://chat.z.ai",
    siteName: "Mystic Tarot Oracle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystic Tarot Reading - Ancient Wisdom & Modern Insight",
    description: "Discover your destiny through the mystical art of tarot. Ancient wisdom meets modern technology.",
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
