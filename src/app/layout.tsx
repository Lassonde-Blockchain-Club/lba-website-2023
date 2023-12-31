import "./globals.scss";
import type { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

import { Saira_Extra_Condensed, Alata } from "next/font/google";

const saira_extra_condensed = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-saira_extra_condensed",
});
const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Alata",
});

export const metadata: Metadata = {
  title: "Lassonde Blockchain Association",
  description: "Welcome to Lassonde Blockchain Association Website",
  icons: {
    icon: ["/lba.ico"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${alata.variable} ${saira_extra_condensed.className}`}>
        {children}
      </body>
    </html>
  );
}
