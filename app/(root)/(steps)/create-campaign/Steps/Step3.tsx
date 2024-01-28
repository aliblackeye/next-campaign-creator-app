"use client"

// Libs
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

// Stores
import { useCampaignStore } from '@store/campaign-store';

// Partials
import SelectItem from '../_partials/SelectItem'


// Components
import Box from '@components/box'
import StepFooter from '../_partials/StepFooter';
import CampaignServices from '@services/campaign-services';

export default function Step3() {

    // Stores
    const { campaign, setCampaign } = useCampaignStore();

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

    // Functions
    const fetchPackages = async () => {
        const res = await CampaignServices.getPackages();

        const sortedPackages = res?.data.filter((p: any) => p.currency === campaign.currency).sort((a: any, b: any) => b.price - a.price)

        // Daha önce seçilmiş bir paket varsa ve en pahalı paket seçilmiş paket değilse
        if (campaign.package && campaign.package.price !== sortedPackages[0].price) {
            setCampaign({ ...campaign, package: sortedPackages[0]});
        }

        setCampaign({ ...campaign, package: sortedPackages[0] , packages: sortedPackages});

    };

    // Effects
    useEffect(() => {
        if (campaign.packages == null) {
            fetchPackages();
        }
    }, []);

    return (
        <div
            className="flex justify-center flex-col">
            {/* PAKET SEÇİMİ */}
            <Box title='Senin için uygun olan paketi seç'>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {campaign.packages?.map((packageItem: any, index: number) => (
                        <SelectItem
                            key={index}
                            onClick={() => {
                                setCampaign(
                                    {
                                        ...campaign,
                                        package: packageItem
                                    }
                                )
                            }}
                            selected={campaign.package?.id === packageItem.id}
                            badge={`${packageItem?.click.toLocaleString()} tıklanma`}
                            title={packageItem?.name}
                            subtitle={packageItem?.description}
                            footerLeftText={packageItem?.price}
                            footerRightText={packageItem?.currency}
                        />

                    ))}

                </motion.div>

            </Box>
            <StepFooter disabled={!campaign.package} />
        </div>
    )
}
