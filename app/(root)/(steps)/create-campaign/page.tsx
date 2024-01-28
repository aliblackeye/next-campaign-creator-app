"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Stores
import { useCampaignStore } from '@store/campaign-store';

// Services
import CampaignServices from '@services/campaign-services';

// Utils
import { formatDateRange } from '@utils/formatDateRange';

// Libraries
import { motion } from 'framer-motion';


// Icons
import { IoClose } from "react-icons/io5";

// Partials
import StepFooter from './_partials/StepFooter';
import SelectItem from './_partials/SelectItem';
import CurrencySelector from './_partials/CurrencySelector';

// Components
import Box from '@components/box';
import Checkbox from '@components/form-elements/checkbox';
import Select from '@components/form-elements/select';
import Image from 'next/image';
import Button from '@components/form-elements/button';

export default function Step() {
  // Stores
  const { campaign, step, setCampaign, setStep } = useCampaignStore();

  // Variables
  const router = useRouter();
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
  // States
  const [songList, setSongList] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])

  const [currency, setCurrency] = useState<"USD" | "TRY">('TRY')

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

  // Check if step is 0
  useEffect(() => {

    if (step === 0) {
      router.push("/");
      router.refresh();
    }
  }, [
    step, router
  ]);

  // Get Genres
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await CampaignServices.getTrackGenres();
      const allGenres = res?.data.map((genre: string, index: number) => ({
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
        value: index.toString()
      }));
      setCampaign({ ...campaign, genreList: allGenres });
    };

    if (campaign.genreList.length === 0) {
      fetchGenres();
    }
  }, [
    campaign.genreList,
    setCampaign,

  ]);

  // Get Packages
  useEffect(() => {
    const fetchPackages = async () => {
      const res = await CampaignServices.getPackages();

      const sortedPackages = res?.data.filter((p: any) => p.currency === campaign.currency).sort((a: any, b: any) => b.price - a.price)

      setCampaign({ ...campaign, package: sortedPackages[0] });
      setPackages(sortedPackages);
    };

    if (packages.length === 0) {
      fetchPackages();
    }
  }, [

    campaign.currency,
    packages,
    setCampaign,
  ]
  );

  // Get Dates
  useEffect(() => {
    const fetchDates = async () => {
      const res = await CampaignServices.getDates();

      const datesSorted = res?.data?.sort((a: any, b: any) => b.price - a.price)

      const mostExpensiveDate = datesSorted[0];


      setCampaign({
        ...campaign,
        dates:datesSorted,
        startDate: mostExpensiveDate,
      });
    };

    fetchDates();
  }, []);

  /* ADIM 1 - PARÇA SEÇİMİ */
  if (step === 1) {
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

        <StepFooter disabled={!campaign.notPublished && !campaign.track} />
      </motion.div>
    )
  }

  /* ADIM 2 - BÖLGE SEÇİMİ */
  if (step === 2) {
    return (
      <div
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
            options={
              campaign.genreList
            }
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
        <StepFooter disabled={campaign.selectedGenres.length === 0} />
      </div>
    )
  }

  /* ADIM 3 - PAKET SEÇİMİ */
  if (step === 3) {

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

  /* ADIM 4 - TARİH SEÇİMİ*/
  if (step === 4) {
    return <div

      className="flex justify-center flex-col">
      {/* TARİH SEÇİMİ */}
      <Box>
        <div className='mb-6'>
          <h1 className='text-gray text-sm'>Güzel seçim! Şimdi kampanya tarihini belirle</h1>
          <h1>Tahmini başlangıç tarihini seç</h1>
        </div>

        {campaign.dates?.map((dateItem: any, index: number) => {

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

  /* ADIM 5 - ÖDEME*/
  if (step === 5) {
    return <div
      className="flex justify-center flex-col">
      <h1 className='text-2xl font-semibold pb-6 border-b border-b-gray/30 mb-6'>Onayla ve ödemeye geç</h1>

      <div className='flex justify-between gap-24 flex-col md:flex-row'>
        <div className='flex-[14]  gap-4 flex flex-col'>
          <h1 className='text-lg'>Kampanya özetin</h1>

          <div className='clicks flex'>
            <div className='flex-1'>
              <h4 className='text-sm'>Tıklanma</h4>
              <h1 className='text-base font-medium'>{campaign.package?.click.toLocaleString()}</h1>
            </div>
            <div className='flex items-end cursor-pointer hover:text-primary transition-all'
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
            <div className='flex items-end cursor-pointer hover:text-primary transition-all' onClick={() => { setStep(4) }}>
              Düzenle
            </div>
          </div>

        </div>

        <div className='flex-[10]'>
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
              <div className='flex flex-col gap-4 pb-4 border-b border-b-gray'>
                <h1 className='font-semibold'>Ödeme detayları</h1>
                <div className='flex justify-between'>
                  <span>Paket</span>
                  <span>{campaign.package?.price} ₺</span>
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
                  <h1>{
                    campaign.startDate?.price ? campaign.package?.price + campaign.startDate?.price : campaign.package?.price
                  } ₺</h1>
                </div>

              </div>
              <Button block status='primary' label='Ödemeye geç' />


            </div>
          </div>
        </div>
      </div>
    </div>
  }

}
