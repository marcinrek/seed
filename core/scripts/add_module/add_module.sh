#!/bin/sh

# Set varialbes
scaffoldPath="core/scripts/add_module/module_scaffold"
modulesPath="src/modules/"
modulesPrefix="module_"

# Set colors
RED='\033[0;31m'
LRED='\033[1;31m'
GREEN='\033[0;32m'
LGREEN='\033[1;32m'
NC='\033[0m' # No Color

# Get new module name
echo -n "Input module name: "
read moduleName

# Set module path
modulePath=$modulesPath$modulesPrefix${moduleName//[[:space:]]/_}
moduleNameTrimed=${moduleName//[[:space:]]/_}

# Cross env sed in place
## https://stackoverflow.com/questions/2320564/i-need-my-sed-i-command-for-in-place-editing-to-work-with-both-gnu-sed-and-bsd
sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

# Check does module exist 
echo "---"
echo "| Create path: $modulePath"
echo -n "| \- Checking is name available: "

if [ -d "$modulePath" ]; then
  echo -e "${RED}ERROR${LRED} - module with that name already exists! Aborting ...${NC}"
  echo "---"
  exit
fi

if [ ! -d "$modulePath" ]; then
  echo -e "${GREEN}OK!${NC}"

  echo -n "|  |- Create module folder: "
  mkdir $modulePath
  echo -e "${GREEN}OK!${NC}"
  
  echo -n "|  |- Copying scaffold from $scaffoldPath to $modulePath: "
  cp -R $scaffoldPath/* $modulePath
  echo -e "${GREEN}OK!${NC}"

  echo -n "|  |- Renaming module file from module.js to $moduleNameTrimed.js: "
  mv  $modulePath/js/module.js $modulePath/js/$moduleNameTrimed.js
  echo -e "${GREEN}OK!${NC}"

  echo -n "|  |- Renaming module file from module.mod.js to $moduleNameTrimed.mod.js: "
  mv  $modulePath/js/module.mod.js $modulePath/js/$moduleNameTrimed.mod.js
  echo -e "${GREEN}OK!${NC}"

  echo -n "|  |- Renaming module file from module.sub.mod.js to $moduleNameTrimed.sub.mod.js: "
  mv  $modulePath/js/module.sub.mod.js $modulePath/js/$moduleNameTrimed.sub.mod.js
  echo -e "${GREEN}OK!${NC}"

  echo -e "|  |- Replace ${GREEN}{{module_name}}${NC} to real module name ${GREEN}$moduleNameTrimed${NC} in:"
  echo -e "|   \- Working on: ${GREEN}$modulePath/js/*.js${NC}"
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/global.js
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.js
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.mod.js
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.sub.mod.js

  echo -e "|   |- Working on: ${GREEN}$modulePath/css/*.scss${NC}"
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/desktop.scss
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/global.scss
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/tablet.scss
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/print.scss

  echo -e "|   |- Working on: ${GREEN}$modulePath/html/*.html${NC}"
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/html/_fragment_name.html

  echo -e "|   |- Working on: ${GREEN}$modulePath/$moduleNameTrimed.html${NC}"
  mv $modulePath/module.html $modulePath/$moduleNameTrimed.html
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/$moduleNameTrimed.html

  echo -e "|   |- Working on: ${GREEN}$modulePath/README.md${NC}"
  sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/README.md

  echo -e "|   |- Removing blank files: ${GREEN}$modulePath/css/images/blank.jpg${NC}"
  rm $modulePath/css/images/blank.jpg
  echo -e "|   |- Removing blank files: ${GREEN}$modulePath/files/blank.jpg${NC}"
  rm $modulePath/files/blank.jpg

  echo "---"
  echo -e "| All done! To enter type: ${LGREEN}cd $modulePath${NC}"
  echo "---"
  
  exit
fi
