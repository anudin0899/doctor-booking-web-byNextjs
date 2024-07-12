'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const CategoryList = () => {

    const params = usePathname();

    const [categoryList, setCategoryList] = useState([]);

    const category = params.split('/')[2];

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = () => {
        GlobalApi.getCategory().then(response => {
            setCategoryList(response.data.data);
        })
    }


    return (
        <div className='h-screen  mt-5 flex flex-col'>

            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className='overflow-visible'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="" >
                        {categoryList && categoryList.map((item, index) => (
                            <CommandItem key={index}>
                                <Link href={'/search/' + item?.attributes?.Name}
                                className={`p-2 flex gap-2 w-full items-center
                                text-[14px] text-blue-600 rounded-md cursor-pointer
                                ${category == item.attributes.Name && 'bg-blue-100'}`}>
                                    <Image src={item.attributes?.Icon?.data?.attributes?.url}
                                        width={25}
                                        height={25}
                                        alt='Icon'
                                    />
                                    <label >{item?.attributes?.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>


        </div>
    )
}

export default CategoryList