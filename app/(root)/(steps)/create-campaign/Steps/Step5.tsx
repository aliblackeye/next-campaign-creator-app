"use client";

// Lib
import Image from "next/image";
import { motion } from "framer-motion";

// Store
import { useCampaignStore } from "@store/campaign-store";

// Utils
import { formatDateRange } from "@utils/formatDateRange";

// Components
import Button from "@components/form-elements/button";
import { inter } from "@fonts/fonts";
export default function Step5() {

    // Stores
    const { campaign, setStep } = useCampaignStore();

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return <div
        className={`flex justify-center flex-col ${inter.className}`}>
        <h1 className='text-2xl font-semibold pb-6 border-b border-b-gray/30 mb-6'>Onayla ve ödemeye geç</h1>

        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className='flex justify-between gap-10 md:gap-24 flex-col md:flex-row'>
            <motion.div
                variants={item}

                className='flex-[14]  gap-4 flex flex-col'>
                <h1 className='text-lg font-medium'>Kampanya özetin</h1>

                <div className='clicks flex'>
                    <div className='flex-1'>
                        <h4 className='text-sm'>Tıklanma</h4>
                        <h1 className='text-base font-medium'>{campaign.package?.click.toLocaleString()}</h1>
                    </div>
                    <div className='flex items-end cursor-pointer hover:text-primary transition-all font-semibold'
                        onClick={() => { setStep(3) }}>
                        Düzenle
                    </div>
                </div>

                <div className='start-date flex'>
                    <div className='flex-1'>
                        <h4 className='text-sm'>Başlangıç tarihi</h4>
                        <h1 className='text-base font-medium'>{formatDateRange(
                            campaign.dates.find(d => d.id === campaign.startDate?.id)?.date_range[0],
                            campaign.dates.find(d => d.id === campaign.startDate?.id)?.date_range[1])}
                        </h1>
                    </div>
                    <div className='flex items-end cursor-pointer hover:text-primary transition-all font-semibold' onClick={() => { setStep(4) }}>
                        Düzenle
                    </div>
                </div>

            </motion.div>

            <motion.div
                variants={item}
                className='flex-[10]'>
                <div className='rounded-3xl border border-gray/30'>
                    <h1 className='text-gray text-sm font-medium  border-b border-b-gray/30 px-6 py-4'>Kampanya özeti</h1>
                    <div className='px-6 py-6 flex flex-col gap-6'>
                        {campaign.track && <div className='p-4 flex gap-3 border border-gray/30 rounded-2xl'>
                            <div className='w-12 h-12 '><Image src={campaign.track?.album?.images[0]?.url} className='rounded-lg' alt='song' width={640} height={640} /></div>
                            <div className='flex flex-col '>
                                <h1 className='text-base font-semibold whitespace-nowrap max-w-[180px] md:max-w-[260px] overflow-ellipsis overflow-hidden'>{campaign.track?.name}</h1>
                                <h4 className='text-sm font-medium text-gray/60 whitespace-nowrap max-w-[180px] md:max-w-[260px] overflow-ellipsis overflow-hidden'>{campaign.track?.artists[0].name}</h4>
                            </div>
                        </div>}
                        <div className='flex flex-col gap-4 pb-4 border-b border-b-gray/20'>
                            <h1 className='font-semibold'>Ödeme detayları</h1>
                            <div className='flex justify-between'>
                                <span>Paket</span>
                                <span>{campaign.package?.currency != null && campaign.package?.currency === "USD" ? `${(Number(campaign.package?.price) * 30).toString()}` : campaign.package?.price} ₺</span>
                            </div>
                            {campaign.startDate?.price ?
                                (<div className='flex justify-between'>
                                    <span>Tarih</span>
                                    <span>{campaign.startDate?.price} ₺</span>
                                </div>

                                ) : null
                            }
                        </div>
                        <div>

                            <div className='flex justify-between font-semibold'>
                                <h1>Toplam</h1>
                                {/* PAKET VE TARİH FİYAT TOPLAMI */}
                                <h1>
                                    {
                                        campaign.startDate?.price ?
                                            (campaign.package?.currency != null && campaign.package?.currency === "USD" ? (Number(campaign.package?.price) * 30) : campaign.package?.price) + campaign.startDate?.price
                                            :
                                            (campaign.package?.currency != null && campaign.package?.currency === "USD" ? (Number(campaign.package?.price) * 30) : campaign.package?.price)
                                    }
                                     ₺</h1>
                            </div>

                        </div>
                        <Button block status='primary' label='Ödemeye geç' />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    </div>
}
