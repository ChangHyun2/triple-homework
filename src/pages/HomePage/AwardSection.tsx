import {
  StyledAwardSection,
  StyledHeroImage,
  StyledAwardDetail,
  StyledAwardReasons,
  StyledAwardBadges,
} from './AwardSeciton.styled'

import badgeApple4xSrc from '@assets/badge-apple4x.png'
import playStore2xSrc from '@assets/play-store2x.png'
import triple2xSrc from '@assets/triple2x.png'
import Image from '@components/Image'
import Counter from '@components/Counter'

export default function AwardSection() {
  return (
    <StyledAwardSection>
      <StyledHeroImage>
        <Image src={triple2xSrc} alt="트리플 앱 2018 구글 플레이스토어 수상" />
        <div className="hero-image-label">2021년 12월 기준</div>
      </StyledHeroImage>
      <StyledAwardDetail className="detail">
        <div>
          <StyledAwardReasons>
            <p>
              <strong>
                <Counter start={0} end={700} milliSec={2000} />만 명
              </strong>
              의 여행자
            </p>
            <p>
              <strong>
                <Counter start={0} end={100} milliSec={2000} />만 개
              </strong>
              의 여행 리뷰
            </p>
            <p>
              <strong>
                <Counter start={0} end={470} milliSec={2000} />만 개
              </strong>
              의 여행 일정
            </p>
          </StyledAwardReasons>
          <StyledAwardBadges>
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
}
