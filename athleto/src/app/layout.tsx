import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { BrandProvider } from "@/context/BrandContext";
import { UserProvider } from "@/context/UserContext";
import { User } from "lucide-react";
import { OpportunityProvider } from "@/context/OpportunityContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athleto",
  description: "Football Players",
  icons: "/logo2.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <OpportunityProvider>
          <BrandProvider> {/* Wrap children inside BrandProvider */}
            <Toaster />
            {children}
          </BrandProvider>
            </OpportunityProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
