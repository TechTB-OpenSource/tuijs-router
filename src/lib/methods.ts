import type {
    Route,
    RouteList,
    RouteNotFound,
    ServerRouteList,
    Redirect,
    RedirectList,
    RouterConfig,
    StateData
} from './models.js';

import { eventInstance, routerConfig, stateData } from './globals.js';
import { handleClickEvent } from './handlers.js';
import { navigateTo } from "./navigate.js";


/**
 * Attaches window and document event listeners to start routing.
 */
export function startRouter(): void {
    eventInstance.addTrackedEvent(document, 'click', handleClickEvent); // Click Events
    eventInstance.addTrackedEvent(window, 'popstate', function () { navigateTo(location.pathname + location.search + location.hash) }); // Navigation Events
    navigateTo(location.pathname + location.search + location.hash); // Initial route
}

/**
 * Removes all event listeners to stop the router.
 */
export function stopRouter(): void {
    eventInstance.removeAllTrackedEvents();
}

/**
 * Sets the routeList array in the routerConfig Object
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
 * Creates a route Object within the routeList Array
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
 * Deletes all matching route Objects within the routeList Array based on input.
 */
export function deleteRoute(path: string): void {
    for (let i = routerConfig['routeList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['routeList'][i]['path'] === path) {
            routerConfig['routeList'].splice(i, 1);
        }
    }
}

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
 * Sets the routeNotFound Object in the routerConfig Object
 */
export function setRouteNotFound(routeNotFound: RouteNotFound): void {
    const { server, path, ...rest } = routeNotFound;
    routerConfig['routeNotFound'] = { server, path };
}

/**
 * Sets the redirectList Array in the routerConfig Object
 */
export function setRedirectList(redirectList: RedirectList): void {
    routerConfig['redirectList'] = redirectList;
}

/**
 * Creates a redirect Object within the routeList Array
 */
export function addRedirect(newRedirect: Redirect): void {
    const index = routerConfig.redirectList.findIndex(redirect => redirect['fromPath'] === newRedirect.fromPath);
    if (index !== -1) {
        routerConfig.redirectList[index] = newRedirect;
        return;
    }
    routerConfig['redirectList'].push(newRedirect);
}

/**
 * Deletes all matching redirect Objects within the redirectList Array based on input.
 */
export function deleteRedirect(fromPath: string) {
    for (let i = routerConfig['redirectList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['redirectList'][i]['fromPath'] === fromPath) {
            routerConfig['redirectList'].splice(i, 1);
        }
    }
}

/**
 * Returns an routerConfig Object.
 */
export function getRouterConfig(): RouterConfig {
    return routerConfig;
}

/**
 * Returns the RouteList array.
 */
export function getRouteList(): RouteList {
    return routerConfig['routeList'];
}

/**
 * Returns the ServerRouteList array.
 */
export function getServerRouteList(): ServerRouteList {
    return routerConfig['serverRouteList'];
}

/**
 * Returns the RouteNotFound Object.
 */
export function getRouteNotFound(): RouteNotFound {
    return routerConfig['routeNotFound'];
}

/**
 * Returns the RedirectList Object.
 */
export function getRedirectList(): RedirectList {
    return routerConfig['redirectList'];
}

/**
 * Sets the stateData Object.
 */
export function setState(data: Record<string, unknown>): void {
    Object.keys(stateData).forEach(key => delete stateData[key]);
    Object.assign(stateData, data);
}

/**
 * Returns the stateData Object.
 */
export function getState(): StateData {
    return stateData;
}

/**
 * Clears the stateData Object.
 */
export function clearState(): void {
    Object.keys(stateData).forEach(key => delete stateData[key]);
}
