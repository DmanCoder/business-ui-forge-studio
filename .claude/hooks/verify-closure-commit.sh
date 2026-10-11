#!/usr/bin/env bash
# Proves a closure commit is administrative-only, per AGENTS.md § Closure.
# Usage: verify-closure-commit.sh <sha>      Exit 0 = valid closure diff.
# Positive grammar (fails closed): resolvable single-parent non-empty
# commit; every path under docs/plans/ or docs/reviews/; no rename, copy,
# report deletion, or plan addition; exactly one plan modified, its diff
# limited to the Status flip and exactly one well-formed Closed: line
# whose SHA is this commit's parent; exactly one added report, matching
# the filename grammar, named by Closed:, containing an unqualified
# APPROVED verdict (D-0005) — copies are detected via -C
# --find-copies-harder;
# existing-report changes are one-to-one unticked-to-ticked transforms in
# both directions. Coverage is exactly the fixture's case list (D-0002).
set -uo pipefail
sha="${1:?usage: verify-closure-commit.sh <sha>}"
git rev-parse --verify --quiet "${sha}^{commit}" >/dev/null 2>&1 || { echo "INVALID REVISION: $sha"; exit 1; }
fail=0

nparents=$(git rev-list --parents -n1 "$sha" | wc -w)
[ "$nparents" -gt 2 ] && { echo "MERGE COMMIT: closure must have one parent"; fail=1; }
[ "$nparents" -lt 2 ] && { echo "ROOT COMMIT: closure must have a parent"; fail=1; }

ns=$(git show --format= --name-status -C --find-copies-harder "$sha")
[ -z "$ns" ] && { echo "EMPTY COMMIT: closure must contain the transition"; fail=1; }

plans_m=0
while IFS=$'\t' read -r status p1 p2; do
  [ -z "${status:-}" ] && continue
  for path in "$p1" ${p2:+"$p2"}; do
    case "$path" in
      docs/plans/*|docs/reviews/*) : ;;
      *) echo "NON-ADMINISTRATIVE PATH: $status $path"; fail=1 ;;
    esac
  done
  case "$status" in
    R*|C*) echo "RENAME/COPY IN CLOSURE: $status $p1 -> ${p2:-}"; fail=1 ;;
    D*)  case "$p1" in docs/reviews/*) echo "REPORT DELETED: $p1"; fail=1 ;; esac ;;
    A*)  case "$p1" in docs/plans/*) echo "PLAN ADDED IN CLOSURE: $p1"; fail=1 ;; esac ;;
    M*)  case "$p1" in docs/plans/*) plans_m=$((plans_m+1)) ;; esac ;;
  esac
done <<NS
$ns
NS
[ "$plans_m" -ne 1 ] && { echo "EXACTLY ONE PLAN MUST TRANSITION (found $plans_m modified)"; fail=1; }

pdiff=$(git show --format= --unified=0 "$sha" -- docs/plans/)
plan_bad=$(printf '%s\n' "$pdiff" | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' \
  | grep -vE '^-Status: ' | grep -vE '^\+Status: CLOSED' | grep -vE '^\+Closed: ' || true)
[ -n "$plan_bad" ] && { echo "NON-TRANSITION PLAN CHANGE:"; printf '%s\n' "$plan_bad"; fail=1; }
printf '%s\n' "$pdiff" | grep -qE '^\+Status: CLOSED' || { echo "MISSING +Status: CLOSED"; fail=1; }
nclosed=$(printf '%s\n' "$pdiff" | grep -cE '^\+Closed: ' || true)
[ "$nclosed" -ne 1 ] && { echo "EXACTLY ONE +Closed: LINE REQUIRED (found $nclosed)"; fail=1; }
named=$(printf '%s\n' "$pdiff" | grep -E '^\+Closed: ' | head -1 | sed -E 's/^\+Closed: ([^ ]+) at ([^ ]+).*/\1/')
claimed=$(printf '%s\n' "$pdiff" | grep -E '^\+Closed: ' | head -1 | sed -E 's/^\+Closed: ([^ ]+) at ([^ ]+).*/\2/')
printf '%s' "${named:-}" | grep -qE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-.+-review(-[0-9]+)?\.md$' \
  || { echo "MALFORMED Closed: report name '${named:-<none>}'"; fail=1; }
parent=$(git rev-parse "${sha}^" 2>/dev/null || echo NONE)
claimed_full=$(git rev-parse --verify --quiet "${claimed:-BAD}^{commit}" 2>/dev/null || echo BAD)
[ "$claimed_full" = "$parent" ] || { echo "Closed: SHA '${claimed:-<none>}' IS NOT THE PARENT COMMIT"; fail=1; }

added=$(printf '%s\n' "$ns" | awk -F'\t' '$1 ~ /^A/ && $2 ~ /^docs\/reviews\// {print $2}')
n_added=$(printf '%s' "$added" | grep -c . || true)
[ "$n_added" -ne 1 ] && { echo "EXACTLY ONE APPROVING REPORT MUST BE ADDED (found $n_added)"; fail=1; }
if [ "$n_added" -ge 1 ]; then
  first=$(printf '%s\n' "$added" | head -1); base=$(basename "$first")
  [ "$base" = "${named:-}" ] || { echo "ADDED REPORT '$base' IS NOT THE NAMED APPROVING REPORT '${named:-<none>}'"; fail=1; }
  git show "${sha}:${first}" 2>/dev/null | grep -qiE 'Verdict:[^[:alpha:]]*APPROVED[^[:alpha:]]*$' \
    || { echo "ADDED REPORT LACKS AN APPROVED VERDICT"; fail=1; }
fi

while IFS=$'\t' read -r status p1 p2; do
  case "${status:-}" in M*) : ;; *) continue ;; esac
  case "$p1" in docs/reviews/*) : ;; *) continue ;; esac
  fdiff=$(git show --format= --unified=0 "$sha" -- "$p1")
  add_bad=$(printf '%s\n' "$fdiff" | grep -E '^\+' | grep -vE '^\+\+\+' | grep -vE '^\+[[:space:]]*- \[x\] ' || true)
  [ -n "$add_bad" ] && { echo "NON-TICK ADDITION IN $p1:"; printf '%s\n' "$add_bad"; fail=1; }
  rem_bad=$(printf '%s\n' "$fdiff" | grep -E '^-' | grep -vE '^---' | grep -vE '^-[[:space:]]*- \[ \] ' || true)
  [ -n "$rem_bad" ] && { echo "NON-TICK REMOVAL IN $p1:"; printf '%s\n' "$rem_bad"; fail=1; }
  while IFS= read -r r; do
    [ -z "$r" ] && continue; ok=0
    while IFS= read -r a; do [ -z "$a" ] && continue; case "$a" in "$r"*) ok=1 ;; esac
    done < <(printf '%s\n' "$fdiff" | grep -E '^\+[[:space:]]*- \[x\] ' | sed -E 's/^\+[[:space:]]*- \[x\] //')
    [ "$ok" -ne 1 ] && { echo "UNTICKED ITEM REMOVED WITHOUT A MATCHING TICK IN $p1: - [ ] $r"; fail=1; }
  done < <(printf '%s\n' "$fdiff" | grep -E '^-[[:space:]]*- \[ \] ' | sed -E 's/^-[[:space:]]*- \[ \] //')
  while IFS= read -r a; do
    [ -z "$a" ] && continue; ok=0
    while IFS= read -r r; do [ -z "$r" ] && continue; case "$a" in "$r"*) ok=1 ;; esac
    done < <(printf '%s\n' "$fdiff" | grep -E '^-[[:space:]]*- \[ \] ' | sed -E 's/^-[[:space:]]*- \[ \] //')
    [ "$ok" -ne 1 ] && { echo "TICK ADDED WITHOUT A REMOVED OPEN ITEM IN $p1: - [x] $a"; fail=1; }
  done < <(printf '%s\n' "$fdiff" | grep -E '^\+[[:space:]]*- \[x\] ' | sed -E 's/^\+[[:space:]]*- \[x\] //')
done <<NS2
$ns
NS2

[ "$fail" -eq 0 ] && echo "CLOSURE COMMIT VALID: administrative-only"
exit "$fail"
