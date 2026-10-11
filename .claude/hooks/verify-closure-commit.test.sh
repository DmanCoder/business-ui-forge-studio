#!/usr/bin/env bash
# Fixture for verify-closure-commit.sh: one valid closure and every
# violating shape from reviews 3–5, plus invalid-revision. Exit 0 = pass.
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
V="$HERE/verify-closure-commit.sh"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
cd "$T" && git init -qb main . && git config user.email t@t && git config user.name t
mkdir -p docs/plans docs/reviews src
printf 'Status: ACTIVE\n' > docs/plans/unit-1.md
printf '# Report\n- [ ] **F1:** fix the thing.\n' > docs/reviews/2026-01-01-x-review.md
printf 'code\n' > src/app.js
git add -A && git commit -qm base; BASE=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-01-x-review-2.md at %s\n' "$BASE" > docs/plans/unit-1.md
printf '# Report\n- [x] **F1:** fix the thing. — resolved: evidence.\n' > docs/reviews/2026-01-01-x-review.md
printf '# Approval\n- **Verdict:** **APPROVED**\n' > docs/reviews/2026-01-01-x-review-2.md
git add -A && git commit -qm closure; GOOD=$(git rev-parse HEAD)
printf 'more\n' >> src/app.js; printf 'x\n' >> docs/plans/unit-1.md
git add -A && git commit -qm bad1; BAD1=$(git rev-parse HEAD)
printf '# Report\n- [x] **F1:** different finding. — resolved: evidence.\n' > docs/reviews/2026-01-01-x-review.md
git rm -q docs/reviews/2026-01-01-x-review-2.md
git add -A && git commit -qm bad2; BAD2=$(git rev-parse HEAD)
printf '# R2\n- [ ] **F2:** open item.\n' > docs/reviews/2026-01-02-y-review.md
git add -A && git commit -qm setup2
printf '# R2\n' > docs/reviews/2026-01-02-y-review.md
git add -A && git commit -qm bad3; BAD3=$(git rev-parse HEAD)
printf 'Status: CLOSED\ntotally: rewritten body\n' > docs/plans/unit-1.md
git add -A && git commit -qm bad4; BAD4=$(git rev-parse HEAD)
printf '# R2\nextra analysis paragraph\n' > docs/reviews/2026-01-02-y-review.md
git add -A && git commit -qm bad5; BAD5=$(git rev-parse HEAD)
git mv docs/plans/unit-1.md src/moved.md && git commit -qm bad6; BAD6=$(git rev-parse HEAD)
git mv src/moved.md docs/plans/unit-1.md && git commit -qm restoreplan
git commit -q --allow-empty -m empty; EMPTY=$(git rev-parse HEAD)
P=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-05-a-review.md at %s\n' "$P" > docs/plans/unit-1.md
git add -A && git commit -qm noreport; NOREP=$(git rev-parse HEAD)
P=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-06-b-review.md at %s\n' "$P" > docs/plans/unit-1.md
printf '# Old copy\nno verdict here\n' > docs/reviews/2026-01-06-b-review.md
git add -A && git commit -qm nonapproving; NONAPP=$(git rev-parse HEAD)
printf '# Report\n- [x] **F1:** different finding. — resolved: evidence.\n- [x] **FAKE:** invented obligation satisfied.\n' > docs/reviews/2026-01-01-x-review.md
git add -A && git commit -qm faketick; FAKE=$(git rev-parse HEAD)
git checkout -qb side "$BASE" && printf 'side\n' > side.txt && git add -A && git commit -qm side
git checkout -q main && git merge -q --no-ff -m mergecommit side; MERGE=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-07-c-review.md at %s\n' "$BASE" > docs/plans/unit-1.md
printf '# A\n- **Verdict:** **APPROVED**\n' > docs/reviews/2026-01-07-c-review.md
git add -A && git commit -qm wrongsha; WRONG=$(git rev-parse HEAD)
P=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-08-d-review.md at %s\n' "$P" > docs/plans/unit-1.md
cp docs/reviews/2026-01-07-c-review.md docs/reviews/2026-01-08-d-review.md
git add -A && git commit -qm copiedapproval; COPYA=$(git rev-parse HEAD)
P=$(git rev-parse HEAD)
printf 'Status: CLOSED\nClosed: 2026-01-09-e-review.md at %s\n' "$P" > docs/plans/unit-1.md
printf '# A\n- **Verdict:** **APPROVED WITH CHANGES**\n' > docs/reviews/2026-01-09-e-review.md
git add -A && git commit -qm withchanges; WITHCH=$(git rev-parse HEAD)
fail=0
check(){ local want=$1 sha=$2 label=$3 got
  if "$V" "$sha" >/dev/null 2>&1; then got=0; else got=1; fi
  if [ "$got" -eq "$want" ]; then echo "PASS: $label"; else echo "FAIL: $label"; fail=1; fi; }
check 0 "$GOOD"   "valid closure (parent SHA + approved report) accepted"
check 1 "$BAD1"   "closure touching source rejected"
check 1 "$BAD2"   "finding rewrite + report deletion rejected"
check 1 "$BAD3"   "open-item deletion without matching tick rejected"
check 1 "$BAD4"   "arbitrary plan rewrite rejected"
check 1 "$BAD5"   "arbitrary existing-report addition rejected"
check 1 "$BAD6"   "rename out of administrative dirs rejected"
check 1 "$EMPTY"  "empty commit rejected"
check 1 "$NOREP"  "plan transition without approval report rejected"
check 1 "$NONAPP" "non-approving report rejected"
check 1 "$FAKE"   "added tick without removed open item rejected"
check 1 "$MERGE"  "merge commit rejected"
check 1 "$WRONG"  "Closed: SHA not the parent rejected"
check 1 "$COPYA"  "copied approving report rejected"
check 1 "$WITHCH" "APPROVED WITH CHANGES rejected"
check 1 "definitely-not-a-commit" "invalid revision fails closed"
[ "$fail" -eq 0 ] && echo "ALL CASES PASS"
exit "$fail"
