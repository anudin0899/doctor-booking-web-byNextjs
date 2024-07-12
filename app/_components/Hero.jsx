
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (

        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <Image
                            alt=""
                            src="/doctor12.jpg"
                            width={800}
                            height={800}
                            className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl text-primary font-bold sm:text-4xl">Connect with Top-Rated Doctors Instantly</h2>

                        <p className="mt-4 text-gray-600">
                            Easily find and book appointments with the best doctors in your area.
                            From general practitioners to specialists, access trusted healthcare providers and
                            manage your health effortlessly.
                        </p>

                        <Button className='mt-8'>Explore Now</Button>
                    </div>

                </div>
            </div>
        </section>



    )
}

export default Hero