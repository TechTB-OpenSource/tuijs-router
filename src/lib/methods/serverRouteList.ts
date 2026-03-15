import type { ServerRouteList } from '../models.js';
import { routerConfig } from '../globals.js';

/**
 * Sets the routeListServer array in the routerConfig Object
 */
export function setServerRouteList(serverRouteList: ServerRouteList): void {
    routerConfig['serverRouteList'] = serverRouteList;
}

/**
 * Creates a route Object within the serverRouteList Array
 */
export function addServerRoute(path: string): void {
    routerConfig['serverRouteList'].push(path);
}

/**
 * Deletes all matching route Objects within the serverRouteList Array based on input.
 */
export function deleteServerRoute(path: string): void {
    for (let i = routerConfig['serverRouteList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['serverRouteList'][i] === path) {
            routerConfig['serverRouteList'].splice(i, 1);
        }
    }
}

// TO DO - Update add to overwrite if exists and remove this function.
/**
 * Replaces and existing route Object within the serverRouteList Array
 */
export function replaceServerRoute(oldPath: string, newPath: string): void {
    for (let i = routerConfig['serverRouteList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['serverRouteList'][i] === oldPath) {
            routerConfig['serverRouteList'][i] = newPath;
        }
    }
}

/**
 * Returns the ServerRouteList array.
 */
export function getServerRouteList(): ServerRouteList {
    return routerConfig['serverRouteList'];
}
