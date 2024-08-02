# TUI-Router
## A simple and easy to use client-side router for JavaScript.
**TUI-Router is built on modules. A bundler is recommended.**


## Getting Started (Router Only)
1. Import the router function 'tuiRouter' from 'tui-route'.

```js
import { tuiRouter } from 'tui-router';
```

2. Create the following variables
- routeList
- routeServer
- routeNotFound

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

