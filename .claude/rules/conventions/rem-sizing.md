---
paths:
  - 'src/**/*.{ts,tsx,js,jsx,css}'
  - 'tailwind.config.{js,cjs,ts}'
  - 'metro.config.{js,cjs}'
---

# REM-Based UI Sizing

10-unit rem baseline: `1rem` = 10px on web, 10 layout units on iOS and Android.
Convert design pixels with `rem = px / 10` — 16px is `1.6rem`, 24px is `2.4rem`.

Two pieces of configuration establish it. Both must stay in place:

```css
/* src/global.css */
:root {
  font-size: 62.5%; /* 1rem = 10px, respects user font-size preference */
}
```

```js
// metro.config.js
inlineRem: 10
```

## Prefer standard utilities

`tailwind.config.js` restates every rem-denominated scale for this baseline, so
standard utilities already carry their conventional pixel values. Spacing steps
are `n x 0.4rem`; font sizes keep their usual names and ship paired line
heights.

```text
p-1  = 0.4rem (4)    p-4 = 1.6rem (16)    text-sm    = 1.4rem (14)
p-2  = 0.8rem (8)    p-6 = 2.4rem (24)    text-base  = 1.6rem (16)
p-3  = 1.2rem (12)   p-8 = 3.2rem (32)    rounded-lg = 0.8rem (8)
```

So write this:

```tsx
<View className="min-h-12 gap-2 rounded-xl p-4">
  <Text className="text-base">Session details</Text>
</View>
```

rather than spelling the same measurements out by hand:

```tsx
<View className="min-h-[4.8rem] gap-[0.8rem] rounded-[1.2rem] p-[1.6rem]">
  <Text className="text-[1.6rem] leading-[2.4rem]">Session details</Text>
</View>
```

Both render identically. The first says what it means and survives a change to
the scale; the second does not.

## Arbitrary values are the escape hatch

Reach for `[...]` only when a measurement is genuinely off-scale — a design
value that no step lands on:

```tsx
<View className="p-[1.8rem]" />
```

Never arbitrary pixels. They ignore the baseline and drift on native:

```tsx
<View className="p-[18px]" />
```

If an off-scale value shows up repeatedly, add it to the theme instead.

## Scales that are deliberately not rem

These are correct as they are. Do not "fix" them.

| Scale | Why it stays |
| --- | --- |
| `letterSpacing` | `em` — scales with the element's own font-size, not the root. Converting to rem would stop tracking from following its text. |
| `minWidth` named keys | `100%`, `min-content`, `max-content`, `fit-content` — no length denomination. |
| `screens` | px breakpoints. Absolute by design; viewport queries must not move with the root font-size. |
| `ringWidth`, `ringOffsetWidth`, `outlineWidth`, `outlineOffset`, `strokeWidth`, `textDecorationThickness`, `textUnderlineOffset` | px or unitless. Absolute, so the baseline does not reach them. |
| `borderRadius.none` / `.full`, `spacing.px` | `0px`, `9999px`, `1px` — sentinels, not scale values. |

## React Native restrictions

Do not put rem strings in React Native style objects. Use a class instead:

```tsx
// Wrong on native
<View style={{ padding: '1.6rem' }} />
```

```tsx
<View className="p-4" />
```

React Native APIs and third-party props that require numbers must keep
receiving numbers.

## Permitted exceptions

Numeric or unitless values are correct when the API requires them:

- `flex`, `flexGrow`, `flexShrink`, `opacity`, `zIndex`, `aspectRatio`
- transform scale values, animation progress, timing in milliseconds
- `shadowOffset`, `shadowRadius`, `elevation`
- `letterSpacing` on native
- `hitSlop`
- Reanimated shared values and anything returned from `useAnimatedStyle`
- `StyleSheet.hairlineWidth`
- SVG coordinates and `viewBox`
- dimensions returned by React Native or another API
- percentages, IDs, indexes, counts, and ratios

The `62.5%` declaration in `src/global.css` defines the baseline itself — leave
it alone.

Do not convert non-layout numbers into rem.

## Before finishing UI work

1. No new `px` values in project-authored styles, and no rem strings in React
   Native style objects.
2. Each retained bare number is one an API actually requires.
3. Standard utilities used where one fits; `[...]` only for off-scale values.
