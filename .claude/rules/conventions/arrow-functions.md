---
paths:
  - '**/*.{ts,tsx,js,jsx}'
---

# Arrow Functions

Use arrow functions for components, hooks, utilities, handlers, and callbacks.
Named const + default export at the bottom of single-purpose files — this keeps
React Fast Refresh working and gives components a display name.

```tsx
const ActiveWorkoutScreen = () => {
  /* ... */
};

export default ActiveWorkoutScreen;
```

## Enforcement

Three ESLint rules cover this, because no single one does:

- `func-style` (`expression`) — plain and named-export function declarations.
  It **cannot** see `export default function`: the rule skips declarations
  whose parent is an `ExportDefaultDeclaration`, unconditionally and with no
  option to re-enable it.
- `no-restricted-syntax` — covers that gap, via the selector
  `ExportDefaultDeclaration > FunctionDeclaration[generator=false]`. That is
  the form this codebase actually uses, so it is the rule doing the real work.
- `prefer-arrow-callback` — function expressions passed as callbacks.

The `[generator=false]` filter is deliberate; see below.

## Use `function` for these — do not convert

- Generators (`function*`) — no arrow equivalent, and exempt from the selector.
- Anything needing dynamic `this` (object methods, some library callbacks).
- TS overload signatures.
- Hoisting is required (called before its definition in the file).

In `.tsx`, generic arrows need the trailing comma: `const f = <T,>(x: T) => x`.

## Refactoring

Do not convert existing `function` declarations unless asked. Converting a
hoisted declaration to a `const` can introduce a TDZ error.
