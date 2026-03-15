import type { Route, RouteList } from '../models.js';
/**
 * Sets the routeList array in the routerConfig Object
 */
export declare function setRouteList(newRouteList: RouteList): void;
/**
 * Creates a route Object within the routeList Array
 * If a route with the same path already exists, it is overwritten with the new route Object.
 */
export declare function addRoute(newRoute: Route): void;
/**
 * Deletes all matching route Objects within the routeList Array based on input.
 */
export declare function deleteRoute(path: string): void;
/**
 * Returns the RouteList array.
 */
export declare function getRouteList(): RouteList;
//# sourceMappingURL=routeList.d.ts.map