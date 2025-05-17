import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seaton Logistics | Driving Efficiency, Safety, and Growth",
  description: "Your trusted partner for premium equipment rentals, expert maintenance, and comprehensive training, empowering businesses across Ghana and beyond.",
  keywords: "equipment rentals, logistics solutions, maintenance services, training, Ghana, Africa, construction equipment, mining equipment, agriculture, sustainability",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#FF6600" />
        <meta property="og:title" content="Seaton Logistics | Driving Efficiency, Safety, and Growth" />
        <meta property="og:description" content="Your trusted partner for premium equipment rentals, expert maintenance, and comprehensive training." />
        <meta property="og:image" content="/images/seaton-og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-color-black text-color-white noise-bg`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark">
          {/* Background gradient glow */}
          <div className="fixed inset-0 bg-gradient-radial opacity-40 pointer-events-none z-[-1]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-color-safety-orange/5 via-transparent to-color-safety-orange/10"></div>
          </div>

          {/* Main content wrapper - positioned above the video */}
          <div className="relative z-0 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
