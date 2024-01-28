"use client"

// Libs
import { useState } from 'react';

// Stores
import { useCampaignStore } from '@store/campaign-store';

// Partials
import SelectItem from '../_partials/SelectItem'


// Components
import Box from '@components/box'
import StepFooter from '../_partials/StepFooter';

export default function Step3() {

    // Stores
    const { campaign, setCampaign } = useCampaignStore();

    // States
    const [packages, setPackages] = useState<any[]>([])

    return (
        <div
            className="flex justify-center flex-col">
            {/* PAKET SEÇİMİ */}
            <Box title='Senin için uygun olan paketi seç'>
                {packages?.map((packageItem: any, index: number) => (

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

            </Box>
            <StepFooter disabled={!campaign.package} />
        </div>
    )
}
