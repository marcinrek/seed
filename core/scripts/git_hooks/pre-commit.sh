#!/bin/sh

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".*src.*\.js\{0,1\}$")
ESLINT="$(git rev-parse --show-toplevel)/node_modules/.bin/eslint"

# Set colors
RED='\033[1;31m'
LRED='\033[0;31m'
GREEN='\033[1;32m'
LGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LYELLOW='\033[0;33m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

PASS=true

echo "\n${BLUE}Validating Javascript:${NC}\n"

# Check for eslint
if [[ ! -x "$ESLINT" ]]; then
  echo "\t${RED}Please install ESlint ${LYELLOW}(npm i --save-dev eslint)${NC}"
  exit 1
fi

for FILE in $STAGED_FILES
do
  "$ESLINT" "$FILE"

  if [[ "$?" == 0 ]]; then
    echo "\t${GREEN}ESLint Passed: $FILE${NC}"
  else
    echo "\t${RED}ESLint Failed: $FILE${NC}"
    PASS=false
  fi
done

echo "\n${YELLOW}Javascript validation completed!${NC}\n"

if ! $PASS; then
  echo "${RED}COMMIT FAILED: \n${LRED}Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.${NC}\n"
  exit 1
else
  echo "${GREEN}COMMIT SUCCEEDED${NC}\n"
fi

exit $?