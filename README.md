# TUIJS-Router
## A simple and easy to use client-side router for JavaScript.
***TUIJS-Router is currently pre-release. Expect breaking changes.***
***TUIJS-Router is built with modules. A bundler is recommended.***

***Last Updated 04/21/2025***
<br>
<br>

## Getting Started
The TUIJS-Router is flexible and can handle all routes, or if desired, it can be easily configured to direct unknown routes or any specified routes to the server.
1. The easiest way to get started is to configure you server to respond to explicit server routes, then return your index.html for all other requests. ***Further configuration is recommended for a production app.***
2. On the client side app import the 'createRouter' function from 'tuijs-router', then create a new instance.

3. On the client side use the set functions to apply your router initial router configuration to your router instance.
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
5. If data needs to be passed between routes, use the **navigateTo** method and set the optional data parameter. on the resulting page you can use the **getData** method, on the same router instance, in order to collect the data.
<br>
<br>

### Client example using JavaScript.
```js
import { tuiRouter } from 'tuijs-router';
import { renderPageHome, leavePageHome } from '/home.js';
import { renderPageAbout } from '/about.js';
import { renderPageContact } from '/contact.js';
import { renderPageDocsIntro, renderPageDocsMore } from '/docs.js';
import { renderPageUsers } from '/contact.js';

const routerInstance = tuiRouter();

routerInstance.setRouteList([
    { path: '/', enterFunction: renderPageHome, exitFunction: leavePageHome },
    { path: '/about', enterFunction: renderPageAbout },
    { path: '/contact', enterFunction: renderPageContact },
    { path: '/docs/intro', enterFunction: renderPageDocsIntro },
    { path: '/docs/more', enterFunction: renderPageDocsMore },
    { path: '/users/:page-name', enterFunction: () => {
            const pageData = routerInstance.getState();
            renderPageUsers(pageData);
        }
    },
]);
routerInstance.setServerRouteList([
    '/server-only-route',
]);
routerInstance.setRouteNotFound({
    server: true,
    path: '/404'
}); 
routerInstance.setRedirectList([
    {
        fromPath: '/docs',
        toPath: '/docs/intro'
    }
]);

routerInstance.startRouter();
```

## Notes:
- ***IT IS NOT RECOMMENDED TO USE DYNAMIC ROUTES AT THE ROOT. THIS CAN BREAK ROUTING, CREATE ROUTING LOOPS, OR CAUSE SEO ISSUES.***
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
<br>
<br>        

## Below are all of the router methods.

### startRouter

| Parameters |
|------------|
| None       |
<br>

### stopRouter

| Parameters |
|------------|
| None       |
<br>

### setRouteList

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| newRouteList | Array    | An array of route Objects |
<br>

### addRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>

### deleteRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>

### replaceRoute

| Parameters       | Type             | Description                                                              |
|------------------|------------------|--------------------------------------------------------------------------|
| path             | string           | The route to be added                                                    |
| newEnterFunction | Function         | The function that executes when the route is triggered                   |
| newExitFunction  | Function || null | The function that executes when the current route is navigated away from |
<br>

### setServerRouteList

| Parameters         | Type             | Description                                                        |
|--------------------|------------------|--------------------------------------------------------------------|
| newServerRouteList | Array            | List of server routes to be added to router instance configuration |
<br>

- ### addServerRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>

- ### deleteServerRoute

| Parameters   | Type     | Description               |
|--------------|----------|---------------------------|
| path         | string   | The route to be added     |
<br>

### replaceServerRoute

| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| oldPath      | string   | The old route/path to be replaced         |
| newPath      | string   | The new route/path to replace the old one |
<br>

### setRouteNotFound

| Parameters   | Type     | Description                        |
|--------------|----------|------------------------------------|
| options      | Object   | The route not found object options |
<br>

### setRedirectList

| Parameters   | Type     | Description                  |
|--------------|----------|------------------------------|
| redirectList | Array    | An array of redirect objects |
<br>

### addRedirect

| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| fromPath     | string   | The path that triggers the redirect       |
| toPath       | string   | The new route/path to redirect to         |
<br>

### deleteRedirect

| Parameters   | Type     | Description                               |
|--------------|----------|-------------------------------------------|
| fromPath     | string   | The redirect object to be deleted         |
<br>

### getRouterConfig

| Parameters |
|------------|
| None       |
<br>

### getRouteList

| Parameters |
|------------|
| None       |
<br>

### getRouteNotFound

| Parameters |
|------------|
| None       |
<br>

### getRedirectList

| Parameters |
|------------|
| None       |
<br>

### setState

| Parameters   | Type     | Description                                                               |
|--------------|----------|---------------------------------------------------------------------------|
| targetRoute  | Object   | The state data to be set (Global to the router)                           |
<br>

### getState

| Parameters |
|------------|
| None       |
<br>

### clearState

| Parameters |
|------------|
| None       |
<br>

### navigateTo

| Parameters   | Type     | Description                                                               |
|--------------|----------|---------------------------------------------------------------------------|
| targetRoute  | string   | The route/path to be navigated to                                         |
| data         | Object   | State data to be passed to the destination route (optional)               |
| visitedPaths | Set      | A list of visited paths designed to prevent infinite route loops (20 Max) |
<br>

### NavigateToAnchorTag

| Parameters   | Type     | Description                 |
|--------------|----------|-----------------------------|
| anchor       | string   | The hash to be navigated to |
<br>

### NavigateBack

| Parameters |
|------------|
| None       |
<br>
