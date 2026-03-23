import type { Metadata } from "next";
import { Roboto, Podkova } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const podkova = Podkova({
  variable: "--font-podkova",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Task Master",
  description: "Modern Workspace for students and professional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${podkova.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
