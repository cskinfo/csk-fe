import React from 'react'
import SolutionPageHeroSection from '../Components/Solutions/SolutionPageHeroSection'
import Solutionpagesecondsection from '../Components/Solutions/SolutionPageSecondSection'
import Solutionpagethirdsection from '../Components/Solutions/Solutionpagethirdsection'
import SolutionPageFourthSection from '../Components/Solutions/Solutionpagefourthsection'
import SolutionPageFifthSection from '../Components/Solutions/Solutionpagefifthsection'

const SolutionPage = () => {
  return (
    <div>
        <SolutionPageHeroSection/>
        <Solutionpagesecondsection/>
        <Solutionpagethirdsection/>
        <SolutionPageFourthSection/>
        <SolutionPageFifthSection/>
        
      
    </div>
  )
}

export default SolutionPage
