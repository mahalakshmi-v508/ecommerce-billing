import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import HowItWorks from './HowItWorks'
import WhyChooseUs from './WhyChooseUs'
import StatsSection from './StatsSection'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="bg-white">

      <HeroSection navigate={navigate} />

      <AboutSection />

      <HowItWorks />

      <WhyChooseUs />

      <StatsSection />

      <Testimonials />

      <Newsletter />

      

    </div>
  )
}