import { MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import s from 'csd'

import { bounceAnimationCss } from '~/utils/keyframes'

const StyledInstallSection = styled.section<{ inView: boolean }>`
  ${s.colCenter}
  height: 95vh;
  background-color: #eee;

  * {
    ${s.mb1}
  }

  h1 {
    ${s.mb5}
  }

  p {
    ${s.h22}
  }

  button {
    border: none;
    cursor: pointer;
    position: absolute;
    bottom: 100px;
    font-size: 40px;
    ${bounceAnimationCss('1s infinite')}
  }

  button::after {
    content: 'click!';
    position: absolute;
    top: -100%;
    left: -50%;
  }
`

export default function InstallSection({
  onClickArrowDownButton,
}: {
  onClickArrowDownButton: MouseEventHandler
}) {
  return (
    <StyledInstallSection inView>
      <h1>프론트엔드 지원자 전창현입니다.</h1>
      <p>award section에 intersection observer를 적용하기 위해</p>
      <p>홈 화면의 앱 설치 섹션에 해당되는 공간을 추가했습니다.</p>
      <p>
        마우스 스크롤 또는 화살표 버튼을 클릭하여 과제 결과물을 확인해주시면
        감사하겠습니다!
      </p>
      <button onClick={onClickArrowDownButton}>
        <span
          role="img"
          aria-label="scroll to award section"
          className="arrow-bottom"
        >
          ⬇️
        </span>
      </button>
    </StyledInstallSection>
  )
}
