#!/bin/sh

#######
# Set varialbes
#######
scaffoldPath="core/scripts/add_module/module_scaffold"
modulesPath="src/modules/"
modulesPrefix="module_"

#######
# Set colors
#######
RED='\033[0;31m'
LRED='\033[1;31m'
GREEN='\033[0;32m'
LGREEN='\033[1;32m'
NC='\033[0m' # No Color

#######
# Get new module name
#######
echo -n "Input module name: "
read moduleName

#######
# Get settings
#######

# CSS
echo -n "Use CSS [Y/n]: "
read CSS
if [ "$CSS" = "y" ] || [ "$CSS" = "Y" ] || [ -z "$CSS" ]; then
  echo -e " ${GREEN}+CSS${NC}";
  CSS="Y";
else
  echo -e " ${RED}-CSS${NC}";
  CSS="N";
fi

# File folder
echo -n "Use files folder [y/N]: "
read files
if [ "$files" = "n" ] || [ "$files" = "N" ] || [ -z "$files" ]; then
  echo -e " ${RED}-file folder${NC}";
  files="N";
else
  echo -e " ${GREEN}+file folder${NC}";
  files="Y";
fi

# global.js
echo -n "Use global.js [Y/n]: "
read globalJS
if [ "$globalJS" = "y" ] || [ "$globalJS" = "Y" ] || [ -z "$globalJS" ]; then
  echo -e " ${GREEN}+global.js${NC}";
  globalJS="Y";
else
  echo -e " ${RED}-global.js${NC}";
  globalJS="N";
fi

# module.js
echo -n "Use module.js [y/N]: "
read moduleNameJS
if [ "$moduleNameJS" = "n" ] || [ "$moduleNameJS" = "N" ] || [ -z "$moduleNameJS" ]; then
  echo -e " ${RED}-module.js${NC}";
  moduleNameJS="N";
else
  echo -e " ${GREEN}+module.js${NC}";
  moduleNameJS="Y";
fi

# *.mod.js
echo -n "Use *.mod.js [y/N]: "
read modJS
if [ "$modJS" = "n" ] || [ "$modJS" = "N" ] || [ -z "$modJS" ]; then
  echo -e " ${RED}-*.mod.js${NC}";
  modJS="N";
else
  echo -e " ${GREEN}+*.mod.js${NC}";
  modJS="Y";
fi

# mocha tests
echo -n "Use mocha tests [y/N]: "
read mochaJS
if [ "$mochaJS" = "n" ] || [ "$mochaJS" = "N" ] || [ -z "$mochaJS" ]; then
  echo -e " ${RED}-mocha${NC}";
  mochaJS="N";
else
  echo -e " ${GREEN}+mocha${NC}";
  mochaJS="Y";
fi

# puppeteer test
echo -n "Use puppeteer tests [y/N]: "
read pupJS
if [ "$pupJS" = "n" ] || [ "$pupJS" = "N" ] || [ -z "$pupJS" ]; then
  echo -e " ${RED}-puppeteer${NC}";
  pupJS="N";
else
  echo -e " ${GREEN}+puppeteer${NC}";
  pupJS="Y";
fi

# markdown
echo -n "Use markdown docs [Y/n]: "
read markdown
if [ "$markdown" = "y" ] || [ "$markdown" = "Y" ] || [ -z "$markdown" ]; then
  echo -e " ${GREEN}+markdown${NC}";
  markdown="Y";
else
  echo -e " ${RED}-markdown${NC}";
  markdown="N";
fi

# HTML
echo -n "Use HTML [Y/n]: "
read html
if [ "$html" = "y" ] || [ "$html" = "Y" ] || [ -z "$html" ]; then
  echo -e " ${GREEN}+HTML${NC}";
  html="Y";
else
  echo -e " ${RED}-HTML${NC}";
  html="N";
fi

# Webpack entry file
echo -n "Create webpack entry file [n/Y]: "
read webpack
if [ "$webpack" = "n" ] || [ "$webpack" = "N" ] || [ -z "$webpack" ]; then
  echo -e " ${RED}-webpack entry${NC}";
  webpack="N";
else
  echo -e " ${GREEN}+webpack entry${NC}";
  webpack="Y";
fi

#######
# Set module paths variables
#######
modulePath=$modulesPath$modulesPrefix${moduleName//[[:space:]]/_}
moduleNameTrimed=${moduleName//[[:space:]]/_}

#######
# Cross env sed in place
# https://stackoverflow.com/questions/2320564/i-need-my-sed-i-command-for-in-place-editing-to-work-with-both-gnu-sed-and-bsd
#######
sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

#######
# Check does module exist 
#######
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

  #######
  # Create directories
  #######
  if [ "$CSS" = "Y" ] ; then 
    echo -n "|  |- Creating CSS directory "
    mkdir $modulePath/css
    echo -e "${GREEN}OK!${NC}"
  fi

  if [ "$globalJS" = "Y" ] || [ "$moduleNameJS" = "Y" ] || [ "$modJS" = "Y" ] || [ "$mochaJS" = "Y" ] || [ "$pupJS" = "Y" ] ; then 
    echo -n "|  |- Creating JS directory "
    mkdir $modulePath/js
    echo -e "${GREEN}OK!${NC}"
  fi
  
  if [ "$files" = "Y" ] ; then 
    echo -n "|  |- Creating files folder "
    mkdir $modulePath/files
    echo -e "${GREEN}OK!${NC}"
  fi

  if [ "$html" = "Y" ] ; then 
    echo -n "|  |- Creating HTML folder "
    mkdir $modulePath/html
    echo -e "${GREEN}OK!${NC}"
  fi

  # CSS
  if [ "$CSS" = "Y" ] ; then
    echo -n "|  |- Copying CSS from $scaffoldPath/css to $modulePath/css: "
    cp -R $scaffoldPath/css/* $modulePath/css
    rm $modulePath/css/images/blank.jpg
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/desktop.scss
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/global.scss
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/tablet.scss
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/css/print.scss
    echo -e "${GREEN}OK!${NC}"
  fi

  # globalJS
  if [ "$globalJS" = "Y" ] ; then
    echo -n "|  |- Copying global.js from $scaffoldPath/js to $modulePath/js: "
    cp -R $scaffoldPath/js/global.js $modulePath/js
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/global.js
    echo -e "${GREEN}OK!${NC}"
  fi

  # moduleNameJS
  if [ "$moduleNameJS" = "Y" ] ; then
    echo -n "|  |- Copying module.js from $scaffoldPath/js to $modulePath/js: "
    cp -R $scaffoldPath/js/module.js $modulePath/js/$moduleNameTrimed.js
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.js
    echo -e "${GREEN}OK!${NC}"
  fi

  # modJS
  if [ "$modJS" = "Y" ] ; then
    echo -n "|  |- Copying *.mod.js from $scaffoldPath/js to $modulePath/js: "
    cp -R $scaffoldPath/js/module.mod.js $modulePath/js/$moduleNameTrimed.mod.js
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.mod.js
    cp -R $scaffoldPath/js/module.sub.mod.js $modulePath/js/$moduleNameTrimed.sub.mod.js    
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.sub.mod.js
    echo -e "${GREEN}OK!${NC}"
  fi

  # mochaJS
  if [ "$mochaJS" = "Y" ] ; then
    echo -n "|  |- Copying module.test.js from $scaffoldPath/js to $modulePath/js: "
    cp -R $scaffoldPath/js/module.test.js $modulePath/js/$moduleNameTrimed.test.js
    echo -e "${GREEN}OK!${NC}"
  fi

  # pupJS
  if [ "$pupJS" = "Y" ] ; then
    echo -n "|  |- Copying module.pup.js from $scaffoldPath/js to $modulePath/js: "
    cp -R $scaffoldPath/js/module.pup.js $modulePath/js/$moduleNameTrimed.pup.js
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/js/$moduleNameTrimed.pup.js
    echo -e "${GREEN}OK!${NC}"
  fi

  # HTML
  if [ "$html" = "Y" ] ; then
    echo -n "|  |- Copying html files from $scaffoldPath/html to $modulePath/html: "
    cp -R $scaffoldPath/html/*.html $modulePath/html
    cp -R $scaffoldPath/module.html $modulePath/$moduleNameTrimed.html
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/$moduleNameTrimed.html
    echo -e "${GREEN}OK!${NC}"
  fi

  # markdown
  if [ "$markdown" = "Y" ] ; then
    echo -n "|  |- Copying README.md files from $scaffoldPath to $modulePath: "
    cp -R $scaffoldPath/README.md $modulePath/
    sedi "s/{{module_name}}/$moduleNameTrimed/g" $modulePath/README.md
    echo -e "${GREEN}OK!${NC}"
  fi

  # webpack
  if [ "$webpack" = "Y" ] ; then
    echo -n "|  |- Creating ./src/modules/$moduleNameTrimed.app.js "
    cp -R $scaffoldPath/js/module.app.js src/modules/$moduleNameTrimed.app.js
    sedi "s/{{module_name}}/$moduleNameTrimed/g" src/modules/$moduleNameTrimed.app.js
    echo -e "${GREEN}OK!${NC}"
  fi

  echo "---"
  echo -e "| All done! To enter type: ${LGREEN}cd $modulePath${NC}"
  echo "---"
  
  exit
fi
