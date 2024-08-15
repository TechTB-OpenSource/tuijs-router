import { checkIsArray, checkIsObject } from "tuijs-util";

/**
 * @typedef {Object} RouteList - An object consisting of route paths and their corresponding route functions.
 * @property {string} route - The path of the desired server route.
 * @property {Function} routeFunction - The function to handle the route.
 * @property {Object<string, Function>} routes - A mapping of route paths to route functions.
 */

/**
 * @typedef {Array} RouteServer - A list of routes that will be directed to the server and not routed on the client.
 * @property {string} route - The path of the desired server route.
 * @property {Array<string>} serverRoutes - A list of server route strings.
 */

/**
 * @typedef {string} routeNotFound - The path to the 'route not found' page.
 */

/**
 * @typedef {Object} MetaData - A list of meta data attribute pairs.
 * @property {string} attributeKey - The key of the meta tag attribute.
 * @property {string} attributeValue - The value of the meta tag attribute.
 * @property {Array<Object.<string, string>>} attributes - A list of objects, where each object represents a single meta tag attribute key/value pair.
 */

/**
 * @typedef {Object} SiteRouteData - The site or route data object.
 * @property {string} title - The site or route title.
 * @property {MetaData[]} meta - The meta data for the site or route.
 */

/**
 * Starts the routing of a single page JavaScript application.
 * Intercepts navigation events in order to allow for client-side routing.
 * @param {RouteList} routeList - List of route paths and their corresponding route functions.
 * @param {Array<string>} routeServer - A list of routes that will be directed to the server and not routed on the client.
 * @param {routeNotFound} [routeNotFound=null] - The path to the 'route not found' page.
 * @returns {void}
 */
export function routerStart(routeList, routeServer, routeNotFound = 'null') {
    try {
        if (!checkIsObject(routeList)) {
            throw `The provided routeList list is not the type 'Object'.`;
        }
        if (!checkIsArray(routeServer)) {
            throw `The provided routeServer list is not the type 'Array'.`;
        }
        if (typeof routeNotFound !== 'string') {
            routeNotFound = '404';
        }
    } catch (er) {
        console.error(`TUI-Router: Validation error: ${er.message}`);
        return;
    }
    // Click event
    document.addEventListener('click', function (event) {
        try {
            if (event.target.tagName === 'A') {
                const href = event.target.getAttribute('href');
                const target = event.target.getAttribute('target');
                // Run server route checks
                if (handleServerRoute(href, routeServer)) {
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
                router(routeList, routeNotFound);
            }
        } catch (er) {
            throw new Error(`TUI-Router: Link handling error: ${er.message}`);
        }
    });
    // Navigation
    window.onpopstate = function () {
        try {
            router(routeList, routeNotFound);
        } catch (er) {
            throw new Error(`TUI-Router: Window onpopstate error: ${er.message}`)
        }
    };
    // Initial Route
    try {
        router(routeList, routeNotFound);
    } catch (er) {
        throw new Error(`TUI-Router: ${er.message}`)
    }
}

/**
 * Handles the routing of a given list of routes
 * @param {RouteList} routeList 
 * @param {routeNotFound} routeNotFound 
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
function router(routeList, routeNotFound) {
    try {
        if (routeNotFound === '' || routeNotFound === '/' || routeNotFound === null) {
            routeNotFound = '/404';
        }
        const path = window.location.pathname; // Collects current path
        if (!history.state) { // Redirect to home path if there is no history (Initial page load)
            history.replaceState({}, '', path);
        }
        const routeHandler = routeList[path]; // Locates the path in the 'routeList' object
        if (routeHandler) { // If the route exists call route function
            routeHandler(); // Call route function that corresponds to 'routeHandler' variable
            return;
        }
        window.location = routeNotFound; // If the route does not exist use 'routeNotFound' page
        return;
    } catch (er) {
        throw new Error(`TUI-Router: ${er.message}`)
    }
}

function handleServerRoute(href, routeServer) {
    try {
        // If the URL matches a server route, ignore client routing
        for (let i = 0; i < routeServer.length; i++) {
            if (routeServer[i] === href) {
                return true;
            }
        }
        // If the URL ends with '.html', ignore client routing
        if (href.endsWith('.html')) {
            return true;
        }
        // If the URL begins with 'http', 'https', ignore client routing
        if (href.startsWith('http://') || href.startsWith('https://')) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(`TUI-Router: Server Route Handler Error: ${er.message}`)
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
        throw new Error(`TUI-Router: New Tab Handler Error: ${er.message}`)
    }
}

function handleAnchorTag(href) {
    try {
        let elmId = document.getElementById(href.slice(1));
        if (elmId) {
            elmId.scrollIntoView({ behavior: "smooth" });
        }
        return;
    } catch (er) {
        throw new Error(`TUI-Router: Anchor Tag Handler Error: ${er.message}`)
    }
}
