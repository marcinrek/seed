### babel docs

Javascript files that have **.babel.js** ending will just get babelified and put to output JS folder. In this example **/src/modules/module_babel/js/babel_sample.babel.js** 
```javascript
const sample = (b) => {
  let x = `This is: ${b}!`;
}
```
ends up in ***/dist/js/babel_sample.babel.js*** as
```javascript
"use strict";

var sample = function sample(b) {
  var x = "This is: " + b + "!";
};
```
The key use of this is when you just want to have one specific file in your project to be babelified - like a small helper for example.

---
