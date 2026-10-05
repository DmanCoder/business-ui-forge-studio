#!/bin/bash

echo "Running check-branch.sh..."

current_branch=$(git symbolic-ref --short HEAD)
echo "Current branch: $current_branch"

disallowed_branches=("main" "develop")

for branch in "${disallowed_branches[@]}"; do
    echo "Checking against: $branch"
    if [ "$current_branch" = "$branch" ]; then
        echo "Commits to the $branch branch are not allowed."
        exit 1
    fi
done
