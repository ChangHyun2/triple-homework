import { StyledHomePage } from './index.styled'
import AwardSection from './AwardSection'
import InstallSection from './InstallSection'

export default function HomePage() {
  return (
    <StyledHomePage>
      <InstallSection />
      <AwardSection />
    </StyledHomePage>
  )
}
