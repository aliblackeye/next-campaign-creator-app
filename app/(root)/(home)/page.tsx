"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Services
import CampaignServices from "@services/campaign-services";

// Store
import { useCampaignStore } from "@store/campaign-store";

// Components
import Button from "@components/form-elements/button";
import { toast } from "react-toastify";

export default function CreateCampaign() {
    // Variables
    const router = useRouter();

    // Stores
    const { step, setStep } = useCampaignStore();

    const [serverError, setServerError] = useState<string>("");
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

        else if (res?.status === 503 || res?.status === 500 || res?.status === 502) {
            setServerError(`Status ${res?.status}: Sunucuya ulaşılamıyor.`);
        }

    }

    if (step === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                {serverError && <h1></h1>}
                <Button status="primary" label="Kampanya Oluştur" loading={loading} onClick={startCampaign} size="text-md" className="!max-w-[215px]" />
            </div>
        )
    };

}






