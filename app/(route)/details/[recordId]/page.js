"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetails from '../_components/DoctorDetails';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';

const Details = ({ params }) => {

  const [doctor, setDoctor] = useState();



  useEffect(() => {
    getDoctorById();
  }, [])

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params?.recordId).then(response => {
      console.log(response.data.data);
      setDoctor(response.data.data);
    });
  }
  return (
    <div className='p-5 '>
      <h2 className='font-bold text-[22px]'>Doctor Detail</h2>

      <div className='grid grid-cols-1 lg:grid-cols-4'>
        {/* Doctor Details */}
        <div className='col-span-3'>
          {doctor && <DoctorDetails doctor={doctor} />}
        </div>

        {/* Doctor Suggestion */}
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  )
}

export default Details