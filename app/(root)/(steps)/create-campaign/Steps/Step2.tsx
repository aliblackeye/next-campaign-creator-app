"use client";

// Libs
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

// Services
import CampaignServices from '@services/campaign-services';

// Store
import { useCampaignStore } from '@store/campaign-store';

// Icons
import { IoClose } from 'react-icons/io5';

// Partials
import CurrencySelector from '../_partials/CurrencySelector'
import StepFooter from '../_partials/StepFooter'

// Components
import Box from '@components/box'
import Select from '@components/form-elements/select'



export default function Step2() {

    // Variables
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 4,
                staggerChildren: 4
            }
        }
    }
    
    // Stores
    const { campaign, setCampaign } = useCampaignStore();

    // States
    const [currency, setCurrency] = useState<"USD" | "TRY">('TRY')

    // Functions
    const fetchGenres = async () => {
        const res = await CampaignServices.getTrackGenres();
        const allGenres = res?.data.map((genre: string, index: number) => ({
            label: genre.charAt(0).toUpperCase() + genre.slice(1),
            value: index.toString()
        }));
        setCampaign({ ...campaign, genreList: allGenres });
    };

    const handleChangeGenre = (newValues: any) => {
        const newValuesFormatted = newValues.map((genre: any) => ({
            label: genre.label,
            value: genre.value
        }))
        setCampaign({ ...campaign, selectedGenres: newValuesFormatted });
    };

    const handleRemoveGenre = (removed: any) => {
        const filteredGenres = campaign.selectedGenres.filter(g => g.value !== removed.value);
        setCampaign({ ...campaign, selectedGenres: filteredGenres });
    }

    // Effects  
    useEffect(() => {

        if (campaign.genreList === null) {
            fetchGenres();
        }
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex justify-center flex-col gap-11">
            {/* BÖLGE SEÇİMİ */}
            <Box title='Bölgeni seç' subTitle='Kampanyayı yayınlamak istediğin bölgeyi seç.'>
                <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </Box>
            {/* PARÇA TÜRÜ SEÇİMİ */}
            <Box title='Parçanın türünü seç' subTitle='Seçtiğin parçanın türlerini belirle.'>
                <Select
                    key={campaign.selectedGenres?.length}
                    placeholder="Tür ara"
                    options={campaign.genreList || []}
                    value={campaign.selectedGenres.map((genre: any) => {
                        return { label: genre.label, value: genre.value }
                    })}
                    onChange={handleChangeGenre}
                    isMulti
                />

                {/* SEÇİLEN TÜRLER */}
                <div className="flex flex-row flex-wrap  items-center mt-3 gap-4 " >
                    {campaign.selectedGenres?.map((genre: any, index: number) => (
                        <div className="flex text-14 font-medium items-center justify-center bg-white border-gray/30 border px-2 py-1 rounded-[6px] gap-1" key={index} onClick={
                            () => handleRemoveGenre(genre)
                        }>
                            <span className='leading-6'>{genre.label}</span>
                            <IoClose size={16} className='text-gray flex items-center justify-center relative' />
                        </div>
                    ))}
                </div>
            </Box>
            <StepFooter disabled={campaign.selectedGenres.length === 0} animationDisabled />
        </motion.div>
    )
}
