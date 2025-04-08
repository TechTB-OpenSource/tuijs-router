import { tuiEvent } from "tuijs-event";

/**
 * Data Example
 * 
 * let routeList = [
 *      {
 *          path: '/',
 *          enterFunction: functionName,
 *          exitFunction: functionName,
 *      }
 * ]
 * 
 * let routeNotFound = [
 *      {
 *          server: false,
 *          path: '/404'
 *      }
 * ]
 * 
 * let redirectList = [
 *      {
 *          fromPath: '/old-path',
 *          toPath:  '/new-path'
 *      }
 * ]
 */

/**
 * @typedef {Object} Route
 * @property {string} path - The route path (e.g., '/about')
 * @property {function} handlerFunction - Function to run when the route matches
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
 * @property {RouteList}
 * @property {RouteNotFound}
 * @property {RedirectList}
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
     * Attaches window and document events for the router to function.
     * @returns {void}
     */
    function start() {
        eventInstance.addTrackedEvent(document, 'click', handleClickEvent); // Click Events
        eventInstance.addTrackedEvent(window, 'popstate', function () { navigateTo(null) }); // Navigation Events
        navigateTo(null); // Initial route
        return;
    }

    /**
     * Removes all event listeners to prevent stop the router.
     * @returns {void}
     */
    function stop() {
        eventInstance.removeAllTrackedEvents();
        return;
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
     * Validates input and creates a Route Object within the routeList
     * @param {Route} - A Route Object consisting of a path key/value pair, a handler Function key/value pair, and an optional exit Function key/value pair
     * @returns {Route}
     * @throws {Error} - Throws an error if an error occurs.
     */
    function addRoute(path, enterFunction, exitFunction = null) {
        try {
            if (typeof path !== 'string') {
                throw new Error("Route 'path' must be a string");
            }
            if (typeof enterFunction !== 'function') {
                throw new Error("Route 'enterFunction' must be a function");
            }
            if (typeof exitFunction !== 'function' && exitFunction !== null) {
                throw new Error("Route 'exitFunction' must be a function");
            }
            routerConfig['routeList'].push({
                path: path,
                enterFunction: enterFunction,
                exitFunction: exitFunction
            });
            return;
        } catch (er) {
            console.error(er);
            return;
        }
    }

    function deleteRoute(path) {
        try {
            if (typeof path !== 'string') {
                throw new Error("Route 'path' must be a string");
            }
            for (let i = routerConfig['routeList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
                if (routerConfig['routeList'][i]['path'] === path) {
                    routerConfig['routeList'].splice(i, 1);
                }
            }
        } catch (er) {
            console.error(er);
            return;
        }
    }

    function replaceRoute(path, newRouteFunction, newExitFunction = null) {
        try {
            if (typeof path !== 'string') {
                throw new Error("Route 'path' must be a string");
            }
            if (typeof newRouteFunction !== 'function') {
                throw new Error("Route 'newRouteFunction' must be a function");
            }
            if (typeof newExitFunction !== 'function' && newExitFunction !== null) {
                throw new Error("Route 'newExitFunction' must be a function");
            }
            deleteRoute(path);
            addRoute(path, newRouteFunction, newExitFunction);
            return;
        } catch (er) {
            console.error(er);
            return;
        }
    }

    function setRouteNotFound(boolean, path) {
        try {
            if (typeof boolean !== 'boolean') {
                throw new Error('Provided value for server directed route must be a boolean.');
            }
            if (typeof path !== 'string') {
                throw new Error('Provided path value must be a string.')
            }
            routerConfig['routeNotFound'] = {
                server: boolean,
                path: path
            }
            return;
        } catch (er) {
            console.error(er);
            return;
        }
    }

    function addRedirect(fromPath, toPath) {
        try {
            if (typeof fromPath !== 'string') {
                throw new Error("The redirect fromPath must be a string");
            }
            if (typeof toPath !== 'string') {
                throw new Error("The redirect toPath must be a string");
            }
            routerConfig['redirectList'].push({
                fromPath: fromPath,
                toPath: toPath
            });
            return;
        } catch (er) {
            console.error(er);
            return;
        }
    }


    function deleteRedirect(fromPath) {
        try {
            if (typeof fromPath !== 'string') {
                throw new Error("Route 'path' must be a string");
            }
            for (let i = routerConfig['redirectList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
                if (routerConfig['redirectList'][i]['fromPath'] === fromPath) {
                    routerConfig['redirectList'].splice(i, 1);
                }
            }
            return;
        } catch (er) {
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
     * Handles the routing logic of a given list based on the new window location.
     * @param {RouteList} routeList 
     * @returns {void}
     * @throws {Error} - If an error occurs.
     */
    function navigateTo(targetRoute, visitedPaths = new Set()) {
        try {
            const exitFunction = activeRoute['exitFunction'];
            const routeList = routerConfig['routeList'];
            const routeNotFound = routerConfig['routeNotFound'];
            const redirectList = routerConfig['redirectList'];
            // If targetRoute is null 
            if (targetRoute === null) {
                targetRoute = sanitizePath(window.location.pathname);
            }
            // Check for infinite route loop
            if (visitedPaths.has(targetRoute)) {
                console.error(`Infinite redirect detected for path: ${targetRoute}`); // DO NOT throw error or end execution as that would break loop testing.
                visitedPaths.clear();
                navigateTo('/');
                return;
            }
            // If there is no history add update history (Initial page load)
            if (!history.state) {
                history.replaceState({}, '', targetRoute);
            } else {
                history.pushState({}, '', targetRoute);
            }
            // If there is an exit function, execute it.
            if (exitFunction && typeof exitFunction === 'function') {
                exitFunction();
            }
            const discoveredRoute = routeList.find(route => route['path'] === targetRoute);
            const discoveredRedirect = redirectList.find(redirect => redirect['fromPath'] === targetRoute);
            if (discoveredRedirect) {
                visitedPaths.add(targetRoute);
                navigateTo(discoveredRedirect['toPath'], visitedPaths);
                return;

            }
            // If route is found
            if (discoveredRoute) {
                const enterFunction = discoveredRoute['enterFunction']; // Attempts to store the route function
                if (typeof enterFunction !== 'function') {
                    throw new Error(`The enterFunction value of this route MUST be a function.`);
                }
                enterFunction(); // Call route function that corresponds to 'routeList' variable
                activeRoute = discoveredRoute;
                visitedPaths.clear();
                return;
            }
            // If no route is found
            if (routeNotFound['server'] === true) {
                window.location = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
                return;
            }
            visitedPaths.add(targetRoute);
            navigateTo(routeNotFound['path'], visitedPaths);
            return;
        } catch (er) {
            console.error(`TUI Router: Route Handling Error`);
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
            newTab.location.href = newUrl;
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
            if (elmId) {
                elmId.scrollIntoView({ behavior: "smooth" });
            }
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
        start,
        stop,
        getRouterConfig,
        getRouteList,
        getRouteNotFound,
        getRedirectList,
        addRoute,
        deleteRoute,
        replaceRoute,
        setRouteNotFound,
        addRedirect,
        deleteRedirect,
        navigateTo
    }
}