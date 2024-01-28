"use client"

// Fonts
import { alata } from "@fonts/fonts"

// Partials
import Progresses from "./_partials/Progresses"

export default function CampaignStepHeader() {
  return (
    <header className={`py-[30px] flex items-center w-full border border-border mb-10 md:mb-20  text-center `}>
      <div className="container">
        <div className="flex flex-col gap-4  md:flex-row">
          <h2 className={`${alata.className} brand text-xl`}>
            Kampanya Oluştur
          </h2>
          <Progresses/>
        </div>
      </div>
    </header>
  )
}
