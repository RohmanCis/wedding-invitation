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
  title: "Panji & Anita Wedding Invitation",
  description: "Join us to celebrate our wedding day.",
  openGraph: {
    title: "Panji & Anita Wedding Invitation",
    description: "Join us to celebrate our wedding day.",
    url: "https://wedding-invitation-dun-omega.vercel.app",
    siteName: "Panji & Anita Wedding",
    images: [
      {
        url: "https://wedding-invitation-dun-omega.vercel.app/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Panji & Anita Wedding",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panji & Anita Wedding Invitation",
    description: "Join us to celebrate our wedding day.",
    images: ["https://wedding-invitation-dun-omega.vercel.app/og-cover.jpg"],
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
