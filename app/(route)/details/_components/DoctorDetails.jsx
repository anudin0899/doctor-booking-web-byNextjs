import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment'

const DoctorDetails = ({ doctor }) => {

    const socialMediaList = [
        { id: 1, icon: '/X-logo.png', url: '' },
        { id: 2, icon: '/youtube-logo.png', url: '' },
        { id: 3, icon: '/linkedin-logo.png', url: '' },
        { id: 4, icon: '/instagram-logo.png', url: '' },
        { id: 5, icon: '/facebook-logo.png', url: '' },
    ];

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
                {/* Doctor Image */}
                <div className=''>
                    <Image src={doctor?.attributes?.Images?.data?.attributes?.url}
                        alt='doctor-image'
                        width={200}
                        height={200}
                        className='rounded-lg h-[250px] w-full object-cover'
                    />
                </div>
                {/* Doctor Info */}
                <div className='col-span-2 mt-5 md:px-10 flex flex-col gap-3 items-baseline'>
                    <h2 className='font-bold text-2xl'>{doctor?.attributes?.Name}</h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <GraduationCap />
                        <span>{doctor?.attributes?.Experiences} Year of Experience</span>
                    </h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <MapPin />
                        <span>{doctor?.attributes?.Address}</span>
                    </h2>
                    <h2 className='text-sm bg-blue-100 p-1 rounded-full mb-2 
                    px-2 text-primary'>
                        {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
                    </h2>
                    <div className='flex gap-3'>
                        {socialMediaList.map((item, index) => (
                            <Image src={item.icon}
                                alt='icon'
                                width={30}
                                height={30}
                                key={index}
                                className='cursor-pointer'
                            />
                        ))}
                    </div>
                    <BookAppointment doctor={doctor} />
                </div>

                {/* About Doctor */}

            </div>
            <div className='mt-5 p-3 border-[1px] rounded-lg'>
                <h2 className='font-bold text-2xl'>About Me</h2>
                <p className='text-gray-500 tracking-wider mt-2'>{doctor?.attributes?.Abouts}</p>
            </div>
        </div>
    )
}

export default DoctorDetails