import { checkIsArray, checkIsObject } from "tuijs-util";

/**
 * @typedef {Object} RouteList - An object consisting of route paths and their corresponding route functions.
 * @property {string} route - The path of the desired server route.
 * @property {Function} routeFunction - The function to handle the route.
 * @property {Object<string, Function>} routes - A mapping of route paths to route functions.
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
 * @param {routeNotFound} [routeNotFound='404'] - The path to the 'route not found' page.
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
export function routerStart(routeList, routeNotFound = '/404') {
    try {
        if (!checkIsObject(routeList)) {
            throw new Error(`The provided routeList list is not the type 'Object'.`);
        }
        if (typeof routeNotFound !== 'string' || routeNotFound === '' || routeNotFound === '/') {
            routeNotFound = '/404';
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
                // If the client side route does not exist, send the request to the server.
                if (!routeList[href]) {
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
                handleRoute(routeList, routeNotFound);
            }
            return;
        } catch (er) {
            throw new Error(`TUI-Router: Link handling error: ${er.message}`);
        }
    });
    // Navigation Event
    window.onpopstate = function () {
        try {
            handleRoute(routeList, routeNotFound);
            return;
        } catch (er) {
            throw new Error(`TUI-Router: Window onpopstate error: ${er.message}`)
        }
    };
    // Initial Route
    try {
        handleRoute(routeList, routeNotFound);
        return;
    } catch (er) {
        throw new Error(`TUI-Router: ${er.message}`)
    }
}

/**
 * Handles the routing logic of a given list based on the new window location.
 * @param {RouteList} routeList 
 * @param {routeNotFound} routeNotFound 
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
function handleRoute(routeList, routeNotFound) {
    try {
        const path = window.location.pathname; // Collects current path
        if (!history.state) { // Redirect to home path if there is no history (Initial page load)
            history.replaceState({}, '', path);
        }
        const routeFunction = routeList[path]; // Locates the path in the 'routeList' object
        if (routeFunction) { // If the route exists call route function
            routeFunction(); // Call route function that corresponds to 'routeHandler' variable
            return;
        }
        /**
         * If the route does not exist use 'routeNotFound' page.
         * This will typically not happen unless an empty route is provided in the 'routeList'.
         */
        window.location = routeNotFound;
        return;
    } catch (er) {
        throw new Error(`TUI-Router: ${er.message}`)
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
        throw new Error(`TUI-Router: Anchor Tag Handler Error: ${er.message}`)
    }
}
