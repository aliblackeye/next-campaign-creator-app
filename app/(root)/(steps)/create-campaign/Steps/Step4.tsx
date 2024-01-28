"use client";

// Libs
import { motion } from "framer-motion";
import { useEffect } from "react"

// Services
import CampaignServices from "@services/campaign-services";

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
    const { campaign, setCampaign, } = useCampaignStore();

    // Functions
    const fetchDates = async () => {
        const res = await CampaignServices.getDates();

        const datesSorted = res?.data?.sort((a: any, b: any) => b.price - a.price)

        const mostExpensiveDate = datesSorted[0];

        // Daha önce seçilmiş bir tarih varsa ve en pahalı tarih seçilmiş tarih değilse
        if ((campaign.startDate?.id != null) && campaign.startDate?.id !== mostExpensiveDate?.id) {
            setCampaign({
                ...campaign,
                dates: datesSorted,
            });
        }

        else {
            setCampaign({
                ...campaign,
                dates: datesSorted,
                startDate: mostExpensiveDate,
            });
        }


    };

    // Variables
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    // Effects
    useEffect(() => {
        fetchDates();
    }, []);

    return <div className="flex justify-center flex-col">
        {/* TARİH SEÇİMİ */}
        <Box>
            <div className='mb-6'>
                <h1 className='text-gray text-sm'>Güzel seçim! Şimdi kampanya tarihini belirle</h1>
                <h1>Tahmini başlangıç tarihini seç</h1>
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
            >

                {campaign.dates?.map((dateItem: any, index: number) => {
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

            </motion.div>

        </Box>
        <StepFooter />
    </div>
}
