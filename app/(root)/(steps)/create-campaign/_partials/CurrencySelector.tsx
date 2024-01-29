import { useCampaignStore } from '@store/campaign-store'
import React from 'react'

interface ICurrencySelector {

}

export default function CurrencySelector(props: ICurrencySelector) {

    // Variables
    const { campaign, setCampaign } = useCampaignStore();

    return (
        <div className='flex gap-[20px]'>
            <div className={`transition-colors border hover:bg-primary/5  ${campaign?.currency === "TRY" ? "border-primary bg-primary/5" : "border-gray/30"} rounded-[10px] w-full  px-3 py-2`} onClick={() => {
                setCampaign({ ...campaign, currency: "TRY" })
            }}>
                Türkiye
            </div>
            <div className={`transition-colors border hover:bg-primary/5   ${campaign?.currency === "USD" ? "border-primary bg-primary/5" : "border-gray/30"} rounded-[10px] w-full  px-3 py-2`} onClick={() => {
                setCampaign({ ...campaign, currency: "USD" })
            }}>
                Global
            </div>

        </div>
    )
}
