import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteShell } from "@/components/layout/SiteShell";
import { SettingsProvider } from "@/context/SettingsContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Outsource Image Editing Services - LIRISHA",
  description:
    "LIRISHA provides bulk image editing services globally. We cater particularly to North America, Europe, and Australia.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/new-template.css" />
        <link rel="stylesheet" href="/css/support-style.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/homepage.css" />
        <link rel="stylesheet" href="/css/contact-us.css" />
        <link rel="stylesheet" href="/css/about-us.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased text-[var(--text-primary)] bg-[var(--background)]" suppressHydrationWarning>
        <AuthProvider>
          <SettingsProvider>
            <SiteShell>{children}</SiteShell>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
