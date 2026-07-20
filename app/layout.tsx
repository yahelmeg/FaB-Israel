import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NavbarWrapper } from "@/components/general/nav/navbar-wrapper";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FaB-Israel",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
        <body className="h-full flex flex-col">
        <Script
            id="theme-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
            }}
        />
        <NavbarWrapper />
        <main className="flex-1 pt-16 max-w-screen-2xl mx-auto w-full px-6">
            {children}
        </main>
        </body>
        </html>
    );
}