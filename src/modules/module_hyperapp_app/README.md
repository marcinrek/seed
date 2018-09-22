### hyperapp_app docs
Sample hyperapp example.
This module requires adding a plugin to .babelrc
```javascript
["transform-react-jsx",{"pragma": "h"}]
```
This will cause React apps to stop working as the default for this is:
```javascript
["transform-react-jsx",{"pragma": "React.createElement"}]
```
This can be done by 
```
--useHyperapp
```
for example:
```
gulp serve --useHyperapp --routingEntry=/hyperapp_app.html
```
This does make it hard to build react and hyperapp at the same time but this is an unlikely scenario. Still possible to do "manually" by changing the gulp parameters during development.

---
