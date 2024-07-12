'use client'
import React from 'react'
import DoctorCard from './DoctorCard'


const DoctorList = ({ DoctorList, Heading = 'Popular Doctors' }) => {



    return (
        <div className='mb-20 px-8'>
            <h2 className=' font-bold text-xl'>{Heading}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2
                md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
                {DoctorList.length > 0 ? DoctorList.map((item, index) => index < 4 && (
                    <DoctorCard item={item} key={index}/>
                ))
                    :

                    [1, 2, 3, 4].map((item, index) => (
                        <div key={index} className='h-[200px] bg-slate-100
                         w-full rounded-lg animate-pulse m-2'>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default DoctorList