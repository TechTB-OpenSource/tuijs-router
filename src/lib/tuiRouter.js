import { tuiEvent } from 'tuijs-event';
import { checkIsArray, checkIsObject } from 'tuijs-util';

/**
 * Data Example
 * 
 * route Object Example:
 *      {
 *          path: '/',
 *          enterFunction: functionName,
 *          exitFunction: functionName,
 *      }
 * 
 * routeNotFound Object Example:
 *      {
 *          server: false,
 *          path: '/404'
 *      }
 * 
 * redirect Object Example:
 *      {
 *          fromPath: '/old-path',
 *          toPath:  '/new-path'
 *      }
 */

/**
 * @typedef {Object} Route
 * @property {string} path - The route path (e.g., '/about')
 * @property {Function} handlerFunction - Function to run when the route matches
 * @property {Function|null} [exitFunction] - Optional function to run when exiting the route
 */

/**
 * @typedef {Route[]} RouteList
 */

/**
 * @typedef {Object} RouteNotFound
 * @property {boolean} server - A boolean showing if a route should be forwarded to the server or SPA router.
 * @property {string} path - The path to send route not found requests to.
 */

/**
 * @typedef {Object} Redirect
 * @property {string} fromPath - The route being hit that will trigger a redirect.
 * @property {string} toPath - The target path of the redirect once triggered.
 */

/**
 * @typedef {Redirect[]} RedirectList
 */

/**
 * @typedef {Object} RouterConfig
 * @property {Route[]} routeList - List of route definitions
 * @property {RouteNotFound} routeNotFound - Handler for unknown routes
 * @property {Redirect[]} redirectList - List of path redirects
 */

export function createRouter() {
    const eventInstance = tuiEvent();
    /**
     * @type {RouterConfig}
     */
    let routerConfig = {
        routeList: [],
        routeNotFound: { server: false, path: '/404' },
        redirectList: []
    }
    /**
     * @type {Object}
     */
    let activeRoute = {};


    //// DEV FUNCTIONS ////

    /**
     * Attaches window and document event listeners to start routing.
     * @returns {boolean} Returns true on success and false on error.
     */
    function startRouter() {
        try {
            eventInstance.addTrackedEvent(document, 'click', handleClickEvent); // Click Events
            eventInstance.addTrackedEvent(window, 'popstate', function () { navigateTo(location.pathname) }); // Navigation Events
            navigateTo(null); // Initial route
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Removes all event listeners to prevent stop the router.
     * @returns {boolean} Returns true on success and false on error.
     */
    function stopRouter() {
        try {
            eventInstance.removeAllTrackedEvents();
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Sets the routeList array in the routerConfig Object
     * @param {RouteList} routeList - An Array containing route Objects
     * @returns {boolean} Returns true on success and false on error.
     */
    function setRouteList(routeList) {
        try {
            if (!checkIsArray(routeList)) {
                throw new Error(`The 'routeList' must be an array.`);
            }
            for (let i = 0; i < routeList.length; i++) {
                const { path, enterFunction, exitFunction, ...rest } = routeList[i];
                if (Object.keys(rest).length > 0) {
                    throw new Error(`Unexpected properties provided at index ${i}: ${Object.keys(rest).join(', ')}`);
                }
                if (typeof routeList[i]['path'] !== 'string') {
                    throw new Error(`The route path at index ${i}  must be a string.`);
                }
                if (typeof routeList[i]['enterFunction'] !== 'function') {
                    throw new Error(`The route enterFunction at index ${i} must be a function.`);
                }
                if (typeof routeList[i]['exitFunction'] !== 'function' && exitFunction !== null && exitFunction !== undefined) {
                    throw new Error(`The route exitFunction at index ${i} must be a function or null.`);
                }
            }
            routerConfig['routeList'] = routeList;
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Creates a route Object within the routeList Array
     * @param {string} path - The path of the new route
     * @param {Function} enterFunction - The Function that will be executed when the route is navigated to.
     * @param {Function} exitFunction - An option Function that will be executed when the route is navigated away from.
     * @returns {boolean} Returns true on success and false on error.
     */
    function addRoute(path, enterFunction, exitFunction = null) {
        try {
            if (typeof path !== 'string') {
                throw new Error(`Route 'path' must be a string`);
            }
            if (typeof enterFunction !== 'function') {
                throw new Error(`Route 'enterFunction' must be a function`);
            }
            if (typeof exitFunction !== 'function' && exitFunction !== null) {
                throw new Error(`Route 'exitFunction' must be a function`);
            }
            routerConfig['routeList'].push({
                path: path,
                enterFunction: enterFunction,
                exitFunction: exitFunction
            });
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Deletes all matching route Objects within the routeList Array based on input.
     * @param {string} path - The path of the route to be deleted.
     * @returns {boolean} Returns true on success and false on error.
     */
    function deleteRoute(path) {
        try {
            if (typeof path !== 'string') {
                throw new Error(`Route 'path' must be a string`);
            }
            for (let i = routerConfig['routeList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
                if (routerConfig['routeList'][i]['path'] === path) {
                    routerConfig['routeList'].splice(i, 1);
                }
            }
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Replaces and existing route Object within the routeList Array
     * @param {string} path - The path of the route to be replaced
     * @param {Function} newEnterFunction - The Function that will be executed when the route is navigated to.
     * @param {Function} newExitFunction - An option Function that will be executed when the route is navigated away from.
     * @returns {boolean} Returns true on success and false on error.
     */
    function replaceRoute(path, newEnterFunction, newExitFunction = null) {
        try {
            if (typeof path !== 'string') {
                throw new Error(`Route 'path' must be a string`);
            }
            if (typeof newEnterFunction !== 'function') {
                throw new Error(`Route 'newEnterFunction' must be a function`);
            }
            if (typeof newExitFunction !== 'function' && newExitFunction !== null) {
                throw new Error(`Route 'newExitFunction' must be a function`);
            }
            const index = routerConfig.routeList.findIndex(route => route['path'] === path);
            if (index === -1) {
                throw new Error(`The route does not exist in the routerConfig routeList.`);
            }
            routerConfig.routeList[index] = { path, enterFunction: newEnterFunction, exitFunction: newExitFunction };
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Sets the routeNotFound Object in the routerConfig Object
     * @param {RouteNotFound} options - An Object containing routeNotFound options
     * @returns {boolean} Returns true on success and false on error.
     */
    function setRouteNotFound(options) {
        try {
            if (!checkIsObject(options)) {
                throw new Error('Input must be an object.');
            }
            const { server, path, ...rest } = options;
            if (Object.keys(rest).length > 0) {
                throw new Error(`Unexpected properties provided: ${Object.keys(rest).join(', ')}`);
            }
            if (typeof server !== 'boolean') {
                throw new Error(`Provided value for 'server' must be a boolean.`);
            }
            if (typeof path !== 'string') {
                throw new Error(`Provided value for 'path' must be a string.`);
            }
            routerConfig['routeNotFound'] = { server, path };
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Sets the redirectList Array in the routerConfig Object
     * @param {RedirectList} redirectList - An Array containing redirectList Objects
     * @returns {boolean} Returns true on success and false on error.
     */
    function setRedirectList(redirectList) {
        try {
            if (!checkIsArray(redirectList)) {
                throw new Error(`The 'redirectList' must be an array.`);
            }
            for (let i = 0; i < redirectList.length; i++) {
                if (typeof redirectList[i]['fromPath'] !== 'string') {
                    throw new Error(`The fromPath at index '${i}'  must be a string.`);
                }
                if (typeof redirectList[i]['toPath'] !== 'string') {
                    throw new Error(`The toPath at index '${i}'  must be a string.`);
                }
            }
            routerConfig['redirectList'] = redirectList;
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Creates a redirect Object within the routeList Array
     * @param {string} fromPath - The path that should redirect from when targeted by navigation.
     * @param {string} toPath - The path that should be redirected to.
     * @returns {boolean} Returns true on success and false on error.
     */
    function addRedirect(fromPath, toPath) {
        try {
            if (typeof fromPath !== 'string') {
                throw new Error('The redirect fromPath must be a string');
            }
            if (typeof toPath !== 'string') {
                throw new Error('The redirect toPath must be a string');
            }
            routerConfig['redirectList'].push({
                fromPath: fromPath,
                toPath: toPath
            });
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Deletes all matching redirect Objects within the redirectList Array based on input.
     * @param {string} fromPath - The fromPath string that will be matched to determine which Object(s) to delete.
     * @returns {boolean} Returns true on success and false on error.
     */
    function deleteRedirect(fromPath) {
        try {
            if (typeof fromPath !== 'string') {
                throw new Error(`Route 'path' must be a string`);
            }
            for (let i = routerConfig['redirectList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
                if (routerConfig['redirectList'][i]['fromPath'] === fromPath) {
                    routerConfig['redirectList'].splice(i, 1);
                }
            }
            return true;
        } catch (er) {
            console.error(er);
            return false;
        }
    }

    /**
     * Returns an routerConfig Object.
     * @returns {RouterConfig}
     */
    function getRouterConfig() {
        return routerConfig;
    }

    /**
     * Returns the RouteList array.
     * @returns {RouteList}
     */
    function getRouteList() {
        return routerConfig['routeList'];
    }

    /**
     * Returns the RouteNotFound Object.
     * @returns {RouteNotFound}
     */
    function getRouteNotFound() {
        return routerConfig['routeNotFound'];
    }

    /**
     * Returns the RedirectList Object.
     * @returns {RedirectList}
     */
    function getRedirectList() {
        return routerConfig['redirectList'];
    }

    /**
     * Handles the routing logic. This is the core of the router.
     * @param {string} targetRoute - The route to navigate to.
     * @param {Set<string>} [visitedPaths=new Set()] - A set of paths that have already been visited to prevent infinite loops.
     * @returns {void}
     * @throws {Error} - If an error occurs during navigation.
     */
    async function navigateTo(targetRoute, visitedPaths = new Set()) {
        try {
            const exitFunction = activeRoute['exitFunction'];
            const routeList = routerConfig['routeList'];
            const routeNotFound = routerConfig['routeNotFound'];
            const redirectList = routerConfig['redirectList'];
            // If targetRoute is null 
            if (targetRoute === null) {
                targetRoute = window.location.pathname;
            }
            const sanitizedTargetRoute = sanitizePath(targetRoute);
            if (visitedPaths.size > 20) {
                console.error(`TUI Router: Maximum (20) redirects exceeded.`);
                visitedPaths.clear();
                return;
            }
            // Check for infinite route loop
            if (visitedPaths.has(sanitizedTargetRoute)) {
                console.error(`TUI Router: Infinite redirect detected for path: ${sanitizedTargetRoute}`); // DO NOT throw error or end execution as that would break loop testing.
                console.error(`Visited Paths: ${visitedPaths}`)
                visitedPaths.clear();
                navigateTo('/');
                return;
            }
            // If there is no history add update history (Initial page load)
            if (!history.state) {
                history.replaceState({}, '', sanitizedTargetRoute);
            }
            // If there is an exit function, execute it.
            if (exitFunction) {
                if (typeof exitFunction !== 'function') {
                    console.error(`TUI Router: The exitFunction value of this route MUST be a function.`); // Allows the error to be non blocking
                    return;
                }
                await exitFunction();
            }
            const discoveredRoute = routeList.find(route => route['path'] === sanitizedTargetRoute);
            const discoveredRedirect = redirectList.find(redirect => redirect['fromPath'] === sanitizedTargetRoute);
            if (discoveredRedirect) {
                visitedPaths.add(sanitizedTargetRoute);
                await navigateTo(discoveredRedirect['toPath'], visitedPaths);
                return;

            }
            // If route is found
            if (discoveredRoute) {
                const enterFunction = discoveredRoute['enterFunction']; // Attempts to store the route function
                if (typeof enterFunction !== 'function') {
                    console.error(`The enterFunction value of this route MUST be a function.`); // Allows the error to be non blocking
                    return;
                }
                await enterFunction(); // Call route function that corresponds to 'routeList' variable
                activeRoute = discoveredRoute;
                visitedPaths.clear();
                return;
            }
            history.pushState({}, '', sanitizedTargetRoute);
            // If no route is found
            if (routeNotFound['server'] === true) {
                window.location.href = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
                return;
            }
            visitedPaths.add(sanitizedTargetRoute);
            await navigateTo(routeNotFound['path'], visitedPaths);
            return;
        } catch (er) {
            console.error(`TUI Router: Route Handling Error`);
            console.error(er);
            return;
        }
    }

    //// UTILITY FUNCTIONS ////
    function handleClickEvent(event) {
        try {
            const anchor = event.target.closest('a'); // Find the closest <a> element
            if (anchor) {
                const href = anchor.getAttribute('href');
                const target = anchor.getAttribute('target');
                if (!href) {
                    throw new Error('Clicked link does not have an href attribute.')
                };
                // If the target matches the below ignore client side routing
                if (
                    href.startsWith('http://') ||
                    href.startsWith('https://') ||
                    href.startsWith('ftp://') ||
                    href.startsWith('file://') ||
                    href.startsWith('ws://') ||
                    href.startsWith('wss://') ||
                    href.startsWith('tel:') ||
                    href.startsWith('mailto:')
                ) {
                    return;
                }

                // If the URL begins with '#', ignore routing and call handleAnchorTag to scroll to link location on page
                if (href.startsWith('#')) {
                    event.preventDefault();
                    handleAnchorTag(href);
                    return;
                }

                // If the target is blank, routing is used to open the page in a new tab
                if (target === '_blank') {
                    event.preventDefault();
                    handleNewTab(href);
                    return;
                }

                event.preventDefault();
                navigateTo(href);
            }
            return;
        } catch (er) {
            console.error(`TUI Router: Event Listener Error`);
            console.error(er);
            return;
        }
    }

    /**
    * Allows the client side router to open a page in a new tab
    * @param {string} route - Path to the route
    * @returns  {void}
    * @throws {Error} - If an error occurs.
    */
    function handleNewTab(route) {
        try {
            const newTab = window.open('', '_blank');
            const newUrl = `${window.location.origin}${route}`;
            if (newTab) {
                newTab.location.href = newUrl;
            } else {
                throw new Error('Pop-up blocked or new tab could not be opened.');
            }
            return;
        } catch (er) {
            console.error(`TUI Router: New Tab Route Handling Error`);
            console.error(er);
            return;
        }
    }

    /**
     * Handles anchor tag routes
     * Scrolls to element into view smoothly
     * @param {string} href - URL 
     * @returns {void}
     * @throws {Error} - If an error occurs.
     */
    function handleAnchorTag(href) {
        try {
            let elmId = document.getElementById(href.slice(1));
            if (!elmId) {
                console.warn(`Anchor element not found for href: ${href}`);
                return;
            }
            elmId.scrollIntoView({ behavior: 'smooth' });
            return;
        } catch (er) {
            console.error(`TUI Router: Anchor Tag Handler Error`);
            console.error(er);
            return;
        }
    }

    /**
     * Removes trailing forward slashes from all paths except for the root path.
     * @param {string} path - Path 
     * @returns {string} - Returns path with trailing forward slashes removed.
     * @throws {Error} - If an error occurs.
     */
    function sanitizePath(path) {
        try {
            if (path === '/') {
                return '/';
            }
            return path.replace(/\/+$/, '');
        } catch (er) {
            console.error(`TUI Router: Path Sanitize Error`);
            console.error(er);
            return;
        }
    }

    return {
        startRouter,
        stopRouter,
        setRouteList,
        addRoute,
        deleteRoute,
        replaceRoute,
        setRouteNotFound,
        setRedirectList,
        addRedirect,
        deleteRedirect,
        getRouterConfig,
        getRouteList,
        getRouteNotFound,
        getRedirectList,
        navigateTo
    }
}
