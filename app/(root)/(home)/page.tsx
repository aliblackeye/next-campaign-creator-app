"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Services
import CampaignServices from "@services/campaign-services";

// Store
import { useCampaignStore } from "@store/campaign-store";

// Components
import Button from "@components/form-elements/button";

export default function CreateCampaign() {
    // Variables
    const router = useRouter();

    // Stores
    const { step, setStep } = useCampaignStore();

    const [loading, setLoading] = useState<boolean>(false);

    // Functions
    const startCampaign = async () => {
        setLoading(true);
        const res = await CampaignServices.createCampaign();

        if (res?.status === 200) {
            setStep(1);
            router.push("/create-campaign");
            router.refresh();
        }
    }

    if (step === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <Button status="primary" label="Kampanya Oluştur" loading={loading} onClick={startCampaign} size="text-md" className="!max-w-[215px]" />
            </div>
        )
    };

}






