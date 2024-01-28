"use client";

// Libs
import { useState } from "react"

// Store
import { useCampaignStore } from "@store/campaign-store";

// Utils
import { formatDateRange } from "@utils/formatDateRange"

// Partials
import SelectItem from "../_partials/SelectItem"
import StepFooter from "../_partials/StepFooter";

// Components
import Box from "@components/box"

export default function Step4() {

    // Stores
    const { campaign, step, setCampaign, setStep } = useCampaignStore();

    // States
    const [dates, setDates] = useState<any[]>([])

    return <div

        className="flex justify-center flex-col">
        {/* TARİH SEÇİMİ */}
        <Box>
            <div className='mb-6'>
                <h1 className='text-gray text-sm'>Güzel seçim! Şimdi kampanya tarihini belirle</h1>
                <h1>Tahmini başlangıç tarihini seç</h1>
            </div>

            {dates?.map((dateItem: any, index: number) => {

                console.log(dateItem)
                return (

                    <SelectItem
                        key={index}
                        onClick={() => {

                            setCampaign(
                                {
                                    ...campaign,
                                    startDate: dateItem
                                }
                            )
                        }}
                        selected={
                            campaign.startDate?.id === dateItem?.id
                        }
                        badge={formatDateRange(dateItem?.date_range[0], dateItem?.date_range[1])}
                        title={dateItem.name}
                        subtitle={dateItem?.description}
                        footerLeftText={dateItem?.price}
                        footerRightText={dateItem?.currency}
                    />

                )
            })}

        </Box>
        <StepFooter />
    </div>
}
