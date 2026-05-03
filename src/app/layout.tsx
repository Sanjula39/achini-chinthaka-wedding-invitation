import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achini & Chinthaka | Wedding Invitation — May 08, 2026",
  description:
    "You are cordially invited to the wedding of Achini Nanayakkara and Chinthaka Lokuliyana. A traditional Kandyan celebration at Grandeeza Hotel, Negombo, on May 08, 2026.",
  keywords: [
    "Achini Chinthaka wedding",
    "Kandyan wedding Sri Lanka",
    "Grandeeza Hotel Negombo",
    "wedding invitation 2026",
    "Poruwa ceremony",
  ],
  openGraph: {
    title: "Achini & Chinthaka — Wedding Invitation",
    description: "Join us to celebrate a traditional Kandyan wedding at Grandeeza Hotel, Negombo.",
    type: "website",
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achini & Chinthaka — Wedding Invitation",
    description: "Join us on May 08, 2026 at Grandeeza Hotel, Negombo.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C9973A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
