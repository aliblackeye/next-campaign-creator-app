"use client";

// Libs
import { useState } from 'react'
import { motion } from 'framer-motion'

// Store
import { useCampaignStore } from '@store/campaign-store'

// Services
import CampaignServices from '@services/campaign-services'

// Partials
import StepFooter from '../_partials/StepFooter';

// Components
import Box from '@components/box'
import Select from '@components/form-elements/select'
import Checkbox from '@components/form-elements/checkbox'

export default function Step1() {

    // Stores
    const { campaign, setCampaign, } = useCampaignStore();

    // States
    const [songList, setSongList] = useState<any[]>([])

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

    // Functions
    const searchSongOptions = async (search: string,
        cb: (options: { label: string, value: string }[]) => void
    ) => {

        const songs = await CampaignServices.getSearchSong(search)
        const formattedSongs = songs?.tracks?.items?.map((song: any) => (
            {
                label: `${song?.artists.map((artist: any) => artist.name).join(", ")
                    } - ${song.name}`,
                value: song.id,
                ...song
            }
        )
        )
        cb(formattedSongs)
        setSongList(formattedSongs)
    }


    const handleChangeSong = async (song: any) => {
        setCampaign({ ...campaign, track: song })
    }


    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex justify-center flex-col">
            <Box
                title='Parçanı seç'
                subTitle='Kampanyayı oluşturmak istediğin parçayı seç.'
            >
                <Select
                    asyncSelect
                    placeholder="Spotify'da ara"
                    options={songList}
                    asyncOptions={searchSongOptions}
                    noOptionsMessage={"Parça bulunamadı."}
                    disabled={campaign.notPublished}
                    loadingMessage="Aranıyor..."
                    onChange={handleChangeSong}
                    defaultInputValue={
                        campaign.track?.name
                            ? campaign.track?.name
                            : campaign.notPublished
                                ? "Parça seçilmedi."
                                : ""
                    }
                    defaultValue={
                        campaign.track?.name
                            ? { label: campaign.track?.name, value: campaign.track?.id }
                            : null
                    }
                />

                <Checkbox
                    name='notPublic'
                    className='mt-3'
                    label='Parçam yayında değil.'
                    checked={campaign.notPublished}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCampaign({ ...campaign, notPublished: true, track: null })
                        }

                        else {
                            setCampaign({ ...campaign, notPublished: false })
                        }
                    }}
                />
            </Box>

            <StepFooter disabled={!campaign.notPublished && !campaign.track}  animationDisabled />
        </motion.div>
    )
}
