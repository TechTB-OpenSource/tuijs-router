import { checkIsObject } from "tuijs-util";

/**
 * Starts the routing of a single page JavaScript application.
 * Intercepts navigation events in order to allow for client-side routing.
 * @param {Array} routeList - An array of objects consisting of route paths and their corresponding route functions.
 * @param {Array} redirectList - An array of objects consisting of route paths and their corresponding redirect target.
 * @returns {void}
 * @throws {Error} - Throws an error if an error occurs.
 */
export function routerStart(routeList, routeNotFound = { server: false, path: '/404' }, redirectList = null) {
    try {
        if (!checkIsObject(routeList)) {
            throw new Error(`The provided routeList list is not the type 'Object'.`);
        }
        Object.keys(routeList).forEach((key) => {
            if (typeof key !== "string") {
                throw new Error(`The provided route key "${key}" must be a string.`);
            }
            if (typeof routeList[key] !== "function") {
                throw new Error(`The provided route value for "${key}" must be a function.`);
            }
        });
        if (!checkIsObject(routeNotFound)) {
            throw new Error(`The provided routeNotFound variable is not the type 'Object'.`);
        }
        if (!routeNotFound.server || typeof routeNotFound.server !== "boolean") {
            throw new Error(`The provided routeNotFound key "server" is missing or is not the type "boolean".`);
        }
        if (!routeNotFound.path || typeof routeNotFound.path !== "string") {
            throw new Error(`The provided routeNotFound key "path" is missing or is not the type "string".`);
        }
        if (redirectList !== null) {
            if (!checkIsObject(redirectList)) {
                throw new Error(`The provided routeList list is not the type 'Object'.`);
            }
            Object.keys(redirectList).forEach((key) => {
                if (typeof key !== "string") {
                    throw new Error(`The provided route key "${key}" must be a string.`);
                }
                if (typeof redirectList[key] !== "string") {
                    throw new Error(`The provided route value for "${key}" must be a string.`);
                }
            });
        }
        addEventListeners(routeList, redirectList);
        // Initial route
        handleRoute(routeList, routeNotFound, redirectList);
        return;
    } catch (er) {
        console.error(`TUI Router: Initial Route Error`);
        console.error(er);
        return;
    }
}

function addEventListeners(routeList, routeNotFound, redirectList) {
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
                console.error(`TUI Router: Link Handling Error`);
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

function handleRouteNotFound(routeNotFound) {
    try {
        if (routeNotFound.server === true) {
            window.location = routeNotFound.path;
            return;
        }
        history.pushState({}, '', routeNotFound.path);
        return routeNotFound.path;
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

function createRoute({ path, handlerFunction, exitFunction = null }) {
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
        return {
            path,
            handlerFunction,
            exitFunction
        };
    } catch (er) {
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
