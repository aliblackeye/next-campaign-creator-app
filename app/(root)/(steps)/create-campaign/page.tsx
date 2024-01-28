"use client"

// Libs
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Stores
import { useCampaignStore } from '@store/campaign-store';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';

export default function Step() {
  // Stores
  const { step } = useCampaignStore();

  // Variables
  const router = useRouter();

  // Effects
  useEffect(() => {
    if (step === 0) {
      router.push("/");
      router.refresh();
    }
  }, [step]);


  /* ADIM 1 - PARÇA SEÇİMİ */
  if (step === 1) {
    return <Step1 />
  }

  /* ADIM 2 - BÖLGE SEÇİMİ */
  if (step === 2) {
    return <Step2 />
  }

  /* ADIM 3 - PAKET SEÇİMİ */
  if (step === 3) {
    return <Step3 />
  }

  /* ADIM 4 - TARİH SEÇİMİ*/
  if (step === 4) {
    return <Step4 />
  }

  /* ADIM 5 - ÖDEME*/
  if (step === 5) {
    return <Step5 />
  }

}
