# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is built on modules. A bundler is recommended.***

***Last Updated 02/28/2025***


## Getting Started
1. Ensure you server has a typical SPA setup. All routes should serve to 'index.html' (You may need to setup a 404 route if server side page-not-found handling is desired).
2. On the client side app import the router function 'tuiRouter' from 'tuijs-router'.

```js
import { tuiRouter } from 'tuijs-router';
```

3. Configure the following client side variables.
    - **routeList** - An Object that has all client side routes and their functions. The functions should consist of the logic that will execute with the route.
    - **routeNotFound** - An Object that allows the developer to control how page-not-found errors are handled. The Object consists of the keys listed below. The routeNotFound parameter has default settings (Listed below) and may be ignore when configuring router variables, if the default settings are desired.
        - server - boolean - This key/value pair tells the router where to send page not found requests. If true, the requests go to the server. If false, the requests stay with the client router. ***Default value - false.***
        - path - string - This key/value pair is the path string. This is the path that will be used for page not found requests, regardless of if sent to the server or to the client-side router. It is not recommended that this be set to '/index.html' as this may cause a loop. ***Default value - '/404'.***
    - **redirectList** - *OPTIONAL* - An Object that contains any routes that need to be redirected by the client-side router. Each redirect consists of an input route and the target for the redirect. This variable may be left skipped.
```js
export const routeList = {
    '/': routeHomeFunction,
    '/route1': route1Function,
    '/route2': route2Function,
    '/route3': route3Function,
    '/route4': route5Function,
    '/route5': route4Function,
    '/route6/page': route6Function,
    '/page-not-found': pageNotFoundFunction,
};
export const routeNotFound = {
    server: false,
    path: '/page-not-found'
};
export const redirectList = {
    '/some-page-1': '/route5',
    '/some-page-2': '/route6/page'
};
```

4. Make sure that each route function has the appropriate logic to render the content for that route.

5. Call the 'tuiRouter' function with the listed variables.

```js
tuiRouter(routeList, routeNotFound, redirectList);
```

## How It Works
TUIJS-Router is made up of two main parts. The first is the 'routerStart' function which validates the provided router variables, listens for specific events, and checks the links to determine the correct behavior. The second is the 'router' function. This function handles the actual routing behavior.
### Function 'routerStart'
1. Validates the 'routeList' parameter.
2. Validates the 'routeNotFound' parameter.
3. Validates the 'redirectList' parameter if not null.
4. Listens for clicks on 'A' links
    1. Verifies that the 'href' of the link exists in the 'routeList'. If it does not, The 'handleRouteNotFound' function will be called and the route will be handled based on the router configuration.
    2. Checks if the 'href' attribute starts with '#'. If so, both the default behavior and client-routing are skipped. The router will try to find the element, and scroll it into view. If it is not found, all routing behavior, both client and server are skipped.
    3. Checks for the following conditions and if any are present, the default behavior is used.
        - target === '_self'
        - href.startsWith('http://')
        - href.startsWith('https://')
        - href.startsWith('ftp://')
        - href.startsWith('file://')
        - href.startsWith('ws://')
        - href.startsWith('wss://')
        - href.startsWith('tel:')
        - href.startsWith('mailto:')
    4. If non of the above are detected, the router will prevent the default behavior, update the history with 'pushState' using the 'href' from the link (The target route being navigated to), then the 'handleRoute' function will be called.
5. Listens of 'onpopstate' events on the 'window'.
    - If detected the 'handleRoute' function will be called.
6. If it is determined that this is the initial route (if no other conditions are met in the 'routerStart' function), then the 'handleRoute' function will be called.
### Function 'handleRoute'
1. Collects the current path.
2. Checks history. If there is no history, the history is replaced with the home route.
3. Locates the route function in the 'routeList' variable. If located, the function is executed.
4. If no route is found in the the 'routeList' variable, the 'handleRouteNotFound' function is called.
### Function 'handleRouteNotFound'
1. Determines if route should be passed to the server.
2. If so, a full page request is sent to the server. The path in the request is based on the configured 'path' value in the 'routeNotFound' parameter. If not the path history is updated and the 'handleRoute' function takes back over to router the client to the 'path' value in the 'routeNotFound' parameter.
