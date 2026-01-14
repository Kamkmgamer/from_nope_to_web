import "~/styles/globals.css";

import { type Metadata } from "next";
import { Instrument_Serif, Space_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";

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

export const metadata: Metadata = {
  title: "From Nope to Web | Learn Web Development",
  description:
    "The bilingual platform for mastering modern full-stack development. Learn React, Next.js, and the T3 stack in Arabic and English.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ClerkProvider>
    );
  }
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
