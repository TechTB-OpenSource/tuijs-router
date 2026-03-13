import type { Route, RouteNotFound, Redirect, RedirectList, DiscoverClientRouteResult, DiscoveredServerRouteResult } from './models.js';
import { routerConfig, activeRoute, stateData } from './globals.js';
import { findClientRoute, findServerRoute, sanitizePath } from './utils.js';

/**
 * Handles the routing logic. This is the core of the router.
 */
export async function navigateTo(targetRoute: string, data: Record<string, any> | null = null, visitedPaths: Set<string> = new Set()): Promise<void> {
    Object.keys(stateData).forEach(key => delete stateData[key]);
    const exitFunction: Function | null = activeRoute.route?.exitFunction ?? null;
    const routeNotFound: RouteNotFound = routerConfig['routeNotFound'];
    const redirectList: RedirectList = routerConfig['redirectList'];
    const sanitizedTargetRoute: string = sanitizePath(targetRoute);
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
        console.error(`Visited Paths: ${visitedPaths}`)
        visitedPaths.clear();
        navigateTo('/');
        return;
    }

    // If already on the target route, update current entry (initial load)
    // If navigating to a different route, create new entry
    const currentPath: string = window.location.pathname + window.location.search + window.location.hash;
    const isCurrentRoute: boolean = currentPath === sanitizedTargetRoute;
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
    const findServerRouteResults: DiscoveredServerRouteResult | null = findServerRoute(sanitizedTargetRoute)
    if (findServerRouteResults) {
        window.location.href = sanitizedTargetRoute; // Send request to server if route isn found and serverRouteList 
        return;
    }

    // If a matching redirect is discovered in a matching redirect list.
    const discoveredRedirect: Redirect | undefined = redirectList.find(redirect => redirect['fromPath'] === sanitizedTargetRoute);
    if (discoveredRedirect) {
        visitedPaths.add(sanitizedTargetRoute);
        navigateTo(discoveredRedirect['toPath'], data, visitedPaths);
        return;
    }

    const findClientRouteResults: DiscoverClientRouteResult | null = findClientRoute(sanitizedTargetRoute)
    if (findClientRouteResults) {
        const { discoveredRoute, params }: DiscoverClientRouteResult = findClientRouteResults;
        history.pushState({}, '', sanitizedTargetRoute);
        const enterFunction: Function = discoveredRoute['enterFunction']; // Attempts to store the route export function
        await enterFunction(params); // Call route export function that corresponds to 'routeList' variable
        activeRoute['route'] = discoveredRoute;
        visitedPaths.clear();
        if (params && params['anchor']) {
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
    navigateTo(routeNotFound['path'], data, visitedPaths);
}

/**
* Allows the client side router to open a page in a new tab
*/
export function navigateToNewTab(route: string): void {
    const newTab: Window | null = window.open('', '_blank');
    const newUrl: string = `${window.location.origin}${route}`;
    if (newTab) {
        newTab.location.href = newUrl;
    } else {
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
    try {
        let elmId = document.getElementById(anchor.slice(1));
        if (!elmId) {
            console.warn(`Anchor element not found for: ${anchor}`);
            return;
        }
        elmId.scrollIntoView({ behavior: 'smooth' });
        return;
    } catch (er) {
        console.error(`TUI Router Error: navigate > navigateToAnchorTag`);
        console.error(er);
        return;
    }
}

/**
 * Navigates back to the previous page or to the root if no referrer exists.
 * Uses the browser's history API and delegates to navigateTo to maintain router state.
 * @returns {void}
 */
export function navigateBack() {
    try {
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
        } else {
            // No history available, go to root
            navigateTo('/');
        }
    } catch (er) {
        console.error(`TUI Router Error: navigate > navigateBack`);
        console.error(er);
        // Fallback to root page
        navigateTo('/');
    }
}
