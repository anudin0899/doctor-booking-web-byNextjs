'use client'
import { useEffect, useState } from 'react'

import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import Hero from "./_components/Hero";
import GlobalApi from './_utils/GlobalApi';


export default function Home() {


  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, [])

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then(response => {
      setDoctorList(response?.data?.data)
    })
  }


  return (
    <div>

      {/* Hero Section */}
      <Hero />

      {/* Search Category Section */}
      <CategorySearch />

      {/* Popular Doctor Section */}
      <DoctorList DoctorList={doctorList} />

    </div>
  );
}
