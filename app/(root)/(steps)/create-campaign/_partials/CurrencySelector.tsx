import React from 'react'

interface ICurrencySelector {
    setCurrency: (region: "USD" | "TRY") => void
    currency: "USD" | "TRY"
}

export default function CurrencySelector(props: ICurrencySelector) {

    const { setCurrency, currency } = props

    return (
        <div className='flex gap-[20px]'>
            <div className={`transition-colors border hover:bg-primary/5  ${currency === "TRY" ? "border-primary bg-primary/5" : "border-gray/30"} rounded-[10px] w-full  px-3 py-2`} onClick={() => {
                setCurrency("TRY")
            }}>
                Türkiye
            </div>
            <div className={`transition-colors border hover:bg-primary/5   ${currency === "USD" ? "border-primary bg-primary/5" : "border-gray/30"} rounded-[10px] w-full  px-3 py-2`} onClick={() => {
                setCurrency("USD")
            }}>
                Global
            </div>

        </div>
    )
}
