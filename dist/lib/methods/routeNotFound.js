import { routerConfig } from '../globals.js';
/**
 * Sets the routeNotFound Object in the routerConfig Object.
 */
export function setRouteNotFound(routeNotFound) {
    const { server, path, ...rest } = routeNotFound;
    routerConfig['routeNotFound'] = { server, path };
}
/**
 * Returns the RouteNotFound Object.
 */
export function getRouteNotFound() {
    return routerConfig['routeNotFound'];
}
//# sourceMappingURL=routeNotFound.js.map