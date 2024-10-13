import { checkIsObject } from "tuijs-util";

/**
 * @typedef {Object} RouteList - An object consisting of route paths and their corresponding route functions.
 * @property {string} route - The path of the desired server route.
 * @property {Function} routeFunction - The function to handle the route.
 * @property {Object<string, Function>} routes - A mapping of route paths to route functions.
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
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
export function routerStartV2(RouteListObject) {
    let routeList = {};
    addRoute(RouteListObject);
    // Click event listener
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
                handleRoute();
            }
            return;
        } catch (er) {
            throw new Error(`TUI Router: Link handling error: ${er.message}`);
        }
    });
    // Navigation Event
    window.onpopstate = function () {
        try {
            handleRoute();
            return;
        } catch (er) {
            throw new Error(`TUI Router: Window onpopstate error: ${er.message}`)
        }
    };
    // Initial Route
    try {
        handleRoute();
    } catch (er) {
        throw new Error(`TUI Router: ${er.message}`)
    }

    /**
     * Handles the routing logic of a given list based on the new window location.
     * @returns {void}
     * @throws {Error} - If an error occurs.
     */
    function handleRoute() {
        try {
            const path = sanitizePath(window.location.pathname); 
            if (!history.state) { // Redirect to home path if there is no history (Initial page load)
                history.replaceState({}, '', path);
            }
            const routeFunction = routeList[path]; // Locates the path in the 'routeList' object
            if (routeFunction) { // If the route exists call route function
                routeFunction(); // Call route function that corresponds to 'routeHandler' variable
                return;
            }
            return;
        } catch (er) {
            throw new Error(`TUI Router: ${er.message}`)
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
            throw new Error(`TUI Router: New Tab Handler Error: ${er.message}`)
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
            throw new Error(`TUI Router: Anchor Tag Handler Error: ${er.message}`);
        }
    }

    function sanitizePath(path) {
        return;
        return path.replace(/\/+$/, ''); // Remove trailing slashes
    }

    function addRoute(routeObject) {
        try {
            if (!checkIsObject(routeObject)) {
                throw new Error(`The provided route is not an Object.`);
            }
            Object.keys(routeObject).forEach((key) => {
                if (typeof key !== "string") {
                    throw new Error(`The provided route key "${key}" must be a string.`);
                }
                if (typeof routeObject[key] !== "function") {
                    throw new Error(`The provided route value for "${key}" must be a function.`);
                }
            });
            Object.assign(routeList, routeObject);
            return;
        } catch (er) {
            throw new Error(`TUI Router: Add Route Error: ${er.message}`);
        }
    }

    function removeRoute(route) {
        try {
            if (typeof route !== 'string') {
                throw new Error(`The provided route "${route}" must be a string.`);
            }
            if (routeList[route]) {
                delete routeList[route];
            }
            return;
        } catch (er) {
            throw new Error(`TUI Router: Remove Route Error: ${er.message}`);
        }
    }

    return {
        addRoute,
        removeRoute
    }
}
