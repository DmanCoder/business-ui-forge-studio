---
paths:
  - 'src/**/*.{ts,tsx}'
---

# Frontend Null Safety

Let the types decide. Add `?.` where the type says a value can be `null` or
`undefined`. Do not add it anywhere else.

TypeScript already knows which values are nullable. Optional chaining applied
past that point is not defensive — it converts a loud crash with a stack trace
into a blank screen with no signal, and hides the bug you needed to see.

```ts
// Good — params are genuinely string | string[] | undefined
const { id } = useLocalSearchParams<{ id?: string }>();
const workoutId = Array.isArray(id) ? id[0] : id;
if (!workoutId) return <NotFound />;

// Avoid — session is non-nullable here, so ?. hides a real failure
const name = session?.user?.name;
```

## Validate at the boundary, then trust the types

The fix for untrusted data is to parse it once where it enters, not to chain at
every call site downstream.

```ts
const WorkoutSchema = z.object({
  id: z.string(),
  sets: z.array(SetSchema),
});

const { data, error } = await supabase.from('workouts').select();
if (error) return handleError(error);
const workouts = WorkoutSchema.array().parse(data);
// everything downstream is typed and non-nullable — no ?. needed
```

## Where nullability actually comes from

These are the real sources in this app. Handle them explicitly at the point of
entry:

- **`useLocalSearchParams()`** — always `string | string[] | undefined`. The
  array case is the one that gets forgotten.
- **Supabase `{ data, error }`** — `data` is `null` whenever `error` is set.
  Check `error` first; never chain into `data` as a substitute.
- **AsyncStorage reads** — `null` when the key is absent, and the parsed shape
  is unverified.
- **`useState<T>()` with no initial value** — nullable until first set.
- **Optional props and route params** — nullable by declaration.

## Rendering

Prefer an explicit empty or loading state over a chain that renders nothing:

```tsx
// Good
if (!accessories) return <Skeleton />;
if (accessories.length === 0) return <EmptyState />;
return accessories.map(renderAccessory);

// Avoid — indistinguishable from "loaded and empty"
return (accessories ?? []).map(renderAccessory);
```

## Do not

- Add `?.` to silence a type error. Fix the type or handle the case.
- Use `!` non-null assertions. If you know it exists, narrow it so the compiler
  knows too.
- Change existing behaviour while adding null handling.

## Enforcement

Both directions are checkable:

```jsonc
// tsconfig.json — catches missing handling
{ "compilerOptions": { "strict": true } }
```

```js
// eslint.config.js — catches unnecessary ?. on non-nullable values
// requires parserOptions.projectService for type information
'@typescript-eslint/no-unnecessary-condition': 'error',
'@typescript-eslint/no-non-null-assertion': 'error',
```

`no-unnecessary-condition` is the one that matters here: it flags every `?.`
applied to something that cannot be nullish, which is exactly the failure mode
this rule exists to prevent.
