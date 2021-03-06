# triple-homework

[π κΉνλΈ νμ΄μ§ λ°°ν¬ λ§ν¬ Click! ](https://changhyun2.github.io/triple-homework/)

### μ€ν λ°©λ²

```
nvm use v16.13.1

yarn install
yarn start
```

### μ¬μ© κΈ°μ 

κ³Όμ  κ΅¬νμ νμν κΈ°μ μ νλ¨ κ΅¬ν μ€λͺμ μμΈν μμ±νμμ΅λλ€.

- webpack : κ³Όμ μ κ·λͺ¨μ μ ν©νλ€κ³  μκ°νμ΅λλ€.
- husky, lint-staged : triple-eslint-configμ κ·μΉμ νμ©
- git actions : gh-pagesλ‘ λ°°ν¬
- window.requestAnimationFrame API : μ«μ μΉ΄μ΄ν° UIμμ λΆλλ¬μ΄ μ λλ©μ΄μ κ΅¬ν
- css transition : μΉμμ΄ λ μ€λ₯΄λ μ λλ©μ΄μ
- csd : λ²κ±°λ‘μ΄ μ€νμΌλ§ μ½λλ₯Ό μ΅μννκΈ° μν΄ λ°°ν¬ν΄λμλ λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©νμ΅λλ€.

# ν΄λ κ΅¬μ‘°

```
βΒ Β  βββ App.tsx
βΒ Β  βββ components (κ³΅ν΅ μ»΄ν¬λνΈ)
βΒ Β  βΒ Β  βββ AnimationCounter
βΒ Β  βΒ Β  βΒ Β  βββ index.styled.tsx
βΒ Β  βΒ Β  βΒ Β  βββ index.tsx
βΒ Β  βΒ Β  βββ Image
βΒ Β  βΒ Β      βββ index.styled.tsx
βΒ Β  βΒ Β      βββ index.tsx
βΒ Β  βββ custom.d.ts
βΒ Β  βββ hooks
βΒ Β  βΒ Β  βββ useAnimationCount.tsx
βΒ Β  βΒ Β  βββ useIntersectionObserver.tsx
βΒ Β  βββ index.css
βΒ Β  βββ index.tsx
βΒ Β  βββ pages
βΒ Β  βΒ Β  βββ HomePage
βΒ Β  βΒ Β      βββ AwardSeciton.styled.tsx
βΒ Β  βΒ Β      βββ AwardSection.tsx
βΒ Β  βΒ Β      βββ InstallSection.tsx
βΒ Β  βΒ Β      βββ ReservationSection.tsx
βΒ Β  βΒ Β      βββ index.styled.tsx
βΒ Β  βΒ Β      βββ index.tsx
βΒ Β  βββ public
βΒ Β  βΒ Β  βββ assets
βΒ Β  βΒ Β  βΒ Β  βββ badge-apple4x.png
βΒ Β  βΒ Β  βΒ Β  βββ play-store2x.png
βΒ Β  βΒ Β  βΒ Β  βββ triple2x.png
βΒ Β  βΒ Β  βββ index.html
βΒ Β  βββ utils
βΒ Β      βββ keyframes.ts
```

# κ΅¬ν

## 1. μ λλ©μ΄μ μΉ΄μ΄ν° μ»΄ν¬λνΈ κ΅¬ν

μ¬λ¬ js μ½λκ° μ€νλ  μ μλ€λ κ²μ κ°μ νκ³ , λΆλλ¬μ΄ μ λλ©μ΄μμ κ΅¬ννκΈ° μν΄ requestAnimationFrameμ μ¬μ©νμ΅λλ€. setIntervalκ³Όλ λ€λ₯΄κ², λΈλΌμ°μ κ° repaintνλ μμ μλ§ μ½λ°±μ΄ μ€νλ©λλ€.

### 1.1 AnimationCounter μ»΄ν¬λνΈ

`AnimationCounter` μ»΄ν¬λνΈκ° λ¦¬λ λλ§λ  λ λΆνμν reconcilationμ΄ λ°μνμ§ μλλ‘ stateλ₯Ό μΉ΄μν° μ»΄ν¬λνΈ λ΄μμ κ΄λ¦¬νμκ³ , λΉμ¦λμ€ λ‘μ§μ `useAnimationCount` νμΌλ‘ λΆλ¦¬νμ΅λλ€.

```ts
// AnimationCounter.tsx
const [count, requestAnimation] = useAnimationCount(0, end, milliSec)

useEffect(() => {
  if (shouldRequestAnimation) {
    requestAnimation()
  }
}, [shouldRequestAnimation, requestAnimation])
```

μ«μμ μλ¦Ώμκ° λ°λ λ μμ°μ€λ½κ² λ³΄μ¬μ§ μ μλλ‘ μ«μμ κΈΈμ΄κ° μ΅λμΌ λμ κ³΅κ°μ νλ³΄νλ skeletonμ μΆκ°νμ΅λλ€.

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

### 1.2 useAnimationCount ν

μ΅λ fpsλ₯Ό 60μΌλ‘ μ€μ νμκ³  ease-out ν¨κ³Όλ₯Ό μ£ΌκΈ° μν΄ νμλ°©μ μμ μ΄μ©ν΄ fps(yμΆ)λ₯Ό progress(xμΆ)μ λ°λΌ κ°μμμΌ°μ΅λλ€.
μ²μμλ μ΅μ fpsλ₯Ό 0μΌλ‘ μ€μ ν΄ ν¨μλ₯Ό μ μ©μμΌ°μλλ°μ. λλΆλΆμμ μ λλ©μ΄μ μ²λ¦¬κ° λ§€λλ½μ§ λͺ» ν΄ fps μ΅μκ°μ 5λ‘ λ³΄μ νμ΅λλ€.

```ts
const draw = useCallback(
  (timestamp: number, prevTimeStamp: number) => {
    // μ²« νλ μμΌ λ
    if (!startAtRef.current) {
      startAtRef.current = timestamp
    }

    // xμΆ:t , yμΆ:progress
    const spf = 1 / fps.current
    const startAt = startAtRef.current

    const t = timestamp - startAt
    const progress = t / milliSec

    // νμμμ yμΆ offset 4
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

## 2. AwardSection λ μ€λ₯΄λ μ λλ©μ΄μ κ΅¬ν

### 2.1 transition μ λλ©μ΄μ μ μ©

transitionμ μ¬μ©ν΄ λ μ€λ₯΄λ μ λλ©μ΄μμ κ΅¬ννμκ³ , transition-delayλ₯Ό μ΄μ©ν΄ 100ms, 200ms κ°κ²©μ λμμ΅λλ€. μ²μμλ keyfraemsλ₯Ό μ΄μ©ν΄ κ΅¬ννμμ§λ§, DOMμ μμ/λ css μ€νμΌκ³Ό keyframesμ μμ/λ css μ€νμΌ λκΈ°νκ° λΆκ°λ₯ν΄ λ°μνλ κΉλΉ‘μ νμμ΄ μμ΄ transitionμ μ¬μ©νμ΅λλ€.

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

### 2.2 IntersectionObserverλ₯Ό ν΅ν΄ sectionμ΄ λ³΄μΌ λ μ λλ©μ΄μ μμ²­

IntersectionObserverλ₯Ό μ μ©ν΄ AwardSectionμ΄ λΈμΆλ  λ, Counter μ λλ©μ΄μκ³Ό λ μ€λ₯΄λ μ λλ©μ΄μμ΄ μ€νλλλ‘ κ΅¬ννμ΅λλ€.
κ΄λ ¨ λΉμ¦λμ€ λ‘μ§μ `useIntersectionObserver` νμΌλ‘ λΆλ¦¬νμ΅λλ€.
νκ² entryμ init μ΅μμ propμΌλ‘ μ λ¬λ°κ³  observe/unobserveνλ ν¨μλ₯Ό νμ μ¬μ©νλ κ³³μΌλ‘ λκ²¨μ€λλ€.

## 3. νκ²½μ€μ 

μΉν©μ κ³΅μλ¬Έμλ₯Ό μ°Έκ³ ν΄ μμνμ΅λλ€.

### μΉν© μ λ κ²½λ‘ μ€μ  ν λ°μν eslint μ΄μ

webpack μ λ κ²½λ‘ μ€μ  ν eslintκ° import κ΅¬λ¬Έμ ν΄μνμ§ λͺ» νλ μλ¬μμ μ€λ μκ°μ ν€λ§Έμλλ°μ. μλ λ§ν¬λ₯Ό ν΅ν΄ ν΄κ²°νμμ΅λλ€.
// https://github.com/import-js/eslint-plugin-import/issues/1306

### lint-staged μ μ©

`npx mrm lint-staged`λ₯Ό ν΅ν΄ lint-stagedλ₯Ό μΆκ°νμ΅λλ€.
μ²« μ€μΉμμ dev-dependencyμ eslint, prettierκ° μμ΄ λ°μνλ μ΄μκ° μμλλ°μ. μ΄λ₯Ό ν΄κ²°νκΈ° μν΄μ triple-eslint-configμμ μ¬μ©νλ eslint/prettier λ²μ κ³Ό λμΌν λ²μ μ dev-dependencyμ μΆκ°ν ν μ€μΉνμμ΅λλ€.

### git actions

masterλ‘ pushν  κ²½μ° κΉνλΈ νμ΄μ§λ₯Ό λ°°ν¬νλλ‘ μ€μ ν΄λ΄€μ΅λλ€.

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
