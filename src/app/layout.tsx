import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "open-data-next-app",
  description: "youserstack's open-data-next-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-neutral-100 bg-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
