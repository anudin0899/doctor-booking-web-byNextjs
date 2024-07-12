"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'


const MyBooking = () => {
    const { user } = useKindeBrowserClient();
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        user && getUserBookingList();
    }, [user]);

    const getUserBookingList = () => {
        GlobalApi.getUserBooking(user?.email).then(response => {
            setBookingList(response.data.data);
        })
    }

    // Used to filter user booking
    const filterUserBooking = (type) => {
        const result = bookingList.filter(item =>
            type == 'upcoming' ? new Date(item.attributes.Date) >= new Date() :
                new Date(item.attributes.Date) < new Date()
        )
        return result;
    }
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl'>My Booking</h2>


            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList
                        updateRecord={() => getUserBookingList()}
                        expired={false}
                        bookingList={filterUserBooking('upcoming')}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList
                        expired={true}
                        updateRecord={() => getUserBookingList()}
                        bookingList={filterUserBooking('expired')}
                    />
                </TabsContent>
            </Tabs>


        </div>
    )
}

export default MyBooking
