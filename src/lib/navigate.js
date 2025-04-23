import { routerConfig, activeRoute } from './globals.js';
import { findRoute, sanitizePath } from './utils.js';

/**
 * Handles the routing logic. This is the core of the router.
 * @param {string} targetRoute - The route to navigate to.
 * @param {Set<string>} [visitedPaths=new Set()] - A set of paths that have already been visited to prevent infinite loops.
 * @returns {void}
 */
export async function navigateTo(targetRoute, visitedPaths = new Set()) {
    try {
        const exitFunction = activeRoute.route?.exitFunction ?? null;
        const serverRouteList = routerConfig['serverRouteList'];
        const routeNotFound = routerConfig['routeNotFound'];
        const redirectList = routerConfig['redirectList'];
        // If targetRoute is null 
        const sanitizedTargetRoute = sanitizePath(targetRoute);
        if (visitedPaths.size > 20) {
            console.error(`Maximum (20) redirects exceeded.`);
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
        // If there is an exit export function, execute it.
        if (exitFunction) {
            if (typeof exitFunction !== 'function') {
                console.error(`The exitFunction value of this route MUST be a export function.`); // Allows the error to be non blocking
                return;
            }
            await exitFunction();
        }

        // If route not found path is explicitly called and the server boolean is true.
        // This prevents the dev from needing to add the route not found path to the server route list explicitly.
        if (sanitizedTargetRoute === routeNotFound['path'] && routeNotFound['server'] === true) {
            window.location.href = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
            return;
        }

        // If a route on the server route list is explicitly called.
        if (serverRouteList.includes(sanitizedTargetRoute)) {
            window.location.href = sanitizedTargetRoute; // Send request to server if route isn found and serverRouteList 
            return;
        }

        // If a matching redirect is discovered in a matching redirect list.
        const discoveredRedirect = redirectList.find(redirect => redirect['fromPath'] === sanitizedTargetRoute);
        if (discoveredRedirect) {
            visitedPaths.add(sanitizedTargetRoute);
            await navigateTo(discoveredRedirect['toPath'], visitedPaths);
            return;
        }

        const findRouteResults = findRoute(sanitizedTargetRoute)
        if (findRouteResults) {
            const { discoveredRoute, params } = findRouteResults;
            history.pushState({}, '', sanitizedTargetRoute);
            const enterFunction = discoveredRoute['enterFunction']; // Attempts to store the route export function
            if (typeof enterFunction !== 'function') {
                console.error(`The enterFunction value of this route MUST be a export function.`); // Allows the error to be non blocking
                return;
            }
            await enterFunction(params); // Call route export function that corresponds to 'routeList' variable
            activeRoute['route'] = discoveredRoute;
            visitedPaths.clear();
            if (params['anchor']) {
                navigateToAnchorTag(params['anchor']);
            }
            return;
        }
        // If no route is found
        if (routeNotFound['server'] === true) {
            window.location.href = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
            return;
        }
        visitedPaths.add(sanitizedTargetRoute);
        await navigateTo(routeNotFound['path'], visitedPaths);
        return;
    } catch (er) {
        console.error(`TUI Router Error: methods > navigateTo`);
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
export function navigateToNewTab(route) {
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
        console.error(`TUI Router Error: handlers > navigateToNewTab`);
        console.error(er);
        return;
    }
}

/**
 * Handles anchor tag routes
 * Scrolls to element into view smoothly
 * @param {string} anchor - URL 
 * @returns {void}
 */
export function navigateToAnchorTag(anchor) {
    try {
        let elmId = document.getElementById(anchor.slice(1));
        if (!elmId) {
            console.warn(`Anchor element not found for: ${anchor}`);
            return;
        }
        elmId.scrollIntoView({ behavior: 'smooth' });
        return;
    } catch (er) {
        console.error(`TUI Router Error: handlers > handleAnchorTag`);
        console.error(er);
        return;
    }
}
