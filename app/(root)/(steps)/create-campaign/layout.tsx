import type { Metadata } from "next";

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
    <>
      <CampaignStepHeader />
      <div className="container">
        {children}
      </div>
    </>
  );
}
