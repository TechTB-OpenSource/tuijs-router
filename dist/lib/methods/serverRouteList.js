import { routerConfig } from '../globals.js';
/**
 * Sets the routeListServer array in the routerConfig Object
 */
export function setServerRouteList(serverRouteList) {
    routerConfig['serverRouteList'] = serverRouteList;
}
/**
 * Creates a route Object within the serverRouteList Array
 */
export function addServerRoute(path) {
    if (!routerConfig['serverRouteList'].includes(path)) {
        routerConfig['serverRouteList'].push(path);
    }
}
/**
 * Deletes all matching route Objects within the serverRouteList Array.
 */
export function deleteServerRoute(path) {
    for (let i = routerConfig['serverRouteList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['serverRouteList'][i] === path) {
            routerConfig['serverRouteList'].splice(i, 1);
        }
    }
}
/**
 * Replaces an existing route Object within the serverRouteList Array.
 */
export function replaceServerRoute(oldPath, newPath) {
    for (let i = routerConfig['serverRouteList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['serverRouteList'][i] === oldPath) {
            routerConfig['serverRouteList'][i] = newPath;
        }
    }
}
/**
 * Returns the ServerRouteList array.
 */
export function getServerRouteList() {
    return routerConfig['serverRouteList'];
}
//# sourceMappingURL=serverRouteList.js.map