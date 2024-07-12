"use client"
import DoctorCard from '@/app/_components/DoctorCard';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'

const Search = ({ params }) => {

    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        getDoctorByCategory();
    }, [])

    const getDoctorByCategory = () => {
        GlobalApi.getDoctorByCategory(params.cname).then(response => {
            setDoctorList(response.data.data);
        })
    }

    return (
        <div className='mt-6 pl-5' >
            <h2 className=' font-bold text-xl'>{params?.cname}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2
                md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5'>
                {doctorList.length > 0 ? doctorList.map((item, index) => index < 4 && (
                    <DoctorCard item={item} key={index} />
                ))
                    :

                    [1, 2, 3, 4].map((item, index) => (
                        <div key={index} className='h-[200px] bg-slate-100
                         w-full rounded-lg animate-pulse m-2'>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Search