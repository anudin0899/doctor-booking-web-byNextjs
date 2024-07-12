import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const DoctorSuggestionList = () => {

    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        getDoctorList();
    }, []);

    const getDoctorList = () => {
        GlobalApi.getDoctorList().then(response => {
            setDoctorList(response.data.data);
        })
    }


    return (
        <div className='p-4 border-[1px] mt-5 md:ml-5 rounded-lg'>
            <h2 className='mb-3 font-bold'>Suggestions</h2>

            {doctorList && doctorList.map((doctor, index) => (
                <div key={index} className='mb-4 p-3 shadow-sm w-full
                rounded-lg flex items-center gap-3 cursor-pointer
                hover:bg-slate-100'
                >
                    <Image src={doctor?.attributes?.Images?.data?.attributes?.url}
                        alt='doctor-image'
                        width={70}
                        height={70}
                        className='rounded-lg h-[70px] w-[70px] object-cover'
                    />
                    <div className='mt-3 flex flex-col'>
                        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full mb-2 
                        px-2 text-primary'>
                            {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
                        </h2>
                        <h2 className='font-bold text-sm'>{doctor?.attributes?.Name}</h2>
                        <h2 className='font-medium text-sm'>{doctor?.attributes?.Experiences} Years</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DoctorSuggestionList