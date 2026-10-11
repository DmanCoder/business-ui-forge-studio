---
paths:
  - 'src/**/*.{ts,tsx}'
---

# No Barrel Exports

Import directly from the file that defines the thing. Do not create `index.ts`
files whose only job is to re-export from neighbouring files.

```ts
// Good
import WorkoutTable from '@features/sessions/components/WorkoutTable';
import { useSprintTable } from '@features/sessions/shared/hooks/useSprintTable';
import ExerciseHeader from '@features/exercises/components/ExerciseHeader';
import { useUnitFormatter } from '@hooks/useUnitFormatter';
import { formatDate } from '@utils/formatDate';

// Avoid
import { useSprintTable } from '@features/sessions/shared/hooks';
import { useUnitFormatter } from '@hooks';
import WorkoutTable from '@features/sessions/components';
```

This applies at every depth, including a feature's root. There is no
"public API" barrel — see the note at the bottom of this file for why.

## Why

- Metro does not tree-shake by default. One import through a barrel pulls the
  whole re-exported surface into the bundle, at startup.
- Barrel-to-barrel imports create circular dependencies that are slow to
  diagnose.
- Direct paths make the definition site obvious and refactors traceable.

## Path aliases are prefixes, not modules

Every alias in `tsconfig.json` ends in `/*` and resolves to a file:

```ts
import { formatDate } from '@utils/formatDate';   // resolves to a file
import { formatDate } from '@utils';              // would need a barrel
```

A bare `@utils` import only works if `src/utils/index.ts` exists, so treating
an alias as though it were a module is the most likely way this rule gets
broken. If an import looks like it should work and doesn't, the fix is to name
the file — never to add an `index.ts`.

An alias must also not reuse an npm scope. TypeScript checks `paths` before
`node_modules`, so `"@supabase/*": ["./supabase/*"]` silently intercepts
`@supabase/supabase-js` the moment that package is installed — the import
resolves to the local folder, and nothing in the resulting error points at the
alias as the cause.

## Allowed `index` files

Only these. Everything else is a barrel.

**Expo Router route files.** `index.tsx` under `src/app/` is a route, not a
barrel:

```txt
src/app/(tabs)/index.tsx
src/app/add-exercise/index.tsx
```

**Tooling requirements.** If a library or generated code needs an `index.ts` to
function, keep it and add a one-line comment saying which tool requires it.

## When creating or moving files

Do not add an `index.ts`. Do not "clean up" imports by introducing one. If a
path feels long, that is a signal the module is nested too deep — fix the
structure, not the import.

## Enforcement

ESLint lints file contents, not file existence, so this is a script. Wire it
into the husky pre-commit hook:

```bash
#!/usr/bin/env bash
# scripts/check-barrels.sh
found=$(git ls-files 'src/**/index.ts')
if [ -n "$found" ]; then
  echo "Barrel files are not allowed:"
  echo "$found"
  echo "Import directly from the defining file instead."
  exit 1
fi
exit 0
```

Note this checks `index.ts` only — `index.tsx` under `src/app/` is left alone,
which covers the Expo Router case without needing an exclusion list.

## Note: no front-door barrels

An earlier version of this rule allowed one public-API `index.ts` per feature.
That is deliberately gone. Without tree-shaking it reintroduces the bundle cost
listed above, and "external consumers use the front door, internal and
cross-feature imports go direct" left no consumer that could actually use it.

If you reinstate it, pick one answer to "can one feature import another's front
door?" and write it down — allowing it means barrels importing barrels, which
is the cycle case.
