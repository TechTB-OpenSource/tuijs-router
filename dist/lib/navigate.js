import { routerConfig, activeRoute, stateData } from './globals.js';
import { findClientRoute, findServerRoute, sanitizePath } from './utils.js';
/**
 * Handles the routing logic. This is the core of the router.
 */
export async function navigateTo(targetRoute, data = null, visitedPaths = new Set()) {
    Object.keys(stateData).forEach(key => delete stateData[key]);
    const exitFunction = activeRoute.route?.exitFunction ?? null;
    const routeNotFound = routerConfig['routeNotFound'];
    const redirectList = routerConfig['redirectList'];
    const sanitizedTargetRoute = sanitizePath(targetRoute);
    if (data !== null) {
        Object.assign(stateData, data);
    }
    if (visitedPaths.size > 20) {
        console.error(`Maximum (20) redirects exceeded.`);
        visitedPaths.clear();
        return;
    }
    // Check for infinite route loop
    if (visitedPaths.has(sanitizedTargetRoute)) {
        console.error(`TUI Router: Infinite redirect detected for path: ${sanitizedTargetRoute}`); // DO NOT throw error or end execution as that would break loop testing.
        console.error(`Visited Paths: ${visitedPaths}`);
        visitedPaths.clear();
        navigateTo('/');
        return;
    }
    // If already on the target route, update current entry (initial load)
    // If navigating to a different route, create new entry
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    const isCurrentRoute = currentPath === sanitizedTargetRoute;
    if (isCurrentRoute && !history.state && history.length <= 1) {
        history.replaceState({}, '', sanitizedTargetRoute);
    }
    // If there is an exit export function, execute it.
    if (exitFunction) {
        await exitFunction();
    }
    // If route not found path is explicitly called and the server boolean is true.
    // This prevents the dev from needing to add the route not found path to the server route list explicitly.
    if (sanitizedTargetRoute === routeNotFound['path'] && routeNotFound['server'] === true) {
        window.location.href = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
        return;
    }
    // If a route on the server route list is explicitly called.
    const findServerRouteResults = findServerRoute(sanitizedTargetRoute);
    if (findServerRouteResults) {
        window.location.href = sanitizedTargetRoute; // Send request to server if route isn found and serverRouteList 
        return;
    }
    // If a matching redirect is discovered in a matching redirect list.
    const discoveredRedirect = redirectList.find(redirect => redirect['fromPath'] === sanitizedTargetRoute);
    if (discoveredRedirect) {
        visitedPaths.add(sanitizedTargetRoute);
        navigateTo(discoveredRedirect['toPath'], data, visitedPaths);
        return;
    }
    const findClientRouteResults = findClientRoute(sanitizedTargetRoute);
    if (findClientRouteResults) {
        const { discoveredRoute, params } = findClientRouteResults;
        history.pushState({}, '', sanitizedTargetRoute);
        const enterFunction = discoveredRoute['enterFunction']; // Attempts to store the route export function
        await enterFunction(params); // Call route export function that corresponds to 'routeList' variable
        activeRoute['route'] = discoveredRoute;
        visitedPaths.clear();
        if (params && params['anchor']) {
            navigateToAnchorTag(params['anchor']);
        }
        return;
    }
    // If no route is found
    // TO DO - Check this again after testing, may be redundant.
    if (routeNotFound['server'] === true) {
        window.location.href = routeNotFound['path']; // Send request to server if route isn't found and routeNotFound 
        return;
    }
    visitedPaths.add(sanitizedTargetRoute);
    navigateTo(routeNotFound['path'], data, visitedPaths);
}
/**
* Allows the client side router to open a page in a new tab
*/
export function navigateToNewTab(route) {
    const newTab = window.open('', '_blank');
    const newUrl = `${window.location.origin}${route}`;
    if (newTab) {
        newTab.location.href = newUrl;
    }
    else {
        throw new Error('Pop-up blocked or new tab could not be opened.');
    }
}
/**
 * Handles anchor tag routes
 * Scrolls to element into view smoothly
 * @param {string} anchor - URL
 * @returns {void}
 */
export function navigateToAnchorTag(anchor) {
    let element = document.getElementById(anchor.slice(1));
    if (!element) {
        console.warn(`TUI Router Warning: Anchor tag with id '${anchor.slice(1)}' not found.`);
        return;
    }
    element.scrollIntoView({ behavior: 'smooth' });
}
/**
 * Navigates back to the previous page or to the root if no referrer exists.
 * Uses the browser's history API and delegates to navigateTo to maintain router state.
 */
export function navigateBack() {
    // Check if there's any history to go back to
    if (window.history.length > 1) {
        // Use a temporary popstate listener to capture where we're going
        const handlePopState = () => {
            window.removeEventListener('popstate', handlePopState);
            const currentPath = location.pathname + location.search + location.hash;
            // Use navigateTo to ensure all router state management happens
            navigateTo(currentPath);
        };
        window.addEventListener('popstate', handlePopState);
        window.history.back();
        return;
    }
    // No history available, go to root
    navigateTo('/');
}
//# sourceMappingURL=navigate.js.map