import { routerConfig } from "./globals.js";

export function findRoute(sanitizedTargetRoute) {
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
        console.error(`TUI Router Error: utils > findRoute`);
        console.error(er);
        return;
    }
}

export function matchRoute(testRoutePath, sanitizedTargetRoute) {
    try {
        const urlParams = {};
        const urlObj = new URL(sanitizedTargetRoute, window.location.origin);
        const queryParams = Object.fromEntries(urlObj.searchParams.entries());
        console.log(queryParams)
        const testRouteParts = testRoutePath.split('/');
        const targetRouteParts = sanitizedTargetRoute.split('/');
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
        const params = { ...urlParams, ...queryParams };
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
 * @returns {string} - Returns path with trailing forward slashes removed.
 * @throws {Error} - If an error occurs.
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
