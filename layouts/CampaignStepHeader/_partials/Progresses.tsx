"use client"

// Stores
import { useCampaignStore } from '@store/campaign-store';

// Partials
import Progress from './Progress'

export default function Progresses() {
    // Stores
    const { step } = useCampaignStore();
    return (
        <div className="progresses flex gap-4 font-normal grow justify-center items-center text-gray
        flex-col  sm:flex-row
        ">
            <span>Parçan</span>
            <Progress progress={step === 1 ? "active" : step > 1 ? "completed" : "inactive"} />
            <span>Detaylar</span>
            <Progress progress={step === 2 ? "active" : step > 2 ? "completed" : "inactive"} />
            <span>Kampanyan</span>
            <Progress progress={step >= 3 ? "active" : step > 4 ? "completed" : "inactive"} />
            <span>Ödeme</span>
        </div>
    )
}
