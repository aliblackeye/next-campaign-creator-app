import type { Metadata } from "next";

// Fonts
import { alata } from "@fonts/fonts";

// Layouts
import CampaignStepHeader from "@layouts/CampaignStepHeader/CampaignStepHeader";

export const metadata: Metadata = {
  title: "Kampanya Oluştur",
};

export default function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alata.className}`}>
        <CampaignStepHeader />
        <div className="container">
          {children}
        </div>


      </body>
    </html>
  );
}
