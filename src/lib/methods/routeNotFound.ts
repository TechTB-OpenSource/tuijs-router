import type { RouteNotFound } from '../models.js';
import { routerConfig } from '../globals.js';

/**
 * Sets the routeNotFound Object in the routerConfig Object
 */
export function setRouteNotFound(routeNotFound: RouteNotFound): void {
    const { server, path, ...rest } = routeNotFound;
    routerConfig['routeNotFound'] = { server, path };
}

/**
 * Returns the RouteNotFound Object.
 */
export function getRouteNotFound(): RouteNotFound {
    return routerConfig['routeNotFound'];
}
