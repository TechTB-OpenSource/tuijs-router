# TUI-Router
## A simple and easy to use client-side router for JavaScript.
**TUI-Router is built on modules. A bundler is recommended.**


## Getting Started (Router Only)
1. Import the router function 'tuiRouter' from 'tui-route'.

```js
import { tuiRouter } from 'tui-router';
```

2. Create the following variables.
- routeList - List of route path and route function pairs. The functions should consist of the logic that will execute with the route.
- routeServer - List of route paths that should be directed to the server and not routed on the client-side.
- routeNotFound - A path to the site's not found page.

```js
export const routeList = {
    '/': routeHomeFunction,
    '/route1': route1Function,
    '/route2': route1Function,
    '/route3': route1Function,
    '/route4': route1Function,
};
export const routeServer = [
    '/route2',
    '/route3'
];
export const routeNotFound = './404.html';
```

3. Call the 'tuiRouter' function with the listed variables. This is typically done in the index.js file which is referenced in the index.html.

```js
tuiRiouter(routeList, routeServer, routeNotFound);
```
