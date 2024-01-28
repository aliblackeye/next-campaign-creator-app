import type { Metadata } from "next";

// Layouts
import Header from "@layouts/Header";

export const metadata: Metadata = {
  title: "Ana Sayfa",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="container">
        {children}
      </div>
    </>
  );
}
