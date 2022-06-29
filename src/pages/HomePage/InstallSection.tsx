import styled from '@emotion/styled'
import s from 'csd'

import { bounceAnimationCss } from '@utils/animation'

const StyledInstallSection = styled.section<{ inView: boolean }>`
  ${s.colCenter}
  height: 95vh;
  background-color: #eee;

  * {
    ${s.mb1}
  }

  p {
    ${s.h22}
  }

  .arrow-bottom {
    position: absolute;
    bottom: 100px;
    font-size: 40px;
    ${bounceAnimationCss('1s infinite')}
  }
`

export default function InstallSection() {
  return (
    <StyledInstallSection inView>
      <h1>프론트엔드 지원자 전창현입니다.</h1>
      <p>award section에 intersection observer를 적용하기 위해</p>
      <p>홈 화면의 앱 설치 섹션 공간을 추가했습니다.</p>
      <p>아래로 스크롤해 과제 결과물을 확인해주시면 감사하겠습니다!</p>
      <span
        role="img"
        aria-label="scroll to award section"
        className="arrow-bottom"
      >
        ⬇️
      </span>
    </StyledInstallSection>
  )
}
