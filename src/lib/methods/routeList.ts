import type { Route, RouteList } from '../models.js';
import { routerConfig } from '../globals.js';

/**
 * Sets the entire routeList array in the routerConfig Object, overwriting any existing routeList.
 */
export function setRouteList(newRouteList: RouteList): void {
    for (let i = 0; i < newRouteList.length; i++) {
        const { path, enterFunction, exitFunction, ...rest } = newRouteList[i];
        if (Object.keys(rest).length > 0) {
            throw new Error(`Unexpected properties provided at index ${i}: ${Object.keys(rest).join(', ')}`);
        }
        if (typeof newRouteList[i]['path'] !== 'string') {
            throw new Error(`The route path at index ${i}  must be a string.`);
        }
        if (typeof newRouteList[i]['enterFunction'] !== 'function') {
            throw new Error(`The route enterFunction at index ${i} must be a function.`);
        }
        if (typeof newRouteList[i]['exitFunction'] !== 'function' && exitFunction !== null && exitFunction !== undefined) {
            throw new Error(`The route exitFunction at index ${i} must be a function or null.`);
        }
    }
    routerConfig['routeList'] = newRouteList;
}

/**
 * Creates a route Object within the routeList Array.
 * If a route with the same path already exists, it is overwritten with the new route Object.
 */
export function addRoute(newRoute: Route): void {
    const index = routerConfig.routeList.findIndex(route => route['path'] === newRoute.path);
    if (index !== -1) {
        routerConfig.routeList[index] = newRoute;
        return;
    }
    routerConfig['routeList'].push(newRoute);
}

/**
 * Deletes all matching route Objects within the routeList Array.
 */
export function deleteRoute(path: string): void {
    for (let i = routerConfig['routeList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['routeList'][i]['path'] === path) {
            routerConfig['routeList'].splice(i, 1);
        }
    }
}

/**
 * Returns the RouteList array.
 */
export function getRouteList(): RouteList {
    return routerConfig['routeList'];
}
