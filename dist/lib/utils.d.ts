import type { RouteMatchResult, DiscoverClientRouteResult, DiscoveredServerRouteResult } from "./models.js";
/**
 * Attempts to find a sanitized target route within the router configuration object.
 * An object containing the matched route (`discoveredRoute`) and extracted parameters (`params`) if a match is found; otherwise, `null`.
 */
export declare function findClientRoute(sanitizedTargetRoute: string): DiscoverClientRouteResult | null;
export declare function findServerRoute(sanitizedTargetRoute: string): DiscoveredServerRouteResult | null;
/**
 * Attempts to match a test route pattern (e.g., "/user/:id") against a target route (e.g., "/user/123").
 * Extracts path parameters, query parameters, and hash if matched.
 */
export declare function matchRoute(testRoutePath: string, sanitizedTargetRoute: string): RouteMatchResult;
/**
 * Removes trailing forward slashes from all paths except for the root path.
 */
export declare function sanitizePath(path: string): string;
//# sourceMappingURL=utils.d.ts.map