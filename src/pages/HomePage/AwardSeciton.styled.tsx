import styled from '@emotion/styled'
import s from 'csd'

export const StyledAwardSection = styled.section`
  ${s.rowSpaceBetween};
  align-items: start;
  padding: 140px 0 100px 0;
  margin: 0 auto;
  min-width: 1060px;
`

export const StyledHeroImage = styled.div`
  position: relative;
  width: 400px;
  height: 338px;

  .hero-image-label {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%);
  }
`

export const StyledAwardDetail = styled.div`
  ${s.col}
`

export const StyledAwardReasons = styled.ul`
  font-size: 36px;
  margin-bottom: 50px;

  p {
    ${s.mb2}
    line-height: 1;
  }
`

export const StyledAwardBadges = styled.ul`
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
`
