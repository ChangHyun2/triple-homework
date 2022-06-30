import { keyframes, css as emotionCss } from '@emotion/react'
import { Keyframes } from '@emotion/serialize'

export const bounceKeyframes = keyframes`
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

const createAnimationCssCreator = (keyframes: Keyframes) => (css: string) =>
  emotionCss`animation: ${keyframes} ${css};`

export const bounceAnimationCss = createAnimationCssCreator(bounceKeyframes)
