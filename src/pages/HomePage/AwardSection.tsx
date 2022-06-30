import { useEffect, useRef, forwardRef } from 'react'

import {
  StyledAwardSection,
  StyledAwardHeroImage,
  StyledAwardDetail,
  StyledAwardReasons,
  StyledAwardBadges,
} from './AwardSeciton.styled'

import badgeApple4xSrc from '@assets/badge-apple4x.png'
import playStore2xSrc from '@assets/play-store2x.png'
import triple2xSrc from '@assets/triple2x.png'
import Image from '@components/Image'
import AnimationCounter from '@components/AnimationCounter'
import useIntersectionObserver from '@hooks/useIntersectionObserver'

export default forwardRef<HTMLElement>(function AwardSection(props, ref) {
  const observerRef = useRef<HTMLDivElement>(null)
  const { inView, unObserve } = useIntersectionObserver(observerRef, {})

  useEffect(() => {
    if (inView) {
      unObserve(observerRef.current!)
    }
  }, [inView, unObserve])

  return (
    <StyledAwardSection ref={ref}>
      <div ref={observerRef} style={{ width: '100%' }} />
      <StyledAwardHeroImage inView={inView}>
        <Image src={triple2xSrc} alt="트리플 앱 2018 구글 플레이스토어 수상" />
        <div className="hero-image-label">2021년 12월 기준</div>
      </StyledAwardHeroImage>
      <StyledAwardDetail className="detail">
        <div>
          <StyledAwardReasons inView={inView}>
            <p>
              <strong>
                <AnimationCounter
                  start={0}
                  end={700}
                  milliSec={2000}
                  shouldRequestAnimation={inView}
                />
                만 명
              </strong>
              의 여행자
            </p>
            <p>
              <strong>
                <AnimationCounter
                  start={0}
                  end={100}
                  milliSec={2000}
                  shouldRequestAnimation={inView}
                />
                만 개
              </strong>
              의 여행 리뷰
            </p>
            <p>
              <strong>
                <AnimationCounter
                  start={0}
                  end={470}
                  milliSec={2000}
                  shouldRequestAnimation={inView}
                />
                만 개
              </strong>
              의 여행 일정
            </p>
          </StyledAwardReasons>
          <StyledAwardBadges inView={inView}>
            <li>
              <Image
                width="50px"
                height="50px"
                src={playStore2xSrc}
                alt="구글 플레이 스토어 2018년 최고의 앱 뱃지"
              />
              <p>
                2018 구글 플레이스토어
                <br />
                올해의 앱 취우수상 수상
              </p>
            </li>
            <li>
              <Image
                width="50px"
                height="50px"
                src={badgeApple4xSrc}
                alt="애플 앱스토어"
              />
              <p>
                2018 애플 앱스토어
                <br />
                오늘의 여행앱 선정
              </p>
            </li>
          </StyledAwardBadges>
        </div>
      </StyledAwardDetail>
    </StyledAwardSection>
  )
})
