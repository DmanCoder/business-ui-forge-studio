#!/usr/bin/env bash
# Fixture for no-env-access.sh. Run: bash .claude/hooks/no-env-access.test.sh
# Exits 0 only when every case behaves. Coverage is exactly this case
# list (D-0002). Referenced by docs/plans/_bootstrap.md scope item 3.
set -u
HOOK="$(dirname "$0")/no-env-access.sh"
fail=0

expect() { # expect <block|allow> <label> <payload-json>
  local want="$1" label="$2" json="$3" rc got
  printf '%s' "$json" | bash "$HOOK" >/dev/null 2>&1
  rc=$?
  if [ "$rc" -eq 2 ]; then got=block; elif [ "$rc" -eq 0 ]; then got=allow; else got="exit-$rc"; fi
  if [ "$got" = "$want" ]; then
    echo "PASS ($want): $label"
  else
    echo "FAIL (want $want, got $got): $label"
    fail=1
  fi
}

j_bash() { jq -cn --arg c "$1" '{tool_name:"Bash",tool_input:{command:$c}}'; }
j_file() { jq -cn --arg t "$1" --arg p "$2" '{tool_name:$t,tool_input:{file_path:$p}}'; }
j_grep() { jq -cn --arg p "$1" '{tool_name:"Grep",tool_input:{pattern:".",path:$p}}'; }

# Env duty
expect block "Bash: cat .env"                                     "$(j_bash 'cat .env')"
expect block "Bash: cat .env.example .env (old allowlist bypass)" "$(j_bash 'cat .env.example .env')"
expect block "Bash: interpreter one-liner"                        "$(j_bash "node -e \"fs.readFileSync('.env','utf8')\"")"
expect block "Bash: redirection read"                             "$(j_bash 'while read l; do echo $l; done < .env')"
expect block "Bash: copy-then-read staging"                       "$(j_bash 'cp .env /tmp/x && cat /tmp/x')"
expect block "Bash: nested dot-env path"                          "$(j_bash 'git checkout src/app/.env.production')"
expect allow "Bash: template read"                                "$(j_bash 'cat env.example')"
expect allow "Bash: ordinary command"                             "$(j_bash 'npm run build')"
expect allow "Bash: config.env is not a dot-env file"             "$(j_bash 'echo config.env')"
expect allow "Bash: .envrc is out of scope by design"             "$(j_bash 'cat .envrc')"
expect block "Read: .env"                                         "$(j_file Read /repo/.env)"
expect block "Edit: .env.local"                                   "$(j_file Edit .env.local)"
expect block "Write: nested .env.production"                      "$(j_file Write src/.env.production)"
expect block "Read: dotted .env.example (renames stay blocked)"   "$(j_file Read .env.example)"
expect allow "Read: env.example"                                  "$(j_file Read env.example)"
expect block "Grep: path .env"                                    "$(j_grep .env)"
expect allow "Grep: ordinary directory"                           "$(j_grep src)"

# Owner-only directories — writes/mutations block
expect block "Bash: redirect into acceptance"     "$(j_bash 'echo signed >> docs/acceptance/run.md')"
expect block "Bash: tee into reviews"             "$(j_bash 'echo x | tee docs/reviews/new-report.md')"
expect block "Bash: sed -i into decisions"        "$(j_bash 'sed -i s/a/b/ docs/decisions/workflow.md')"
expect block "Bash: perl -pi into reviews"        "$(j_bash 'perl -pi -e s/a/b/ docs/reviews/r.md')"
expect block "Bash: perl -i.bak into decisions"   "$(j_bash 'perl -i.bak -pe s/a/b/ docs/decisions/workflow.md')"
expect block "Bash: rsync into reviews"           "$(j_bash 'rsync -a build/ docs/reviews/')"
expect block "Bash: cp into decisions"            "$(j_bash 'cp draft.md docs/decisions/workflow.md')"
expect block "Bash: mv into reviews"              "$(j_bash 'mv /tmp/x.md docs/reviews/x.md')"
expect block "Bash: mv out of reviews (deletes)"  "$(j_bash 'mv docs/reviews/x.md /tmp/')"
expect block "Bash: rm a report"                  "$(j_bash 'rm docs/reviews/old-report.md')"
expect block "Bash: touch into acceptance"        "$(j_bash 'touch docs/acceptance/placeholder.md')"
expect block "Bash: dd of= into reviews"          "$(j_bash 'dd if=/tmp/x of=docs/reviews/r.md')"
expect block "Bash: patch into decisions"         "$(j_bash 'patch docs/decisions/workflow.md < fix.patch')"
expect block "Bash: awk -i inplace into decisions" "$(j_bash 'awk -i inplace {print} docs/decisions/workflow.md')"
expect block "Bash: noclobber >| into reviews"     "$(j_bash 'echo x >| docs/reviews/r.md')"
expect block "Bash: redirect into ./-prefixed reviews"  "$(j_bash 'echo x > ./docs/reviews/r.md')"
expect block "Bash: redirect into absolute reviews"     "$(j_bash 'echo x > /Users/dev/proj/docs/reviews/r.md')"
expect block "Bash: redirect into quoted reviews"       "$(j_bash 'echo x > \"docs/reviews/r.md\"')"
expect block "Bash: cp into ./-prefixed reviews"        "$(j_bash 'cp draft.md ./docs/reviews/r.md')"
expect block "Bash: cp into absolute reviews"           "$(j_bash 'cp draft.md /Users/dev/proj/docs/reviews/r.md')"
expect block "Bash: rsync into ./-prefixed reviews"     "$(j_bash 'rsync -a build/ ./docs/reviews/')"
expect block "Bash: rsync dest then trailing option"    "$(j_bash 'rsync -a build/ docs/reviews/ --delete')"
expect block "Bash: cp --target-directory (space)"      "$(j_bash 'cp --target-directory docs/reviews draft.md')"
expect block "Bash: cp --target-directory= (equals)"    "$(j_bash 'cp --target-directory=docs/reviews draft.md')"
expect block "Bash: git restore a report"               "$(j_bash 'git restore docs/reviews/r.md')"
expect block "Bash: git checkout -- a report"           "$(j_bash 'git checkout -- docs/reviews/r.md')"
expect block "Bash: git apply --include= a report"      "$(j_bash 'git apply --include=docs/reviews/r.md fix.patch')"
expect block "Bash: git rm a report"                    "$(j_bash 'git rm docs/reviews/old-report.md')"
expect block "Bash: git mv a report"                    "$(j_bash 'git mv docs/reviews/a.md docs/reviews/b.md')"
expect block "Bash: git -C . restore a report"          "$(j_bash 'git -C . restore docs/reviews/r.md')"
expect block "Bash: git --no-pager checkout a report"   "$(j_bash 'git --no-pager checkout -- docs/reviews/r.md')"
expect block "Bash: git clean inside reviews"           "$(j_bash 'git clean -fd docs/reviews/')"
expect block "Bash: git stash push a report"            "$(j_bash 'git stash push -- docs/reviews/r.md')"
expect block "Bash: find -delete inside reviews"        "$(j_bash 'find docs/reviews -type f -delete')"
expect block "Bash: python literal-path write"          "$(j_bash "python3 -c \"Path('docs/reviews/r.md').write_text('x')\"")"
expect block "Bash: node literal-path write"            "$(j_bash "node -e \"writeFileSync('docs/reviews/r.md','x')\"")"
expect block "Bash: copy-out chained with delete"       "$(j_bash 'cp docs/reviews/x.md code-checker/y.md && rm docs/reviews/x.md')"

# Owner-only directories — reads and the copy-out shapes stay open
expect allow "Bash: evidence copy-out of a report" "$(j_bash 'cp docs/reviews/2026-08-16-review.md code-checker/report-r1.md')"
expect allow "Bash: rsync out of reviews"          "$(j_bash 'rsync -a docs/reviews/ code-checker/reviews/')"
expect allow "Bash: read decisions"                "$(j_bash 'cat docs/decisions/workflow.md')"
expect allow "Bash: grep reviews, redirect out"    "$(j_bash 'grep -rn Follow-up docs/reviews/ > /tmp/results.txt')"
expect allow "Bash: sed read-mode on decisions"    "$(j_bash 'sed -n 1,20p docs/decisions/workflow.md')"
expect allow "Bash: git log on decisions"          "$(j_bash 'git log --oneline docs/decisions/')"
expect allow "Bash: git show a report"             "$(j_bash 'git show HEAD -- docs/reviews/r.md')"
expect allow "Bash: git diff reviews"              "$(j_bash 'git diff docs/reviews/')"
expect allow "Bash: ls reviews"                    "$(j_bash 'ls docs/reviews')"
expect allow "Bash: pipe report to tee elsewhere"  "$(j_bash 'cat docs/reviews/r.md | tee /tmp/copy.md')"
expect allow "Bash: clear evidence drop"           "$(j_bash 'rm -rf code-checker/*')"
expect allow "Bash: touch a plan (implementer dir)" "$(j_bash 'touch docs/plans/new-unit.md')"
expect allow "Bash: sibling dir reviews-archive"    "$(j_bash 'touch docs/reviews-archive/r.md')"
expect allow "Bash: dotted sibling reviews.backup"  "$(j_bash 'touch docs/reviews.backup/r.md')"

echo
if [ "$fail" -eq 0 ]; then echo "ALL CASES PASS"; else echo "FAILURES PRESENT"; fi
exit "$fail"
