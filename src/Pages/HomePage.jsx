import React from 'react'
import HeroSection from '../Components/Home/HeroSection'
import StickyScroll from '../Components/Home/StickyScroll'
import ServicesMarquee from '../Components/Home/ServicesMarquee'
import CaseStudy from '../Components/Home/CaseStudy'
import WhyChooseUs from '../Components/Home/WhyChooseUs'
import TestimonialSection from '../Components/Home/TestimonialSection'
import LifeAtCSK from '../Components/Home/LifeAtCSK'
import ClientPartnerSection from '../Components/Home/ClientPartnerSection'
import PartnersSection from '../Components/Home/PartnersSection'
import TrustedAlliances from '../Components/Home/TrustedAlliances'



const HomePage = () => {
  return (
    <div>
      <HeroSection/> 
         {/* <StickyScroll/> */}
      <ServicesMarquee/>
      <CaseStudy/>
      <WhyChooseUs/>
      <TestimonialSection/>
      <LifeAtCSK/>
      {/* <ClientPartnerSection/> */}
      <TrustedAlliances/>  
    </div>
  )
}

export default HomePage
