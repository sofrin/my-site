import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { type Metadata } from "next";
import { Navbar } from "~/components/navbar";
import { ModeToggle } from "~/components/theme-toggle";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Sofrin.ru",
  description: "My personal site",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative mx-4 min-h-screen max-w-3xl lg:mx-auto">
            <Navbar />
            <main className="flex-1 pb-4 lg:pb-12">{children}</main>
          </div>
          <ModeToggle className="fixed bottom-4 right-4 rounded-lg bg-transparent" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
