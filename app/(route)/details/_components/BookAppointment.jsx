import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from "sonner"

const BookAppointment = ({ doctor }) => {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [notes, setNotes] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const { user } = useKindeBrowserClient();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            });
            timeList.push({
                time: i + ':30 AM'
            });
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            });
            timeList.push({
                time: i + ':30 PM'
            });
        }
        setTimeSlot(timeList);
    }

    const isPastDay = (day) => {
        return day <= new Date();
    }

    const saveBooking = () => {
        const data = {
            data: {
                UserName: user?.given_name + " " + user?.family_name,
                Email: user?.email,
                Time: selectedTimeSlot,
                Date: date,
                doctors: doctor.id,
                Note: notes
            }
        }
        GlobalApi.bookAppointment(data).then(resp => {
            if (resp) {
                GlobalApi.sendEmail(data).then(response=>{
                    console.log(response);
                })
                toast("Booking Confirmation Sent on Email");
                setIsOpen(false); // Close the dialog after saving
            }
        })
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className='mt-3 rounded-full'>Book Appointment</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                            <div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    {/* Calendar */}
                                    <div className=' mt-3 md:mt-0'>
                                        <h2 className='flex items-center gap-2 mb-3'><CalendarDays className='text-primary h-5 w-5' /> Select Date</h2>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={isPastDay}
                                            className="rounded-md border"
                                        />
                                    </div>
                                    {/* Time Slot */}
                                    <div className='mt-3 md:mt-0'>
                                        <h2 className='flex gap-2 items-center mb-3'>
                                            <Clock className='text-primary h-5 w-5' />
                                            Select Time Slot
                                        </h2>
                                        <div className='grid grid-cols-3 gap-2 
                                        rounded-lg p-5 border'>
                                            {timeSlot?.map((item, index) => (
                                                <h2
                                                    key={index}
                                                    onClick={() => setSelectedTimeSlot(item?.time)}
                                                    className={`p-2 border rounded-full text-center
                                                    hover:bg-primary hover:text-white cursor-pointer 
                                                    ${item?.time == selectedTimeSlot && 'bg-primary text-white'}`}
                                                >
                                                    {item?.time}
                                                </h2>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Textarea className='mt-3'
                                    placeholder="Type your message here."
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className='text-red-600 border-red-500 
                                hover:text-red-600'
                                variant="outline"
                            >
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={saveBooking}
                            disabled={!(date && selectedTimeSlot)}
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BookAppointment
