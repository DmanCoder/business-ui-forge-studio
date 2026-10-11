---
paths:
  - 'src/**/*.{ts,tsx}'
---

# File and Folder Naming

Routes live in `src/app/`. Feature code is colocated under
`src/features/<domain>/`.

Folders outside `src/app/` use `camelCase`. Never `PascalCase`, never
`kebab-case`.

Inside `src/app/`, Expo Router maps files and folders to URL segments, so
`kebab-case` is correct there and only there.

```txt
src/app/active-workout.tsx        -> /active-workout
src/app/workouts/[id].tsx         -> /workouts/:id
src/app/(tabs)/index.tsx          -> route group
```

## Folders

```txt
Good                                    Avoid
src/features/sessions/sessionDetails/   src/features/sessions/SessionDetails/
src/components/bottomSheet/             src/components/bottom-sheet/
src/features/workouts/workoutSession/   src/features/workouts/WorkoutSession/
```

## Files

| Kind | Convention | Example |
|---|---|---|
| Component / screen | `PascalCase.tsx` | `BottomSheet.tsx` |
| Hook | `useCamelCase.ts` | `useUnitFormatter.ts` |
| Utility | `camelCase.ts` | `formatDate.ts` |
| Types tied to a component | `PascalCase.types.ts` | `BottomSheet.types.ts` |
| Types not tied to a component | `types.ts` | `src/features/workouts/types.ts` |
| Constants | `constants.ts` | `src/features/workouts/constants.ts` |
| Test | matches subject + `.test.ts(x)` | `formatDate.test.ts` |
| Generated types | `<source>.types.ts` | `src/database/database.types.ts` |

## Generated types

Tool-generated type files take the `.types.ts` suffix even though they are not
tied to a component, and even where a plain `types.ts` sits beside them. The
suffix names the source, so it stays obvious which file is hand-written and
which is overwritten by a command:

```txt
src/database/types.ts            hand-written — edit freely
src/database/database.types.ts   `npm run db:types` — regenerated, never edited
```

Do not hand-edit a generated file; change the schema and regenerate. Each one
must also be listed in `.prettierignore` and in the `ignores` block of
`eslint.config.js` — otherwise every regeneration produces formatting churn
unrelated to the schema change under review, and lint rules fire on code no one
wrote. (An empty Supabase schema emits `{}`, which trips
`@typescript-eslint/no-empty-object-type`.)

A `PascalCase` file inside a `camelCase` folder is correct and expected:

```txt
src/features/sessions/sessionDetails/SessionDetails.tsx
src/features/sessions/sessionDetails/SessionDetails.types.ts
src/features/sessions/sessionDetails/useSessionDetails.ts
```

## Renaming on macOS — read this before renaming anything

The filesystem here is case-insensitive. `git mv WorkoutSession workoutSession`
silently does nothing and git records no rename. The change looks done locally
and breaks on Linux and in CI.

Always rename through a temporary name:

```bash
git mv WorkoutSession tmpWorkoutSession
git mv tmpWorkoutSession workoutSession
```

Then confirm git actually saw it:

```bash
git status --short   # expect an R (rename) entry, not nothing
```

After any rename, update every import that referenced the old path and run
`npx tsc --noEmit`. Do not introduce an `index.ts` to avoid updating imports —
see `no-barrel-exports.md`.

## Enforcement

Most of this is lintable. Add `eslint-plugin-check-file` and configure:

```js
{
  files: ['src/**/*.{ts,tsx}'],
  plugins: { 'check-file': checkFile },
  rules: {
    'check-file/folder-naming-convention': ['error', {
      'src/!(app)/**/': 'CAMEL_CASE',
    }],
    'check-file/filename-naming-convention': ['error', {
      'src/**/use*.ts': 'CAMEL_CASE',
      'src/**/*.tsx': 'PASCAL_CASE',
    }, { ignoreMiddleExtensions: true }],
  },
}
```

`ignoreMiddleExtensions` is what lets `BottomSheet.types.ts` pass. Verify the
`src/!(app)/**/` glob actually excludes route folders before trusting it — a
wrong glob here fails silently by matching nothing.
