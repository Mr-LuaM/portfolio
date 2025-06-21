import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/sections/footer";

// Dynamically resolve URL for different environments
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// SEO + Metadata
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mark Lua | Full Stack Developer in Philippines",
  description:
    "Explore the portfolio of Mark Lua, a full stack developer specializing in Next.js, Laravel, Supabase, and modern web technologies.",
  openGraph: {
    title: "Mark Lua | Full Stack Developer in Philippines",
    description: "Explore projects, skills, and contact information of Mark Lua.",
    url: defaultUrl,
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Lua | Full Stack Developer in Philippines",
    description: "Explore projects, skills, and contact information of Mark Lua.",
    images: "/opengraph-image.png",
  },
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Mark Lua",
    capable: true,
    statusBarStyle: "default"
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mark Lua",
      "jobTitle": "Full Stack Developer",
      "url": "https://luamark.vercel.app",
      "image": "https://avatars.githubusercontent.com/u/130156447?v=4",
      "address": {
        "addressLocality": "Oriental Mindoro",
        "addressCountry": "PH"
      },
      "sameAs": [
        "https://github.com/Mr-LuaM",
        "https://www.linkedin.com/in/mark-lua-14a70a16a/"
      ]
    })
  }
};

// Viewport export for theme color (Next.js 14 way)
export const viewport = {
  themeColor: "#ffffff",
};

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon1.png" />

        {/* Extra Safety for iOS Standalone */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mark Lua" />

        {/* Character Encoding */}
        <meta charSet="UTF-8" />

        {/* Viewport Fallback */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${geistSans.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
