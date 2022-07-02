# triple-homework

triple homework

```
nvm use v16.13.1

yarn install
yarn start
```

# 폴더 구조

```
│   ├── App.tsx
│   ├── components (공통 컴포넌트)
│   │   ├── AnimationCounter
│   │   │   ├── index.styled.tsx
│   │   │   └── index.tsx
│   │   └── Image
│   │       ├── index.styled.tsx
│   │       └── index.tsx
│   ├── custom.d.ts
│   ├── hooks
│   │   ├── useAnimationCount.tsx
│   │   └── useIntersectionObserver.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   └── HomePage
│   │       ├── AwardSeciton.styled.tsx
│   │       ├── AwardSection.tsx
│   │       ├── InstallSection.tsx
│   │       ├── ReservationSection.tsx
│   │       ├── index.styled.tsx
│   │       └── index.tsx
│   ├── public
│   │   ├── assets
│   │   │   ├── badge-apple4x.png
│   │   │   ├── play-store2x.png
│   │   │   └── triple2x.png
│   │   └── index.html
│   └── utils
│       └── keyframes.ts
```

# 1. 애니메이션 카운터 컴포넌트 구현

여러 js 코드가 실행될 수 있다는 것을 가정하고, 부드러운 애니메이션을 구현하기 위해 requestAnimationFrame을 사용했습니다.

## 1.1 AnimationCounter 컴포넌트

`AnimationCounter` 컴포넌트가 리렌더링될 때 불필요한 reconcilaation이 발생하지 않도록 state를 카원터 컴포넌트 내에서 관리하였고, 비즈니스 로직은 `useAnimationCount` 훅으로 분리했습니다.

```ts
// AnimationCounter.tsx
const [count, requestAnimation] = useAnimationCount(0, end, milliSec)

useEffect(() => {
  if (shouldRequestAnimation) {
    requestAnimation()
  }
}, [shouldRequestAnimation, requestAnimation])
```

숫자의 자릿수가 바뀔 때 자연스럽게 보여질 수 있도록 공간만을 확보하는 skeleton을 추가했습니다.

```js
// js
<StyledCounter>
  <span className="skeleton">
    {Array(Math.max(start.toString().length, end.toString().length))
      .fill(0)
      .join('')}
  </span>
  <span className="value">{count}</span>
</StyledCounter>
```

```css
position: relative;

.skeleton {
  visibility: hidden;
}

.value {
  right: 0;
  position: absolute;
}
```

## 1.2 useAnimationCount 훅

최대 fps를 60으로 설정하였고 ease-in 효과를 주기 위해 타원방정식을 이용해 fps(y축)를 progress(x축)에 따라 감소시켰습니다.
처음에는 최소 fps를 0으로 설정해 함수를 적용시켰었는데요. 끝부분에서 애니메이션 처리가 매끄럽지 못 해 fps 최소값을 5로 보정했습니다.

```ts
const draw = useCallback(
  (timestamp: number, prevTimeStamp: number) => {
    // 첫 프레임일 때
    if (!startAtRef.current) {
      startAtRef.current = timestamp
    }

    // x축:t , y축:progress
    const spf = 1 / fps.current
    const startAt = startAtRef.current

    const t = timestamp - startAt
    const progress = t / milliSec

    // 타원에서 y축 offset 4
    fps.current =
      Math.abs(MAX_FPX * (Math.sqrt(1 - (progress - 1) ** 2) - 1)) + 5

    if ((timestamp - prevTimeStamp) / 1000 < spf) {
      requestAnimationFrame((timestamp) => draw(timestamp, prevTimeStamp))
      return
    }

    if (t < milliSec) {
      setCount(Math.floor(progress * (end - start) + start))

      const currentTimeStamp = timestamp
      requestAnimationFrame((timestamp) => draw(timestamp, currentTimeStamp))
    } else {
      setCount(end)
    }
  },
  [start, end, milliSec],
)
```

# 2. AwardSection 떠오르는 애니메이션 구현

## 2.1 transition 애니메이션 적용

transition을 사용해 떠오르는 애니메이션을 구현하였고, transition-delay를 이용해 100ms, 200ms 간격을 두었습니다.

```js
const StyledAwardHeroImage = styled.div`
  transition: opacity 700ms ease-in, transform 700ms ease-in;
  ${({ inView }) =>
    inView
      ? `opacity: 1; transform: translateY(0px);`
      : `opacity: 0; transform: translateY(10px);`}
`

const StyledAwardReasonse = styled.div`
...
transition-delay: 100ms
`

const StyledAwardBadges = styled.div`
...
transition-delay: 200ms
`
```

## 2.2 IntersectionObserver를 통해 section이 보일 때 애니메이션 요청

IntersectionObserver를 적용해 AwardSection이 노출될 때, Counter 애니메이션과 떠오르는 애니메이션을 적용해봤습니다.
관련 비즈니스 로직은 `useIntersectionObserver` 훅으로 분리했습니다.

## 3. 환경설정

웹팩을 공식문서를 참고해 작업했습니다.

webpack 절대 경로 설정 후 eslint가 import 구문을 해석하지 못 하는 에러에서 오랜 시간을 헤맸었는데요. 아래 링크를 통해 해결하였습니다.
// https://github.com/import-js/eslint-plugin-import/issues/1306
