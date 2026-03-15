# TUIJS-Router
***Last Updated 03/14/2026***

TO DO - Finish organizing parameters and methods

## Description
A simple and easy to use client-side router for JavaScript. TUIJS-Router is flexible and can be used with vanilla Javascript or with most front end frameworks. TUIJS-Router also works great with TypeScript project.

***TUIJS-Router is currently pre-release. Expect breaking changes.***

<br>
<br>

## Getting Started
1. Install TUIJS-Router via NPM.

2. Once installed import 'createRouterInstance' and use the creator function to create a new instance.

```js
import { createRouterInstance } from 'tuijs-router';

const routerInstance = createRouterInstance();
```

3. Once an instance has been created, routes can be added individually using the **addRoute** or all at once using the **setRouteList** method. Each route consists of a path, an enter function, and an optional exit function. This simple route object format keeps router extremely flexible and allows a developer to have complete control over the code that executes when navigating between routes.

Example using **addRoute**:
```js
routerInstance.addRoute({
    path: '/',
    enterFunction: () => {document.body.innerText = 'Home Page'}
});
```

Example using **setRouteList**:
```js
const routes = [
    {
        path: '/',
        enterFunction: () => {document.body.innerText = 'Home Page'}
    },
    {
        path: '/about',
        enterFunction: () => {document.body.innerText = 'About Page'},
        exitFunction: () => {console.log('Leaving the About Page')}
    }
]
```

4. The **setRouteNotFound** method may be used to configure the router's behavior in the event that a route is called that was not defined in the **routeList** configuration. These can be redirected to the client side router or to the server if a true 404 response is desired. By default, all unknown routes are sent to the server with the path "/404".

&nbsp;&nbsp;&nbsp;&nbsp;***It should be noted that if the server has a basic SPA configuration, and serves "index.html" for all requests, sending unknown routes to the server will cause a routing loop. To avoid this, ensure the server is configured to correctly handle the configured route not found path. This includes Vite. To ensure development environments handle the route not found path, make sure it is included in the Vite configuration file.***

5. Client redirects may also be configured but are optional. These can be useful if you have a parent path that is not an actual page. Redirects can be added, deleted, or the entire list set at once. See the example below.

Example using **addRedirect**:
```js
routerInstance.addRedirect({
    fromPath: '/users',
    toPath: '/users/profile'
})
```

Example using **setRedirectList**:
```js
const redirectList = [
    {
        fromPath: '/users',
        toPath: '/users/profile'
    },
    {
        fromPath: '/docs',
        toPath: '/docs/introduction'
    }
]
routerInstance.setRedirectList();
```

6. If desired, server only routes may configured. These routes will bypass the client router and be sent directly to the server. Server routes may be added, deleted, or the entire list set at once.

***It should be noted that TUIJS-Router does not affect fetch requests. As a result, many project likely do not need to utilize this configuration.***

Example using **addServerRoute**:
```js
routerInstance.addServerRoute('/login');
```

Example using **setServerRouteList**:
```js
const serverRouteList = [
    '/login',
    '/logout'
]
routerInstance.setServerRouteList(serverRouteList);
```

7. Once the router configuration is ready, the router needs to be started using **startRouter** method.

```js
routerInstance.startRouter();
```

<br>
<br>


## Dynamic Routes
TUIJS-Router supports dynamic routing. to create a dynamic route, simple add a route with a path starting with ":".
***IT IS NOT RECOMMENDED TO USE DYNAMIC ROUTES AT THE ROOT. THIS CAN BREAK ROUTING, CREATE ROUTING LOOPS, OR CAUSE SEO ISSUES.***

## State Data
TUIJS-Router supports the ability to pass a state data Object from one page to another. State data is passed using the optional **data** parameter in the **navigateTo** method. All previous state data is cleared when the **navigateTo** method is called. State data may also be manually manipulated using the **setState**, **getState**, and **clearState** methods if needed.

## New Tabs
To open a new tab, use the **navigateToNewTab** method. 
TO DO - ADD MORE DETAIL HERE.

## Notes:
- If an A tag used and the href starts with one of the following prefix's, client side routing will be skipped.
    - 'http://'
    - 'https://'
    - 'ftp://'
    - 'file://'
    - 'ws://'
    - 'wss://'
    - 'tel:'
    - 'mailto:'
- If an A tag is used and the href starts with **#**, the **NavigateToAnchorTag** method is used to scroll to the element location on the current page.
- If and A tag is used and the target is set to **_blank**, client side routing will be skipped.
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
