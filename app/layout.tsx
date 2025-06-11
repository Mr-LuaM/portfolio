import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/sections/footer";


// Define default URL based on environment
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Base SEO Metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mark Lua | Software Developer Portfolio",
  description:
    "Explore the portfolio of Mark Lua, a skilled software developer proficient in Next.js, Supabase, and various modern web technologies.",
  openGraph: {
    title: "Mark Lua | Software Developer Portfolio",
    description:
      "Explore the portfolio of Mark Lua, a skilled software developer proficient in Next.js, Supabase, and various modern web technologies.",
    url: defaultUrl,
    images: "/opengraph-image.png", // Default image used for Open Graph
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Lua | Software Developer Portfolio",
    description:
      "Explore the portfolio of Mark Lua, a skilled software developer proficient in Next.js, Supabase, and various modern web technologies.",
    images: "/opengraph-image.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
