#!/usr/bin/env bash
# PreToolUse guard with two duties:
#  1) Agents never touch dot-env files, by any tool or command. The tracked
#     template is `env.example` (no leading dot) and never matches ENV_RE;
#     a dotted `.env.example` is deliberately blocked — do not rename.
#  2) Bash commands never WRITE INTO or DELETE FROM the owner-only
#     directories (docs/decisions, docs/acceptance, docs/reviews) in the
#     command shapes proven by no-env-access.test.sh — including ./,
#     absolute, quoted, and =-attached paths, git mutation subcommands
#     with global options, interpreter and find writes, and
#     target-directory forms. The evidence copy-out shapes
#     (cp/rsync from an owner directory to code-checker/ or /tmp/) are
#     allow-listed, end-anchored. Reads stay open. Coverage is exactly
#     the fixture's case list; the boundary is D-0002 in
#     docs/decisions/workflow.md. Edit/Write tool calls are governed by
#     the permission rules.
# Registered in .claude/settings.json with matcher
# "Read|Edit|Write|NotebookEdit|Grep|Bash". Proven by no-env-access.test.sh.
set -uo pipefail
input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // ""')

# Matches .env, .env.*, and any path containing them (src/app/.env.production).
# Does not match env.example, config.env, .envrc.
ENV_RE='(^|[^[:alnum:]_.])\.env(\.[[:alnum:]_.-]+)?\b'

# Owner-only directories, matched in writing/mutating positions only.
O='docs/(decisions|acceptance|reviews)'
TOK="([^[:space:]|;&]*[/=\"'])?${O}"
RB='([^[:alnum:]_.-]|$)'
ALLOW_OUT="^[[:space:]]*(cp|rsync)([[:space:]]+-[^[:space:]|;&]+)*([[:space:]]+(\./)?${O}/[^[:space:]|;&]*)+[[:space:]]+((\./)?code-checker(/[^[:space:]|;&]*)?|/tmp(/[^[:space:]|;&]*)?)[[:space:]]*$"
W="(>>?|>\|)[[:space:]]*${TOK}${RB}"
W="${W}|\btee\b[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\bsed[[:space:]]+(-[[:alnum:]]*i|--in-place)[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\bawk\b[^|;&]*-i[[:space:]]*inplace[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\bpatch\b[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\b(rm|rmdir|mv|truncate|touch|mkdir|chmod|chown|unlink)\b[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\bgit\b([[:space:]]+(-C[[:space:]]+[^[:space:]|;&]+|--?[[:alnum:]][[:alnum:]=-]*))*[[:space:]]+(restore|checkout|apply|rm|mv|clean|stash)\b[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\b(python[0-9.]*|node|perl|ruby|php|find|xargs)\b[^|;&]*[^[:alnum:]_]${O}${RB}"
W="${W}|\b(cp|rsync|install|ln)\b[^|;&]*[[:space:]]${TOK}${RB}"
W="${W}|\bof=${TOK}${RB}"
OWNER_WRITE_RE="(${W})"

deny() { echo "BLOCKED: $1" >&2; exit 2; }

case "$tool" in
  Read|Edit|Write|NotebookEdit)
    path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_input.notebook_path // ""')
    if printf '%s' "$path" | grep -Eq "$ENV_RE"; then
      deny "env files are off-limits to agents. Variable names live in env.example."
    fi ;;
  Grep)
    target=$(printf '%s' "$input" | jq -r '((.tool_input.path // "") + " " + (.tool_input.glob // ""))')
    if printf '%s' "$target" | grep -Eq "$ENV_RE"; then
      deny "searching env files is off-limits. Variable names live in env.example."
    fi ;;
  Bash)
    cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')
    if printf '%s' "$cmd" | grep -Eq "$ENV_RE"; then
      deny "commands referencing dot-env paths are off-limits. Variable names live in env.example."
    fi
    if ! printf '%s' "$cmd" | grep -Eq "$ALLOW_OUT"; then
      if printf '%s' "$cmd" | grep -Eq "$OWNER_WRITE_RE"; then
        deny "Bash writes into docs/decisions, docs/acceptance, or docs/reviews are off-limits. Reads and the code-checker copy-out are fine; checklist ticks go through the Edit tool."
      fi
    fi ;;
esac
exit 0
