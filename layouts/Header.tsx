"use client"

import { alata } from "@fonts/fonts"

export default function Header() {
    return (
        <header className="py-[30px] w-full border border-border mb-20 text-center">
            <h1 className={`${alata.className} brand text-4xl`}>makromusic Task</h1>
        </header>
    )
}
