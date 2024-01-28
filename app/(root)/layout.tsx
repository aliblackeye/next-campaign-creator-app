import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: 'makromusic Task | %s',
    default: '',
  },
  description: "Şarkılarınız için kampanyalar oluşturun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
          {children}
      </body>
    </html>
  );
}
