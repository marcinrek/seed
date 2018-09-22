### react_app docs
Basic react application example module.

This modules uses routing so to run dev server type:
```
gulp serve --routingEntry=/react_app.html
```

#### Key files
- **/src/modules/react.app.js** - this is the entry file for webpack. It has a very simple markup:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from 'react_app';

    ReactDOM.render(
        <App  />,
        document.getElementById('app')
    );
    ```

- **/src/modules/module_react_app/js/react_app.js** - this is the file imported above by:

    ```javascript
    import App from 'react_app';
    ```

    as you don't need to specify the folder. Webpack will look for all files in all folders specified in config.json under "webpackResolveDest" :

    ```javascript
    "webpackResolveDest": "./src/modules/**/js"
    ```
---
