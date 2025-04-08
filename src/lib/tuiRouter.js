/**
 * let routeList = [
 *      {
 *          path: '/',
 *          routeFunction: functionName,
 *          exitFunction: functionName,
 *      }
 * [
 * 
 * let routeNotFound = [
 *      {
 *          server: false,
 *          path: '/404'
 *      }
 * [
 * 
 * let redirectList = [
 *      {
 *          fromPath: '/old-path',
 *          toPath:  '/new-path'
 *      }
 * [
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

function createRouter() {
    /**
     * @type {RouterConfig}
     */
    let routerConfig = {
        routeList: [],
        routeNotFound: { server: false, path: '/404' },
        redirectList: []
    }

    //// DEV FUNCTIONS ////

    /**
     * Starts the routing of a single page JavaScript application.
     * Intercepts navigation events in order to allow for client-side routing.
     * @param {routerConfig}
     * @returns {void}
     * @throws {Error} - Throws an error if an error occurs.
     */
    function routerStart() {
        try {
            const routeList = routerConfig['routeList'];
            const routeNotFound = routerConfig['routeNotFound'];
            const redirectList = routerConfig['redirectList'];
            attachEventListeners(routeList, redirectList);
            // Initial route
            handleRoute(routeList, routeNotFound, redirectList);
            return;
        } catch (er) {
            console.error(`TUI Router: Router start error`);
            console.error(er);
            return;
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
     * Validates input and creates a Route Object within the routeList
     * @param {Route} - A Route Object consisting of a path key/value pair, a handler Function key/value pair, and an optional exit Function key/value pair
     * @returns {Route}
     * @throws {Error} - Throws an error if an error occurs.
     */
    function addRoute(path, handlerFunction, exitFunction = null) {
        try {
            if (typeof path !== 'string') {
                throw new Error("Route 'path' must be a string");
            }
            if (typeof handlerFunction !== 'function') {
                throw new Error("Route 'handlerFunction' must be a function");
            }
            if (typeof exitFunction !== 'function' && exitFunction !== null) {
                throw new Error("Route 'exitFunction' must be a function");
            }
            routerConfig['routeList'].push({
                path: path,
                handlerFunction: handlerFunction,
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
    function attachEventListeners(routeList, routeNotFound, redirectList) {
        try {
            // Event listener for click event
            document.addEventListener('click', function (event) {
                try {
                    const anchor = event.target.closest('a'); // Find the closest <a> element
                    if (anchor) {
                        const href = anchor.getAttribute('href');
                        const target = anchor.getAttribute('target');
                        // If the target is '_self' or the link is an outside link, ignore client side routing
                        if (
                            target === '_self' ||
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
                        // If the URL begins with '#', ignore routing and scroll to link location on page
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
                        history.pushState({}, '', href);
                        handleRoute(routeList, routeNotFound, redirectList);
                    }
                    return;
                } catch (er) {
                    console.error(`TUI Router: Event Listener Error`);
                    console.error(er);
                    return;
                }
            });
            // Navigation Event
            window.onpopstate = function () {
                try {
                    handleRoute(routeList, routeNotFound, redirectList);
                    return;
                } catch (er) {
                    console.error(`TUI Router: Window Pop State Error`);
                    console.error(er);
                    return;
                }
            };
        } catch (er) {
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
    function handleRoute(routeList, routeNotFound, redirectList, visitedPaths = new Set()) {
        try {
            let path = sanitizePath(window.location.pathname);
            // If there is no history add update history (Initial page load)
            if (!history.state) {
                history.replaceState({}, '', path);
            }
            // If the client side route does not exist, use route not found handler.
            if (!routeList[path] && !redirectList?.[path]) {
                path = handleRouteNotFound(routeNotFound);
            }
            // Check for infinite route loop
            if (redirectList?.[path]) {
                if (visitedPaths.has(path)) {
                    console.error(`Infinite redirect detected for path: ${path}`);
                    history.pushState({}, '', '/');
                    handleRoute(routeList, routeNotFound, redirectList);
                }
                visitedPaths.add(path);
                const newPath = redirectList[path];
                history.pushState({}, '', newPath);
                handleRoute(routeList, routeNotFound, redirectList, visitedPaths);
                return;
            }
            // If route is found and all validation is good, run client side route function.
            const routeFunction = routeList[path]; // Locates the path in the 'routeList' object
            if (routeFunction) { // If the route exists call route function
                routeFunction(); // Call route function that corresponds to 'routeList' variable
                visitedPaths.clear();
                return;
            }
            return;
        } catch (er) {
            console.error(`TUI Router: Route Handling Error`);
            console.error(er);
            return;
        }
    }

    function handleRouteNotFound(routeNotFoundObject) {
        try {
            if (routeNotFoundObject['server'] === true) {
                window.location = routeNotFoundObject['path'];
                return;
            }
            history.pushState({}, '', routeNotFoundObject['path']);
            return routeNotFoundObject['path'];
        } catch (er) {
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
        routerStart,
        getRouterConfig,
        getRouteList,
        getRouteNotFound,
        getRedirectList,
        addRoute,
        deleteRoute,
        setRouteNotFound,
        addRedirect,
        deleteRedirect
    }
}