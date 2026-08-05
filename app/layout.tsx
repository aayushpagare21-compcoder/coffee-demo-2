import type { Metadata } from "next";
import "./globals.css";
import OptiSnippet from "@/components/opti-snippet";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "opti-demo-store | Coffee gear, built to be repaired",
  description:
    "A fictional coffee-gear shop used as a QA fixture for third-party DOM-manipulation scripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        An explicit <head> so that the A/B snippet is the first thing in the
        document after the charset/viewport preamble that Next.js emits.
        OptiSnippet MUST stay the first child here.
      */}
      <head>
        <OptiSnippet />
      </head>
      <body className="antialiased">
        <SiteHeader />
        <main id="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
