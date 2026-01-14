import "~/styles/globals.css";

import { type Metadata } from "next";
import {
  Instrument_Serif,
  Space_Mono,
  Noto_Sans_Arabic,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { ConvexClientProvider } from "~/components/providers/ConvexClientProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "From Nope→Web | Learn Web Development",
    template: "%s | From Nope→Web",
  },
  description:
    "The bilingual platform for mastering modern full-stack development. Learn React, Next.js, and the T3 stack in Arabic and English.",
  keywords: [
    "web development",
    "learn to code",
    "React",
    "Next.js",
    "T3 stack",
    "Arabic programming",
    "bilingual coding",
    "تعلم البرمجة",
    "تطوير الويب",
  ],
  authors: [{ name: "KamkmGamer" }],
  creator: "KamkmGamer",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://fromnopetoweb.com",
    siteName: "From Nope→Web",
    title: "From Nope→Web | Learn Web Development",
    description:
      "The bilingual platform for mastering modern full-stack development. Learn React, Next.js, and the T3 stack in Arabic and English.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "From Nope→Web - Learn Web Development in Arabic + English",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Nope→Web | Learn Web Development",
    description:
      "The bilingual platform for mastering modern full-stack development. Learn in Arabic and English.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Check if Clerk is properly configured
const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes(
    "your_publishable_key",
  );

function Providers({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured) {
    return (
      <ClerkProvider>
        <ConvexClientProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ConvexClientProvider>
      </ClerkProvider>
    );
  }
  return (
    <ConvexClientProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ConvexClientProvider>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${instrumentSerif.variable} ${spaceMono.variable} ${notoSansArabic.variable}`}
    >
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
