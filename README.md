# TUI-Router
## A simple and easy to use client-side router for JavaScript.
***TUI-Router is built on modules. A bundler is recommended.***

***Last Updated 08/03/2024***


## Getting Started
1. Import the router function 'tuiRouter' from 'tui-router'.

```js
import { tuiRouter } from 'tui-router';
```

2. Create the following variables.
    - routeList - List of route-path and route-function pairs. The functions should consist of the logic that will execute with the route.
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

3. Make sure that each route function has the logic to update you page according to the route.

4. Call the 'tuiRouter' function with the listed variables. This is typically done in the index.js file which is referenced in the index.html.

```js
tuiRouter(routeList, routeServer, routeNotFound);
```

## How It Works
TUI-Router is made up of two main parts. The first is the 'routerStart' function which validates the provided router variables, listens for specific events, and checks the links to determine the correct behavior. The second is the 'router' function. This function handles the actual routing behavior.
### Function 'routerStart'
1. Listens for clicks on 'A' links
    1. Checks the 'href' attribute. If any of the following checks are met, the default behavior is used to navigate to the link, and client-side routing is skipped.
        - Checks against the 'routeServer' list. If a matching route is found.
        - Checks if the 'href' ends in '.html'.
        - Checks if the 'href' begins with 'http://' or 'https://'.
    2. Checks if the 'href' attribute starts with '#'. If so, both the default behavior and client-routing are skipped. The router will try to find the element, and scroll it into view, if it is found. If it is not, all routing behavior, both client and server are skipped.
    3. Checks the 'target' attribute. If it is '_blank' the default behavior is prevented and client-side routing is used to open the route in a new tab.
    4. If non of the above are detected, the router will prevent the default behavior, update the history with 'pushState' using the 'href' from the link (The target route being navigated to), then the 'router' function will be called.
2. Listens of 'onpopstate' events on the 'window'.
    - If detected the 'router' function will be called.
3. If it is determined that this is the initial route (if no other conditions are met in the 'routerStart' function), then the 'router' function will be called.
### Function 'router'
1. Validates the 'routeNotFound' variable.
2. Collects the current path.
3. Checks history. If there is no history, the history is replaced with the home route.
4. Locates the route function in the 'routeList' variable. If located, the function is executed.
5. If no route is found in the the 'routeList' variable, the windows location is set to the 'routeNotFound' variable and the function ends.
