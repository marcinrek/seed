#!/bin/sh

NODE_ENV=test ./node_modules/.bin/mocha --require babel-register 'src/**/js/*.test.js' --reporter spec||exit 0