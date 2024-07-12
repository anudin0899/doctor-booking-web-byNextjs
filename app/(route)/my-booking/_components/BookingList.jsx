
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CancelBooking from './CancelBooking'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

const BookingList = ({ bookingList, expired, updateRecord }) => {

    const handleDeleteBooking = (item) => {
        GlobalApi.deleteBooking(item.id).then(resp => {
            toast('Booking Cancel Sucessfully');
            updateRecord();
        })
    }

    return (
        <div>
            {bookingList && bookingList.map((item, index) => (
                <div key={index} className='flex gap-5 items-center my-2 border-[1px] p-5 rounded-lg'>
                    <Image src={item.attributes.doctor?.data?.attributes?.Images?.data?.attributes?.url}
                        width={70}
                        height={70}
                        alt='doctor-image'
                        className='h-[70px] w-[70px] rounded-full object-cover'
                    />
                    <div className='flex flex-col gap-2 w-full'>
                        <h2 className='font-bold text-[18px] justify-between flex '>
                            {item?.attributes?.doctor?.data?.attributes?.Name}
                            {!expired && <CancelBooking onCancelClick={() => handleDeleteBooking(item)} />}
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'>
                            <MapPin className='text-primary h-5 w-5' />
                            {item?.attributes?.doctor?.data?.attributes?.Address}
                        </h2>
                        <h2 className='flex gap-2 text-md'><Calendar className='text-primary h-5 w-5' />
                            Appointment On : {moment(item?.attributes?.Date).format('DD-MM-YYYY')}
                        </h2>
                        <h2 className='flex gap-2 text-md' ><Clock className='text-primary h-5 w-5 ' />
                            At Time : {item?.attributes?.Time}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingList