import React from 'react'
import ServicesPageHeroSection from '../Components/Services/Servicespageherosection'
import ServicePageIntroSection from '../Components/Services/ServicePageIntroSection'
import WhatWeDeliver from '../Components/Services/Whatwedeliver'

import ITServicesSection from '../Components/Services/Itservicessection'
import AllServicesWithNav from '../Components/Services/AllServicesWithNav'
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <ServicesPageHeroSection/>
        {/* <ServicePageIntroSection/> */}
       <AllServicesWithNav
        onServiceClick={(slug) => {
          console.log("clicked:", slug);
          navigate(`/service/${slug}`);
        }}
      />
        <ITServicesSection/>
        {/* <WhatWeDeliver/> */}
        
    </div>
  )
}

export default ServicePage
