"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

const CategorySearch = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = () => {
        GlobalApi.getCategory().then(response => {
            // console.log(response.data.data);
            setCategoryList(response.data.data);
        })
    }
    return (
        <div className='mb-10 px-5 flex items-center flex-col gap-2'>
            <h2 className='font-bold text-4xl tracking-wide'>
                Search <span className='text-primary'>Doctor</span>
            </h2>
            <h2 className='text-gray-500 text-xl'>
                Serach Your Doctor and Book Appointment in one click
            </h2>

            <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
                <Input type="text" placeholder="Search Doctor" />
                <Button type="submit">
                    <Search className='h-4 w-4 mr-2' />
                    Search
                </Button>
            </div>

            <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6'>
                {categoryList.length > 0 ? categoryList.map((item, index) => index < 6 && (
                    <Link href={'/search/'+item?.attributes?.Name} key={index} className='flex items-center p-5 m-2
                        bg-blue-50 rounded-lg flex-col text-center gap-2
                        hover:scale-110 transition-all ease-in-out cursor-pointer'
                    >
                        <Image src={item.attributes?.Icon?.data?.attributes?.url}
                            width={40}
                            height={40}
                            alt='Icon'
                        />
                        <label className='text-blue-600 text-sm'>
                            {item?.attributes?.Name}
                        </label>
                    </Link>
                ))
                    :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='h-[100px] bg-slate-100
                         w-[100px] m-2 rounded-lg animate-pulse'>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategorySearch