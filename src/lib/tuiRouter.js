import { checkIsObject } from "tuijs-util";

/**
 * Starts the routing of a single page JavaScript application.
 * Intercepts navigation events in order to allow for client-side routing.
 * @param {Array} routeList - An array of objects consisting of route paths and their corresponding route functions.
 * @param {Array} redirectList - An array of objects consisting of route paths and their corresponding redirect target.
 * @returns {void}
 * @throws {Error} - Throws an error if an error occurs.
 */
export function routerStart(routeList, redirectList = null) {
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
    } catch (er) {
        throw new Error(`TUI Router: Parameter validation error: ${er.message}`);
    }
    // Click event
    document.addEventListener('click', function (event) {
        try {
            const anchor = event.target.closest('a'); // Find the closest <a> element
            if (anchor) {
                const href = anchor.getAttribute('href');
                const target = anchor.getAttribute('target');
                // If the client side route does not exist, send the request to the server.
                if (!routeList[href] && !redirectList[href]) {
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
                handleRoute(routeList, redirectList);
            }
            return;
        } catch (er) {
            throw new Error(`TUI Router: Link Handling Error: ${er.message}`);
        }
    });
    // Navigation Event
    window.onpopstate = function () {
        try {
            handleRoute(routeList, redirectList);
            return;
        } catch (er) {
            throw new Error(`TUI Router: Window Pop State Error: ${er.message}`);
        }
    };
    // Initial Route
    try {
        handleRoute(routeList, redirectList);
        return;
    } catch (er) {
        throw new Error(`TUI Router: Initial Route Error: ${er.message}`);
    }
}

/**
 * Handles the routing logic of a given list based on the new window location.
 * @param {RouteList} routeList 
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
function handleRoute(routeList, redirectList, visitedPaths = new Set()) {
    try {
        const path = sanitizePath(window.location.pathname);
        if (!history.state) { // Redirect to home path if there is no history (Initial page load)
            history.replaceState({}, '', path);
        }
        if (redirectList?.[path]) {
            if (visitedPaths.has(path)) {
                console.error(`Infinite redirect detected for path: ${path}`);
                history.pushState({}, '', '/');
                handleRoute(routeList, redirectList);
            }
            visitedPaths.add(path);
            const newPath = redirectList[path];
            history.pushState({}, '', newPath);
            handleRoute(routeList, redirectList, visitedPaths);
            return;
        }
        const routeFunction = routeList[path]; // Locates the path in the 'routeList' object
        if (routeFunction) { // If the route exists call route function
            routeFunction(); // Call route function that corresponds to 'routeHandler' variable
            visitedPaths.clear();
            return;
        }
        return;
    } catch (er) {
        throw new Error(`TUI Router: Route Handle Error: ${er.message}`)
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
        throw new Error(`TUI Router: New Tab Handler Error: ${er.message}`);
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
    try {
        if (path === '/') {
            return '/';
        }
        return path.replace(/\/+$/, '');
    } catch (er) {
        throw new Error(`TUI Router: Path Sanitize Error: ${er.message}`);
    }
}
