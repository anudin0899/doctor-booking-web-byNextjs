"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const Header = () => {

    const menu = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Explore', path: '/explore' },
        { id: 3, name: 'Contact Us', path: '/contact' },
    ]

    const path = usePathname();

    const { user, isLoading, } = useKindeBrowserClient();


    return (
        <div className='flex items-center justify-between py-5 shadow-sm md:px-20'>
            <div className='flex items-center gap-10'>
                <Image src='/logo.svg' alt='logo' width={180} height={80} className='w-[160px] h-[40px]' />

                <ul className='md:flex gap-8 hidden'>
                    {menu.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <li

                                className={`hover:text-primary 
                                cursor-pointer hover:scale-105 
                                transition-all ease-in-out
                                ${path == item.path && `text-primary`}`}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {!isLoading && user ?

                <Popover>
                    <PopoverTrigger>
                        <Image src={user?.picture}
                            alt='profile-image'
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                    </PopoverTrigger>
                    <PopoverContent className='w-48'>
                        <ul className='flex flex-col gap-2'>
                            <li className='cursor-pointer rounded-lg bg-slate-50 p-2 hover:bg-blue-200'>Profile</li>
                            <Link href={'/my-booking'} className='cursor-pointer rounded-lg bg-slate-50 p-2 hover:bg-blue-200'>My Booking</Link>
                            <li className='cursor-pointer rounded-lg bg-slate-50 p-2 hover:bg-blue-200'><LogoutLink>Logout</LogoutLink></li>
                        </ul>
                    </PopoverContent>
                </Popover>
                :
                <LoginLink>
                    <Button>Get Started</Button>
                </LoginLink>
            }


        </div >
    )
}

export default Header