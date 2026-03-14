import type { Route, RouteList, RouteNotFound, ServerRouteList, Redirect, RedirectList, RouterConfig, StateData } from './models.js';
/**
 * Attaches window and document event listeners to start routing.
 */
export declare function startRouter(): void;
/**
 * Removes all event listeners to stop the router.
 */
export declare function stopRouter(): void;
/**
 * Sets the routeList array in the routerConfig Object
 */
export declare function setRouteList(newRouteList: RouteList): void;
/**
 * Creates a route Object within the routeList Array
 */
export declare function addRoute(newRoute: Route): void;
/**
 * Deletes all matching route Objects within the routeList Array based on input.
 */
export declare function deleteRoute(path: string): void;
/**
 * Sets the routeListServer array in the routerConfig Object
 */
export declare function setServerRouteList(serverRouteList: ServerRouteList): void;
/**
 * Creates a route Object within the serverRouteList Array
 */
export declare function addServerRoute(path: string): void;
/**
 * Deletes all matching route Objects within the serverRouteList Array based on input.
 */
export declare function deleteServerRoute(path: string): void;
/**
 * Replaces and existing route Object within the serverRouteList Array
 */
export declare function replaceServerRoute(oldPath: string, newPath: string): void;
/**
 * Sets the routeNotFound Object in the routerConfig Object
 */
export declare function setRouteNotFound(routeNotFound: RouteNotFound): void;
/**
 * Sets the redirectList Array in the routerConfig Object
 */
export declare function setRedirectList(redirectList: RedirectList): void;
/**
 * Creates a redirect Object within the routeList Array
 */
export declare function addRedirect(newRedirect: Redirect): void;
/**
 * Deletes all matching redirect Objects within the redirectList Array based on input.
 */
export declare function deleteRedirect(fromPath: string): void;
/**
 * Returns an routerConfig Object.
 */
export declare function getRouterConfig(): RouterConfig;
/**
 * Returns the RouteList array.
 */
export declare function getRouteList(): RouteList;
/**
 * Returns the ServerRouteList array.
 */
export declare function getServerRouteList(): ServerRouteList;
/**
 * Returns the RouteNotFound Object.
 */
export declare function getRouteNotFound(): RouteNotFound;
/**
 * Returns the RedirectList Object.
 */
export declare function getRedirectList(): RedirectList;
/**
 * Sets the stateData Object.
 */
export declare function setState(data: Record<string, unknown>): void;
/**
 * Returns the stateData Object.
 */
export declare function getState(): StateData;
/**
 * Clears the stateData Object.
 */
export declare function clearState(): void;
//# sourceMappingURL=methods.d.ts.map