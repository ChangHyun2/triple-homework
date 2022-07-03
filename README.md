# triple-homework

[🔗 깃허브 페이지 배포 링크 Click! ](https://changhyun2.github.io/triple-homework/)

### 실행 방법

```
nvm use v16.13.1

yarn install
yarn start
```

### 사용 기술

과제 구현에 필요한 기술은 하단 구현 설명에 상세히 작성하였습니다.

- webpack : 과제의 규모에 적합하다고 생각했습니다.
- husky, lint-staged : triple-eslint-config의 규칙을 활용
- git actions : gh-pages로 배포
- window.requestAnimationFrame API : 숫자 카운터 UI에서 부드러운 애니메이션 구현
- css transition : 섹션이 떠오르는 애니메이션
- csd : 번거로운 스타일링 코드를 최소화하기 위해 배포해두었던 라이브러리를 사용했습니다.

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

# 구현

## 1. 애니메이션 카운터 컴포넌트 구현

여러 js 코드가 실행될 수 있다는 것을 가정하고, 부드러운 애니메이션을 구현하기 위해 requestAnimationFrame을 사용했습니다. setInterval과는 다르게, 브라우저가 repaint하는 시점에만 콜백이 실행됩니다.

### 1.1 AnimationCounter 컴포넌트

`AnimationCounter` 컴포넌트가 리렌더링될 때 불필요한 reconcilation이 발생하지 않도록 state를 카원터 컴포넌트 내에서 관리하였고, 비즈니스 로직은 `useAnimationCount` 훅으로 분리했습니다.

```ts
// AnimationCounter.tsx
const [count, requestAnimation] = useAnimationCount(0, end, milliSec)

useEffect(() => {
  if (shouldRequestAnimation) {
    requestAnimation()
  }
}, [shouldRequestAnimation, requestAnimation])
```

숫자의 자릿수가 바뀔 때 자연스럽게 보여질 수 있도록 숫자의 길이가 최대일 때의 공간을 확보하는 skeleton을 추가했습니다.

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

### 1.2 useAnimationCount 훅

최대 fps를 60으로 설정하였고 ease-out 효과를 주기 위해 타원방정식을 이용해 fps(y축)를 progress(x축)에 따라 감소시켰습니다.
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
      Math.abs(MAX_FPS * (Math.sqrt(1 - (progress - 1) ** 2) - 1)) + 5

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

## 2. AwardSection 떠오르는 애니메이션 구현

### 2.1 transition 애니메이션 적용

transition을 사용해 떠오르는 애니메이션을 구현하였고, transition-delay를 이용해 100ms, 200ms 간격을 두었습니다. 처음에는 keyfraems를 이용해 구현했었지만, DOM의 시작/끝 css 스타일과 keyframes의 시작/끝 css 스타일 동기화가 불가능해 발생하는 깜빡임 현상이 있어 transition을 사용했습니다.

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

### 2.2 IntersectionObserver를 통해 section이 보일 때 애니메이션 요청

IntersectionObserver를 적용해 AwardSection이 노출될 때, Counter 애니메이션과 떠오르는 애니메이션이 실행되도록 구현했습니다.
관련 비즈니스 로직은 `useIntersectionObserver` 훅으로 분리했습니다.
타겟 entry와 init 옵션을 prop으로 전달받고 observe/unobserve하는 함수를 훅을 사용하는 곳으로 넘겨줍니다.

## 3. 환경설정

웹팩을 공식문서를 참고해 작업했습니다.

### 웹팩 절대 경로 설정 후 발생한 eslint 이슈

webpack 절대 경로 설정 후 eslint가 import 구문을 해석하지 못 하는 에러에서 오랜 시간을 헤맸었는데요. 아래 링크를 통해 해결하였습니다.
// https://github.com/import-js/eslint-plugin-import/issues/1306

### lint-staged 적용

`npx mrm lint-staged`를 통해 lint-staged를 추가했습니다.
첫 설치에서 dev-dependency에 eslint, prettier가 없어 발생하는 이슈가 있었는데요. 이를 해결하기 위해서 triple-eslint-config에서 사용하는 eslint/prettier 버전과 동일한 버전을 dev-dependency에 추가한 후 설치하였습니다.

### git actions

master로 push할 경우 깃허브 페이지를 배포하도록 설정해봤습니다.

```yaml
name: deploy
on:
  push:
    branches:
      - master
jobs:
  delpoy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3
        # https://github.com/marketplace/actions/github-action-for-yarn
      - name: Install packages
        uses: borales/actions-yarn@v3.0.0
        with:
          cmd: install
      - name: Build
        uses: borales/actions-yarn@v3.0.0
        with:
          cmd: build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        # https://davidyang2149.dev/front-end/github-actions%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-gh-pages-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0/
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
