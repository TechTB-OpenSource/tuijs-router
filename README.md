# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is built on modules. A bundler is recommended.***

***Last Updated 08/15/2024***


## Getting Started
1. Import the router function 'tuiRouter' from 'tuijs-router'.

```js
import { tuiRouter } from 'tuijs-router';
```

2. Create the following variables.
    - routeList - List of route-path and route-function pairs. The functions should consist of the logic that will execute with the route.
    - routeNotFound - A path to the site's not found page.
    ***IT IS CRITICAL THAT YOUR SERVER IS SETUP TO HANDLE YOUR 'routeNotFound' ROUTE. IF ALL REQUESTS ARE SENT TO THE INDEX.HTML FILE IN YOUR SITE ROOT, YOU MAY CREATE A ROUTING LOOP.***

```js
export const routeList = {
    '/': routeHomeFunction,
    '/route1': route1Function,
    '/route2': route1Function,
    '/route3': route1Function,
    '/route4': route1Function,
};
export const routeNotFound = '/404';
```

3. Make sure that each route function has the logic to update you page according to the route.

4. Call the 'tuiRouter' function with the listed variables. This is typically done in the index.js file which should be referenced in the index.html.
***The order will always be 'routeList, routeNotFound'***

```js
tuiRouter(routeList, routeNotFound);
```

## How It Works
TUIJS-Router is made up of two main parts. The first is the 'routerStart' function which validates the provided router variables, listens for specific events, and checks the links to determine the correct behavior. The second is the 'router' function. This function handles the actual routing behavior.
### Function 'routerStart'
1. Validates the 'routeList' Object , and throws an error if validation fails.
2. Validates the 'routeNotFound' variable. If the 'routeNotFound' variable is not a string, is equal to '', or is equal to '/' the functions sets a default string value if validation fails (The default is '/404'). ***The 'routeNotFound' variable should not be '' or '/' as this could cause a routing loop.***
3. Listens for clicks on 'A' links
    1. Verifies that the 'href' of the link exists in the 'routeList'. If it does not, client-side routing will be skipped and the request will send the request on to the server.
    2. Checks if the 'href' attribute starts with '#'. If so, both the default behavior and client-routing are skipped. The router will try to find the element, and scroll it into view. If it is not found, all routing behavior, both client and server are skipped.
    3. Checks the 'target' attribute. If it is '_blank' the default behavior is prevented and client-side routing is used to open the route in a new tab. ***This check is after the server route check. This will only apply to client-side routes.***
    4. If non of the above are detected, the router will prevent the default behavior, update the history with 'pushState' using the 'href' from the link (The target route being navigated to), then the 'router' function will be called.
4. Listens of 'onpopstate' events on the 'window'.
    - If detected the 'router' function will be called.
5. If it is determined that this is the initial route (if no other conditions are met in the 'routerStart' function), then the 'router' function will be called.
### Function 'handleRoute'
2. Collects the current path.
3. Checks history. If there is no history, the history is replaced with the home route.
4. Locates the route function in the 'routeList' variable. If located, the function is executed.
5. If no route is found in the the 'routeList' variable, the windows location is set to the 'routeNotFound' variable and the function ends.
