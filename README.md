# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is currently pre-release. Expect breaking changes.***
***TUIJS-Router is built with modules. A bundler is recommended.***

***Last Updated 04/21/2025***


## Getting Started
The TUIJS-Router is flexible and can handle all routes, or if desired, it can be easily configured to direct unknown routes or any specified routes to the server.
1. The easiest way to get started is to configure you server to respond to explicit server routes, then return your index.html for all other requests. ***Further configuration is recommended for a production app.***
2. On the client side app import the 'createRouter' function from 'tuijs-router', then create a new instance.

3. Again on the client side use the set functions to apply your router initial router configuration to your router instance.
    - **setRouteList** - Sets the route list Array. This array contains Objects which each define a single route. The structure for each object is path, enterFunction, exitFunction(optional).
        - "path" - string - Defines the route path.
        - "enterFunction" - Function - Will be executed when the route is navigated to. This is the core of where routed changes occur. Any desired validations should be at the beginning of this Function.
        - "exitFunction" - Function - *OPTIONAL* - Will be executed when the route is navigated away from.
     - **serverRouteList** - *OPTIONAL* - Sets the server route list Array. This array contains a list of strings that define routes that should be passed to the server without being processed by the client router.
        - "path" - string - Defines the route path.
        - "enterFunction" - Function - Will be executed when the route is navigated to. This is the core of where routed changes occur. Any desired validations should be at the beginning of this Function.
        - "exitFunction" - Function - *OPTIONAL* - Will be executed when the route is navigated away from.
    - **setRouteNotFound** - Sets the route not found options. This Object contains two options.
        - "server" - Default = true - A boolean which tells the router where to send requests to do not match any defined client routes. If true, "404/Page Not Found" requests will be passed the server. If false they will be directed to the client side router. 
        - "path" - Default = '/404' - A string that contains the "404/Page Not Found".
    - **setRedirectList** - *OPTIONAL* - Sets any paths that should redirect. This Array is optional and only needs to be set if client router redirects are desired. This can be useful when you have a root path that is only structural (See JS code example below). The structure for each object is fromPath then toPath.
        - "fromPath" - string - Defines the pathe to be redirected from.
        - "toPath" - string - Defines the pathe to be redirected to.

4. Start the router instance. This initiates the router eventListeners and the first route.

### Client example using standard JavaScript.
```js
import { createRouter } from 'tuijs-router';
const routerInstance = createRouter();

routerInstance.setRouteList([
    { path: '/', enterFunction: renderPageHome, exitFunction: leaverPageHome },
    { path: '/about', enterFunction: renderPageAbout },
    { path: '/contact', enterFunction: renderPageContact },
    { path: '/docs/intro', enterFunction: renderPageDocsIntro },
    { path: '/docs/:page-name', enterFunction: renderPageDocs },
    { path: '/docs/intro', enterFunction: renderPageServicesIntro },
    { path: '/services/:page-name', enterFunction: renderPageServices },
]);
routerInstance.setServerRouteList([
    '/api/server-route-1',
    '/api/server-route-2'
]);
routerInstance.setRouteNotFound({
    server: true,
    path: '/404'
}); 
routerInstance.setRedirectList([
    {
        fromPath: '/docs',
        toPath: '/docs/intro'
    },
    {
        fromPath: '/services',
        toPath: '/services/intro'
    }
]);

routerInstance.startRouter();
```

### Server example using Node.js.
```js
const express = require('express');
const path = require('path');

const app = express();
const dirProjectRoot = path.join(__dirname, '..');
const siteRoot = path.join(dirProjectRoot, '/public');

app.use(express.static(siteRoot));

app.get('/404', function (req, res) {
    res.status(404).sendFile(path.join(siteRoot, '/404.html'));
});

app.get('/api/server-route-1', function (req, res) {
    res.status(200).send('server-route-1');
});

app.get('/api/server-route-2', function (req, res) {
    res.status(200).send('server-route-2');
});

app.get('*', (req, res, next) => {
    const requestPath = req.path;
    if (path.extname(requestPath)) {
        return res.status(404).sendFile(path.join(siteRoot, '/404.html'));
    }
    res.status(200).sendFile(path.join(siteRoot, '/index.html'));
});

app.listen(3000);
```

## Notes:
- Link click handling.
    - If the link starts with one of the following prefix's, client side routing will be skipped.
        - 'http://'
        - 'https://'
        - 'ftp://'
        - 'file://'
        - 'ws://'
        - 'wss://'
        - 'tel:'
        - 'mailto:'
    - If the link prefix is '#' client-side, the 'NavigateToAnchorTag' method is used to scroll to the element location.
    - If the link target is set to '_blank', client side routing will be skipped.
            

## Below are all of the router methods.

### startRouter

| Parameters |
|------------|
| None       |
<br>
<br>

### stopRouter

| Parameters |
|------------|
| None       |
<br>
<br>

### setRouteList

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| newRouteList | Array    | An array of route Objects |
<br>
<br>

### addRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>
<br>

### deleteRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>
<br>

### replaceRoute

| Parameters       | Type             | Description                                                              |
|------------------|------------------|--------------------------------------------------------------------------|
| path             | string           | The route to be added                                                    |
| newEnterFunction | Function         | The function that executes when the route is triggered                   |
| newExitFunction  | Function || null | The function that executes when the current route is navigated away from |
<br>
<br>

### setServerRouteList

| Parameters         | Type             | Description                                                        |
|--------------------|------------------|--------------------------------------------------------------------|
| newServerRouteList | Array            | List of server routes to be added to router instance configuration |
<br>
<br>

- ### addServerRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>
<br>

- ### deleteServerRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>
<br>

### replaceServerRoute

| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| oldPath      | string   | The old route/path to be replaced         |
| newPath      | string   | The new route/path to replace the old one |
<br>
<br>

### setRouteNotFound

| Parameters   | Type     | Description                        |
|--------------|----------|------------------------------------|
| options      | Object   | The route not found object options |
<br>
<br>

### setRedirectList

| Parameters   | Type     | Description                  |
|--------------|----------|------------------------------|
| redirectList | Array    | An array of redirect objects |
<br>
<br>

### addRedirect

| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| fromPath     | string   | The path that triggers the redirect       |
| toPath       | string   | The new route/path to redirect to         |
<br>
<br>

### deleteRedirect
| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| fromPath     | string   | The redirect object to be deleted         |
<br>
<br>

### getRouterConfig

| Parameters |
|------------|
| None       |
<br>
<br>

### getRouteList

| Parameters |
|------------|
| None       |
<br>
<br>

### getRouteNotFound

| Parameters |
|------------|
| None       |
<br>
<br>

### getRedirectList
| Parameters |
|------------|
| None       |
<br>
<br>

### navigateTo

| Parameters   | Type     | Description                                                               |
|--------------|----------|---------------------------------------------------------------------------|
| targetRoute  | string   | The route/path to be navigated to                                         |
| visitedPaths | Set      | A list of visited paths designed to prevent infinite route loops (20 Max) |
<br>
<br>

### NavigateToAnchorTag

| Parameters   | Type     | Description                 |
|--------------|----------|-----------------------------|
| anchor       | string   | The hash to be navigated to |
