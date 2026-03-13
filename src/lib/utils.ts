import type { Route, RouteList, RouteMatchResult, ServerRouteList, DiscoverClientRouteResult, DiscoveredServerRouteResult } from "./models.js";
import { routerConfig } from "./globals.js";

/**
 * Attempts to find a sanitized target route within the router configuration object.
 * An object containing the matched route (`discoveredRoute`) and extracted parameters (`params`) if a match is found; otherwise, `null`.
 */
export function findClientRoute(sanitizedTargetRoute: string): DiscoverClientRouteResult | null {
    const routeList: RouteList = routerConfig['routeList'];
    for (let i = 0; i < routeList.length; i++) {
        const testRouteObject: Route = routeList[i];
        const testRoutePath: string = routeList[i]['path'];
        const { matches, params }: RouteMatchResult = matchRoute(testRoutePath, sanitizedTargetRoute);
        if (matches) {
            return { discoveredRoute: testRouteObject, params } as DiscoverClientRouteResult;
        }
    }
    return null;
}

export function findServerRoute(sanitizedTargetRoute: string): DiscoveredServerRouteResult | null {
    const serverRouteList: ServerRouteList = routerConfig['serverRouteList'];
    for (let i = 0; i < serverRouteList.length; i++) {
        const { matches, params }: RouteMatchResult = matchRoute(serverRouteList[i], sanitizedTargetRoute);
        if (matches) {
            return { discoveredRoute: serverRouteList[i], params } as DiscoveredServerRouteResult;
        }
    }
    return null;
}

/**
 * Attempts to match a test route pattern (e.g., "/user/:id") against a target route (e.g., "/user/123").
 * Extracts path parameters, query parameters, and hash if matched.
 */
export function matchRoute(testRoutePath: string, sanitizedTargetRoute: string): RouteMatchResult {
    const urlParams: Record<string, any> = {};
    const urlObj: URL = new URL(sanitizedTargetRoute, window.location.origin);
    const queryParams: Record<string, any> = Object.fromEntries(urlObj.searchParams.entries());
    const hash: string = urlObj.hash
    const testRouteParts: string[] = testRoutePath.split('/');
    const targetRouteParts: string[] = urlObj.pathname.split('/');
    // Check if the path part counts are different. If so, then the routes don't match.
    if (testRouteParts.length !== targetRouteParts.length) {
        return { matches: false };
    }
    // Check each test path part
    for (let i = 0; i < testRouteParts.length; i++) {
        const testPart: string = testRouteParts[i];
        const targetPart: string = targetRouteParts[i];

        // If the test path part is dynamic (starts with :), move on to next loop cycle.
        if (testPart.startsWith(':')) {
            const paramName: string = testPart.slice(1);
            urlParams[paramName] = targetPart;
            continue;
        }
        // If a test path part and a target route path part do not match, then the route does not match.
        if (testPart !== targetPart) {
            return { matches: false };
        }
    }

    // If the test route passes all tests, true is returned.
    const params: Record<string, any> = { ...urlParams, ...queryParams, ...(hash ? { anchor: hash } : {}) };
    return { matches: true, params } as RouteMatchResult;
}

/**
 * Removes trailing forward slashes from all paths except for the root path.
 */
export function sanitizePath(path: string): string {
    if (path === '/') {
        return '/';
    }
    return path.replace(/\/+$/, '');
}
