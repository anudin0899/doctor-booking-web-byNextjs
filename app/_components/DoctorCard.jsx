import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DoctorCard = ({ item, }) => {
    return (
        <div className='border-[1px] rounded-xl p-3
            cursor-pointer  hover:shadow-sm 
            hover:scale-105 transition-all ease-in-out' >
            <Image src={item?.attributes?.Images?.data?.attributes?.url}
                alt='doctor'
                width={500}
                height={200}
                className='h-[180px] w-full object-cover rounded-lg'
            />
            <div className='mt-3 items-baseline flex flex-col gap-2'>
                <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                    {item?.attributes?.categories?.data[0]?.attributes?.Name}
                </h2>
                <h2 className='font-bold'>{item?.attributes.Name}</h2>
                <h2 className='text-primary text-sm'>{item.attributes?.Experience} Years</h2>
                <h2 className='text-gray-500 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{item.attributes?.Address}</h2>

                <Link href={'/details/' + item?.id} className='w-full'>
                    <h2 className='p-2 px-3 border-[1px]
                    border-primary text-primary rounded-full 
                    text-center w-full text-[16px] font-bold mt-2 
                    cursor-pointer hover:bg-primary hover:text-white'
                    >
                        Book Now
                    </h2>
                </Link>

            </div>
        </div>
    )
}

export default DoctorCard