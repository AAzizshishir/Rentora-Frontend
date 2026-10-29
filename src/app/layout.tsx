import type { Metadata } from "next";
import {
  DM_Sans,
  Inter,
  Geist,
  Cormorant_Garamond,
  Raleway,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rentora",
  description:
    "Find apartments for rent with Rentora. Explore properties, available units, amenities, locations, and rental options to find your ideal home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          cormorant.variable,
          raleway.variable,
          "font-cormorant-garamond font-raleway antialiased",
        )}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(()=>{try{const t=localStorage.getItem("theme");const v=t==="light"||t==="dark"||t==="system"?t:"dark";const r=v==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):v;document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r}catch{document.documentElement.classList.add("dark")}})()`}
        </Script>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
