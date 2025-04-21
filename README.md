# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is currently pre-release. Expect breaking changes.***
***TUIJS-Router is built with modules. A bundler is recommended.***

***Last Updated 04/09/2025***


## Getting Started
TUIJS-Router is flexible. It can handle all routes, or if desired, it can be easily configured to direct routes unknown by the 
1. The easiest way to get started is to configure you server to send all routes to index.html. If a true 404 is desired, you can configure the 
2. On the client side app import the 'createRouter' function from 'tuijs-router', then create a new instance.

```js
import { createRouter } from 'tuijs-router';
export const routerInstance = createRouter();
```

3. User the set functions to set your router configuration.
    - **setRouteList** - Sets the route list Array. This array contains Objects which each define a single route. The structure for each object is path, enterFunction, exitFunction(optional).
        - "path" - string - Defines the route path.
        - "enterFunction" - Function - Will be executed when the route is navigated to. This is the core of where routed changes occur. Any desired validations should be at the beginning of this Function.
        - "exitFunction" - Function - *OPTIONAL* - Will be executed when the route is navigated away from.
    - **setRouteNotFound** - Sets the route not found options. This Object contains two options.
        - "server" - Default = true - A boolean which tells the router where to send requests if a page is not found. If true, requests will go to the server. If false they will be directed to the client side router. 
        - "path" - Default = '404' - A string that contains the path to direct to when a page is not found.
    - **setRedirectList** - *OPTIONAL* - Sets any paths that should redirect. This Array is optional and only needs to be set if client router redirects are desired. This can be useful when you have a root path that is only structural (See JS code example below). The structure for each object is fromPath then toPath.
        - "fromPath" - string - Defines the pathe to be redirected from.
        - "toPath" - string - Defines the pathe to be redirected to.


```js
routerInstance.setRouteList([
    { path: '/', enterFunction: renderPageHome },
    { path: '/about', enterFunction: renderPageAbout },
    { path: '/contact', enterFunction: renderPageTerms },
    { path: '/docs/intro', enterFunction: renderPageTerms },
    { path: '/docs/page1', enterFunction: renderPageTerms },
    { path: '/docs/page2', enterFunction: renderPageTerms },
    { path: '/services/intro', enterFunction: renderPageTerms },
    { path: '/services/page1', enterFunction: renderPageTerms },
    { path: '/services/page2', enterFunction: renderPageTerms }
]);
routerInstance.setServerRouteList([
    '/api/server-route-1'
]);
routerInstance.setRouteNotFound({
    server: true,
    path: '/404.html'
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

5. Start the router instance. This initiate the eventListeners that will allow for the router to function.

```js
routerInstance.startRouter();
```

Notes:
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

- startRouter - No parameters
- stopRouter - No parameters
- setRouteList - Array - routeList
- addRoute - string, Function, Function = null - path, enterFunction, exitFunction = null
- deleteRoute - string -path
- replaceRoute - addRoute - string, Function, Function = null - path, newEnterFunction, newExitFunction = null
- setRouteNotFound - Object - options
- setRedirectList - Array - redirectList
- addRedirect - string, string - fromPath, toPath
- deleteRedirect - string - fromPath
- getRouterConfig - No parameters
- getRouteList - No parameters
- getRouteNotFound - No parameters
- getRedirectList - No parameters
- navigateTo - string, Set = new Set() - targetRoute, visitedPaths = new Set()
