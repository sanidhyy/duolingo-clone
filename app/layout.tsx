import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";

import "./globals.css";

const font = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn" });

export const viewport: Viewport = { themeColor: "#059669" };
export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        options: { logoImageUrl: "/favicon.ico" },
        variables: { colorPrimary: "#059669" },
      }}
      telemetry={false}
      afterSignOutUrl="/"
    >
      <html lang="fa" dir="rtl">
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton dir="rtl" />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
