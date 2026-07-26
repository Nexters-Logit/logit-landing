import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logit",
  description: "Logit 랜딩페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
