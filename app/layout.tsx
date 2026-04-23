import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DeviceWarningOverlay from "@/components/DeviceWarningOverlay";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://edhe.in'),
  title: {
    default: "Edhe | A Studio of Questions",
    template: "%s | Edhe Studio"
  },
  description: "An immersive digital studio built with curiosity. We question the norm, gently. Specializing in Web Design, Full-Stack App Development, and Branding.",
  keywords: ["Edhe Studio", "Digital Agency", "Web Development", "App Development", "Branding", "UI/UX Design", "Creative Studio"],
  authors: [{ name: "Edhe Studio", url: "https://edhe.in" }],
  creator: "Edhe Studio",
  publisher: "Edhe Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/Edhe_Logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/Edhe_logo_transparent.png", type: "image/png" },
    ],
    shortcut: "/Edhe_Logo.png",
  },
  openGraph: {
    title: "Edhe | A Studio of Questions",
    description: "An immersive digital studio built with curiosity. We question the norm, gently.",
    url: "https://edhe.in",
    siteName: "Edhe Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Edhe Studio - A Studio of Questions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edhe | A Studio of Questions",
    description: "An immersive digital studio built with curiosity. We question the norm, gently.",
    creator: "@edhestudio",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&f[]=satoshi@300,400,500,700&display=swap" as="style" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&f[]=satoshi@300,400,500,700&display=swap" />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen bg-[#faf9f6] text-[#1c1c1c] overflow-x-hidden font-body antialiased">
        <DeviceWarningOverlay />
        {children}
      </body>
    </html>
  );
}
