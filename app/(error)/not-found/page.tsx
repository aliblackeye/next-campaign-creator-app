"use client"

import Button from '@components/form-elements/button'
import Link from 'next/link'


export default function NotFound() {
    return (
        <div className='text-primary text-center h-screen flex justify-center items-center flex-col'>
            <h2 className='text-5xl mb-2'>Not Found - 404 </h2>
            <p>Üzgünüz, sayfa bulunamadı veya erişim izniniz yok.</p>
            <Link href={"/"}>
                <Button className='mt-6 bor' label="Ana Sayfa'ya Dön" status='primary' />
            </Link>
        </div>
    )

}