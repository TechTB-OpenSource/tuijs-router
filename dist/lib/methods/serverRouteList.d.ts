import type { ServerRouteList } from '../models.js';
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
 * Returns the ServerRouteList array.
 */
export declare function getServerRouteList(): ServerRouteList;
//# sourceMappingURL=serverRouteList.d.ts.map