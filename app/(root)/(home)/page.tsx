"use client";
import { useRouter } from "next/navigation";
import { useCampaignStore } from "@store/campaign-store";
// Components
import Button from "@components/form-elements/button";
export default function CreateCampaign() {
    // Variables
    const router = useRouter();

    // Stores
    const { campaign, step, setStep } = useCampaignStore();

    // Functions
    const startCampaign = () => {
        setStep(1);
        router.push("/create-campaign");
        router.refresh();

    }



    if (step === 0) {
        return (
            <div className="flex justify-center">
                {/* <h1 className="text-2xl font-bold mb-4">BASE URL: {process.env.NEXT_PUBLIC_BASE_URL} </h1>
                    */}
                <Button status="primary" label="Kampanya Oluştur" onClick={startCampaign} size="text-md" className="!max-w-[215px]"/>
            </div>
        )
    };

}






