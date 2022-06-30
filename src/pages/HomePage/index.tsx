import { useRef } from 'react'

import { StyledHomePage } from './index.styled'
import AwardSection from './AwardSection'
import InstallSection from './InstallSection'
import ReservationSection from './ReservationSection'

export default function HomePage() {
  const awardSectionRef = useRef<HTMLElement>(null)

  const scrollToAwardSection = () => {
    awardSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <StyledHomePage>
      <InstallSection onClickArrowDownButton={scrollToAwardSection} />
      <AwardSection ref={awardSectionRef} />
      <ReservationSection />
    </StyledHomePage>
  )
}
