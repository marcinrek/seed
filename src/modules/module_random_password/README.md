### random_password docs
Sample app that uses &lt;script type="module"&gt; with webpack bundle as fallback for browsers that do not support it.

```html
<script type="module" src="js/random_password.mod.js"></script>
<script nomodule src="js/random_password.bundle.js"></script>
```

#### Key files

* **/src/modules/random.password.app.js** - entry file for webpack

```javascript
import random_password from 'random_password.mod';
```

* **/src/modules/module_random_password/js/*.js** - all files used here have **.mod.js** endin which makes that just to be copied to the dest js folder. See config.json for more related settings.

* **/src/modules/module_random_password/js/random_password.test.js** - same mocha test. Test are run automatically after each js file change or manually by npm run test. See config.json for more related settings on automatically run.

---

