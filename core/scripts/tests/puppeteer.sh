#!/bin/sh

# Set colors
RED='\033[0;31m'
LRED='\033[1;31m'
GREEN='\033[0;32m'
LGREEN='\033[1;32m'
NC='\033[0m' # No Color

# Look for module test files
HAS_MODULE="$(ls src/modules/*/js/*.pup.js)";
echo "--"

# Copy helpers JS to node_modules so it can be resolved without passing path
if [ ! -f ./node_modules/puppeteer.helpers.js ]; then
    echo -e "Copying ${GREEN}puppeteer.helpers.js${NC} to ${GREEN}/node_modules/.${NC}"
    cp './core/scripts/tests/puppeteer.helpers.js' './node_modules/';
    echo "--"
fi

# Run for global test files
if [ ! -f ./src/test/*.pup.js ]; then
    echo -e "${GREEN}No global puppeteer test files.${NC}"
else 
    for generalTests in ./src/test/*.pup.js; do
        node $generalTests 
        if [ $? -eq 0 ]; then
            echo 
        else
            exit 1
        fi
    done
fi

# Run for module test files
if [[ -n "$HAS_MODULE" ]]; then
    for moduleTests in ./src/modules/*/js/*.pup.js; do
        node $moduleTests 
        if [ $? -eq 0 ]; then
            echo 
        else
            exit 1
        fi
    done
else 
    echo -e "${GREEN}No module puppeteer test files.${NC}"
fi
