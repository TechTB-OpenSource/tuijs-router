import { routerConfig } from "./globals.js";

/**
 * Attempts to find a sanitized target route within the router configuration object.
 * @param {string} sanitizedTargetRoute - The sanitized path to test against.
 * @returns {{ discoveredRoute: Object, params: Object } | null} 
 * An object containing the matched route (`discoveredRoute`) and extracted parameters (`params`) if a match is found; otherwise, `null`.
 */
export function findClientRoute(sanitizedTargetRoute) {
    try {
        const routeList = routerConfig['routeList'];
        for (let i = 0; i < routeList.length; i++) {
            const testRouteObject = routeList[i];
            const testRoutePath = routeList[i]['path'];
            const { matches, params } = matchRoute(testRoutePath, sanitizedTargetRoute);
            if (matches) {
                return { discoveredRoute: testRouteObject, params };
            }
        }
        return null;
    } catch (er) {
        console.error(`TUI Router Error: utils > findClientRoute`);
        console.error(er);
        return;
    }
}

export function findServerRoute(sanitizedTargetRoute) {
    try {
        const serverRouteList = routerConfig['serverRouteList'];
        for (let i = 0; i < serverRouteList.length; i++) {
            const { matches, params } = matchRoute(serverRouteList[i], sanitizedTargetRoute);
            if (matches) {
                return { discoveredRoute: serverRouteList[i], params };
            }
        }
        return null;
    } catch (er) {
        console.error(`TUI Router Error: utils > findServerRoute`);
        console.error(er);
        return;
    }
}

/**
 * Attempts to match a test route pattern (e.g., "/user/:id") against a target route (e.g., "/user/123").
 * Extracts path parameters, query parameters, and hash if matched.
 * @param {string} testRoutePath - The route pattern to match, potentially with dynamic segments (e.g., "/user/:id").
 * @param {string} sanitizedTargetRoute - The actual path to test against, already sanitized.
 * @returns {{ matches: boolean, params?: Object }} An object with a `matches` boolean and, if matched, a `params` object containing path, query, and hash parameters.
 */
export function matchRoute(testRoutePath, sanitizedTargetRoute) {
    try {
        const urlParams = {};
        const urlObj = new URL(sanitizedTargetRoute, window.location.origin);
        const queryParams = Object.fromEntries(urlObj.searchParams.entries());
        const hash = urlObj.hash
        const testRouteParts = testRoutePath.split('/');
        const targetRouteParts = urlObj.pathname.split('/');
        // Check if the path part counts are different. If so, then the routes don't match.
        if (testRouteParts.length !== targetRouteParts.length) {
            return { matches: false };
        }
        // Check each test path part
        for (let i = 0; i < testRouteParts.length; i++) {
            const testPart = testRouteParts[i];
            const targetPart = targetRouteParts[i];

            // If the test path part is dynamic (starts with :), move on to next loop cycle.
            if (testPart.startsWith(':')) {
                const paramName = testPart.slice(1);
                urlParams[paramName] = targetPart;
                continue;
            }
            // If a test path part and a target route path part do not match, then the route does not match.
            if (testPart !== targetPart) {
                return { matches: false };
            }
        }

        // If the test route passes all tests, true is returned.
        const params = { ...urlParams, ...queryParams, ...(hash ? { anchor: hash } : {}) };
        return { matches: true, params };
    } catch (er) {
        console.error(`TUI Router Error: utils > matchRoute`);
        console.error(er);
        return;
    }
}

/**
 * Removes trailing forward slashes from all paths except for the root path.
 * @param {string} path - Path 
 * @returns {string} - The sanitized path without trailing slashes, unless it's the root path.
 */
export function sanitizePath(path) {
    try {
        if (path === '/') {
            return '/';
        }
        return path.replace(/\/+$/, '');
    } catch (er) {
        console.error(`TUI Router Error: utils > sanitizePath`);
        console.error(er);
        return;
    }
}
