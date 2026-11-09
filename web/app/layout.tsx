import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteShell } from "@/components/layout/SiteShell";
import { SettingsProvider } from "@/context/SettingsContext";
import { FadeInObserver } from "@/components/smartphoto/FadeInObserver";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
        />
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
      </head>
      <body className="font-sans antialiased text-[var(--text-primary)] bg-[var(--background)]" suppressHydrationWarning>
        <AuthProvider>
          <SettingsProvider>
            <FadeInObserver />
            <SiteShell>{children}</SiteShell>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
