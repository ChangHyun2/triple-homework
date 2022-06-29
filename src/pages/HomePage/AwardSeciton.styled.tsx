import styled from '@emotion/styled'
import s from 'csd'

import { fadeInFromBottomAnimationCss } from '@utils/animation'

export const StyledAwardSection = styled.section`
  ${s.rowSpaceBetween};
  align-items: start;
  padding: 140px 0 100px 0;
  margin: 0 auto;
  min-width: 1060px;
`

export const StyledAwardHeroImage = styled.div<{ inView: boolean }>`
  position: relative;
  width: 400px;
  height: 338px;

  .hero-image-label {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%);
  }

  ${({ inView }) => (inView ? fadeInFromBottomAnimationCss('700ms') : '')}
`

export const StyledAwardDetail = styled.div`
  ${s.col}
`

export const StyledAwardReasons = styled.ul<{ inView: boolean }>`
  font-size: 36px;
  margin-bottom: 50px;

  p {
    ${s.mb2}
    line-height: 1;
  }

  ${({ inView }) => (inView ? fadeInFromBottomAnimationCss('700ms') : '')}
  animation-delay:100ms;
`

export const StyledAwardBadges = styled.ul<{ inView: boolean }>`
  ${s.row}

  li {
    ${s.row}

    p {
      margin-left: 8px;
      line-height: 1.5;
      font-size: 14px;
    }
  }

  li:first-of-type {
    margin-right: 40px;
  }

  ${({ inView }) => (inView ? fadeInFromBottomAnimationCss('700ms') : '')}
  animation-delay:200ms;
`
