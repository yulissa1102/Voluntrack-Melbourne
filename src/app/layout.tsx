import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "VolunTrack Melbourne",
  description: "A curated volunteering opportunity tracker for Melbourne international students."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen font-sans antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
