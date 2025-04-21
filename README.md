# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is currently pre-release. Expect breaking changes.***
***TUIJS-Router is built with modules. A bundler is recommended.***

***Last Updated 04/21/2025***


## Getting Started
The TUIJS-Router is flexible and can handle all routes, or if desired, it can be easily configured to direct unknown routes or any specified routes to the server.
1. The easiest way to get started is to configure you server to respond to any desired server routes, then respond to all remaining requests to your index.html. Here is a simple server example in node.

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

2. On the client side app import the 'createRouter' function from 'tuijs-router', then create a new instance.

```js
import { createRouter } from 'tuijs-router';
export const routerInstance = createRouter();
```

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


```js
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
```

5. Start the router instance. This initiates the router eventListeners and the first route.

```js
routerInstance.startRouter();
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

- startRouter
    - Parameters
        - None
- stopRouter
    - Parameters
        - None

- setRouteList
    - Parameters
        - newRouteList - Array
- addRoute
    - Parameters
        - path - string
- deleteRoute
    - Parameters
        - path - string
- replaceRoute
    - Parameters
        - path - string
        - newEnterFunction - Function
        - newExitFunction - Function or null

- setServerRouteList
    - Parameters
        - newServerRouteList - Array
- addServerRoute
    - Parameters
        - path - string
- deleteServerRoute
    - Parameters
        - path - string
- replaceServerRoute
    - Parameters
        - oldPath - string
        - newPath - string

- setRouteNotFound
    - Parameters
        - options - Object

- setRedirectList
    - Parameters
        - redirectList - Array
- addRedirect
    - Parameters
        - fromPath - string
        - toPath - string
- deleteRedirect
    - Parameters
        - fromPath - string

- getRouterConfig
    - Parameters
        - None
- getRouteList
    - Parameters
        - None
- getRouteNotFound
    - Parameters
        - None
- getRedirectList
    - Parameters
        - None

- navigateTo
    - Parameters
        - targetRoute - string
        - visitedPaths - Set
- NavigateToAnchorTag
    - Parameters
        - anchor - string
