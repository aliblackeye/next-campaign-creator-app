import type { Metadata } from "next";

// Fonts
import { alata, inter } from "@fonts/fonts";

// Layouts
import Header from "@layouts/Header";

export const metadata: Metadata = {
  title: "Ana Sayfa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alata.className}`}>
        <Header />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
