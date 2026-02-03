import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrnavarro.github.io"),
  title: "Kelly Navarro — Site Reliability Engineer",
  description:
    "SRE with 7+ years running large-scale game and web infrastructure across AWS, GCP, and Azure. Sony (Concord), PAYDAY 3, Freelancer.com.",
  alternates: {
    canonical: "/openclaw-landing/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/openclaw-landing/",
    title: "Kelly Navarro — Site Reliability Engineer",
    description:
      "SRE with 7+ years running large-scale game and web infrastructure across AWS, GCP, and Azure.",
    siteName: "Kelly Navarro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelly Navarro — Site Reliability Engineer",
    description:
      "SRE with 7+ years running large-scale game and web infrastructure across AWS, GCP, and Azure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kelly Navarro",
    jobTitle: "Site Reliability Engineer",
    url: "https://gabrnavarro.github.io/openclaw-landing/",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="ld-person"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
