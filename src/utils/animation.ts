import { keyframes, css as emotionCss } from '@emotion/react'
import { Keyframes } from '@emotion/serialize'

export const bounceAnimation = keyframes`
    0% {
       transform: translateY(0px);
    }
    50%{
       transform:translateY(20px); 
    }
    100%{
       transform: translateY(0px);
    }
`
export const fadeInFromBottomAnimation = keyframes`
    0% {
        opacity:0;
        transform:translateY(30px);
    }
    100%{
        opacity:1;
        transform:translateY(0px);
    }
`

const createAnimationCssCreator = (animation: Keyframes) => (css: string) =>
  emotionCss`animation: ${animation} ${css};`

export const bounceAnimationCss = createAnimationCssCreator(bounceAnimation)
export const fadeInFromBottomAnimationCss = createAnimationCssCreator(
  fadeInFromBottomAnimation,
)
