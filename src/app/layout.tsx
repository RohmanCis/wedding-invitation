import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title:
    "Panji & Anita Wedding Invitation",

  description:
    "Join us in celebrating our special day.",

  openGraph: {

    title:
      "Panji & Anita Wedding Invitation",

    description:
      "Join us in celebrating our special day.",

    images: [
      "/images/og-cover.png",
    ],

    type: "website",
  },

  twitter: {

    card: "summary_large_image",

    title:
      "Panji & Anita Wedding Invitation",

    description:
      "Join us in celebrating our special day.",

    images: [
      "/images/og-cover.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${cormorant.variable}
          ${inter.variable}
          bg-[var(--background)]
          text-[var(--foreground)]
          antialiased
        `}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
