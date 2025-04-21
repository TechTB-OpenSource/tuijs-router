import { checkIsArray, checkIsObject } from 'tuijs-util';
import { eventInstance, routerConfig } from './globals.js';
import { handleClickEvent } from './handlers.js';
import { navigateTo } from "./navigate.js";

/**
 * Attaches window and document event listeners to start routing.
 * @returns {boolean} Returns true on success and false on error.
 */
export function startRouter() {
    try {
        eventInstance.addTrackedEvent(document, 'click', handleClickEvent); // Click Events
        eventInstance.addTrackedEvent(window, 'popstate', function () { navigateTo(location.pathname + location.search + location.hash) }); // Navigation Events
        navigateTo(location.pathname + location.search + location.hash); // Initial route
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > startRouter`);
        console.error(er);
        return false;
    }
}

/**
 * Removes all event listeners to prevent stop the router.
 * @returns {boolean} Returns true on success and false on error.
 */
export function stopRouter() {
    try {
        eventInstance.removeAllTrackedEvents();
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > stopRouter`);
        console.error(er);
        return false;
    }
}

/**
 * Sets the routeList array in the routerConfig Object
 * @param {RouteList} routeList - An Array containing route Objects
 * @returns {boolean} Returns true on success and false on error.
 */
export function setRouteList(newRouteList) {
    try {
        if (!checkIsArray(newRouteList)) {
            throw new Error(`The 'routeList' must be an array.`);
        }
        for (let i = 0; i < newRouteList.length; i++) {
            const { path, enterFunction, exitFunction, ...rest } = newRouteList[i];
            if (Object.keys(rest).length > 0) {
                throw new Error(`Unexpected properties provided at index ${i}: ${Object.keys(rest).join(', ')}`);
            }
            if (typeof newRouteList[i]['path'] !== 'string') {
                throw new Error(`The route path at index ${i}  must be a string.`);
            }
            if (typeof newRouteList[i]['enterFunction'] !== 'function') {
                throw new Error(`The route enterFunction at index ${i} must be a export function.`);
            }
            if (typeof newRouteList[i]['exitFunction'] !== 'function' && exitFunction !== null && exitFunction !== undefined) {
                throw new Error(`The route exitFunction at index ${i} must be a export function or null.`);
            }
        }
        routerConfig['routeList'] = newRouteList;
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > setRouteList`);
        console.error(er);
        return false;
    }
}

/**
 * Creates a route Object within the routeList Array
 * @param {string} path - The path of the new route
 * @param {export function} enterFunction - The export function that will be executed when the route is navigated to.
 * @param {export function} exitFunction - An option export function that will be executed when the route is navigated away from.
 * @returns {boolean} Returns true on success and false on error.
 */
export function addRoute(path, enterFunction, exitFunction = null) {
    try {
        if (typeof path !== 'string') {
            throw new Error(`Route 'path' must be a string`);
        }
        if (typeof enterFunction !== 'function') {
            throw new Error(`Route 'enterFunction' must be a export function`);
        }
        if (typeof exitFunction !== 'function' && exitFunction !== null) {
            throw new Error(`Route 'exitFunction' must be a export function`);
        }
        routerConfig['routeList'].push({
            path: path,
            enterFunction: enterFunction,
            exitFunction: exitFunction
        });
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > addRoute`);
        console.error(er);
        return false;
    }
}

/**
 * Deletes all matching route Objects within the routeList Array based on input.
 * @param {string} path - The path of the route to be deleted.
 * @returns {boolean} Returns true on success and false on error.
 */
export function deleteRoute(path) {
    try {
        if (typeof path !== 'string') {
            throw new Error(`Route 'path' must be a string`);
        }
        for (let i = routerConfig['routeList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
            if (routerConfig['routeList'][i]['path'] === path) {
                routerConfig['routeList'].splice(i, 1);
            }
        }
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > deleteRoute`);
        console.error(er);
        return false;
    }
}

/**
 * Replaces and existing route Object within the routeList Array
 * @param {string} path - The path of the route to be replaced
 * @param {export function} newEnterFunction - The export function that will be executed when the route is navigated to.
 * @param {export function} newExitFunction - An option export function that will be executed when the route is navigated away from.
 * @returns {boolean} Returns true on success and false on error.
 */
export function replaceRoute(path, newEnterFunction, newExitFunction = null) {
    try {
        if (typeof path !== 'string') {
            throw new Error(`Route 'path' must be a string`);
        }
        if (typeof newEnterFunction !== 'function') {
            throw new Error(`Route 'newEnterFunction' must be a export function`);
        }
        if (typeof newExitFunction !== 'function' && newExitFunction !== null) {
            throw new Error(`Route 'newExitFunction' must be a export function`);
        }
        const index = routerConfig.routeList.findIndex(route => route['path'] === path);
        if (index === -1) {
            throw new Error(`The route does not exist in the routerConfig routeList.`);
        }
        routerConfig.routeList[index] = { path, enterFunction: newEnterFunction, exitFunction: newExitFunction };
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > replaceRoute`);
        console.error(er);
        return false;
    }
}

/**
 * Sets the routeNotFound Object in the routerConfig Object
 * @param {RouteNotFound} options - An Object containing routeNotFound options
 * @returns {boolean} Returns true on success and false on error.
 */
export function setRouteNotFound(options) {
    try {
        if (!checkIsObject(options)) {
            throw new Error('Input must be an object.');
        }
        const { server, path, ...rest } = options;
        if (Object.keys(rest).length > 0) {
            throw new Error(`Unexpected properties provided: ${Object.keys(rest).join(', ')}`);
        }
        if (typeof server !== 'boolean') {
            throw new Error(`Provided value for 'server' must be a boolean.`);
        }
        if (typeof path !== 'string') {
            throw new Error(`Provided value for 'path' must be a string.`);
        }
        routerConfig['routeNotFound'] = { server, path };
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > setRouteNotFound`);
        console.error(er);
        return false;
    }
}

/**
 * Sets the redirectList Array in the routerConfig Object
 * @param {RedirectList} redirectList - An Array containing redirectList Objects
 * @returns {boolean} Returns true on success and false on error.
 */
export function setRedirectList(redirectList) {
    try {
        if (!checkIsArray(redirectList)) {
            throw new Error(`The 'redirectList' must be an array.`);
        }
        for (let i = 0; i < redirectList.length; i++) {
            if (typeof redirectList[i]['fromPath'] !== 'string') {
                throw new Error(`The fromPath at index '${i}'  must be a string.`);
            }
            if (typeof redirectList[i]['toPath'] !== 'string') {
                throw new Error(`The toPath at index '${i}'  must be a string.`);
            }
        }
        routerConfig['redirectList'] = redirectList;
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > setRedirectList`);
        console.error(er);
        return false;
    }
}

/**
 * Creates a redirect Object within the routeList Array
 * @param {string} fromPath - The path that should redirect from when targeted by navigation.
 * @param {string} toPath - The path that should be redirected to.
 * @returns {boolean} Returns true on success and false on error.
 */
export function addRedirect(fromPath, toPath) {
    try {
        if (typeof fromPath !== 'string') {
            throw new Error('The redirect fromPath must be a string');
        }
        if (typeof toPath !== 'string') {
            throw new Error('The redirect toPath must be a string');
        }
        routerConfig['redirectList'].push({
            fromPath: fromPath,
            toPath: toPath
        });
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > addRedirect`);
        console.error(er);
        return false;
    }
}

/**
 * Deletes all matching redirect Objects within the redirectList Array based on input.
 * @param {string} fromPath - The fromPath string that will be matched to determine which Object(s) to delete.
 * @returns {boolean} Returns true on success and false on error.
 */
export function deleteRedirect(fromPath) {
    try {
        if (typeof fromPath !== 'string') {
            throw new Error(`Route 'path' must be a string`);
        }
        for (let i = routerConfig['redirectList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
            if (routerConfig['redirectList'][i]['fromPath'] === fromPath) {
                routerConfig['redirectList'].splice(i, 1);
            }
        }
        return true;
    } catch (er) {
        console.error(`TUI Router Error: methods > deleteRedirect`);
        console.error(er);
        return false;
    }
}

/**
 * Returns an routerConfig Object.
 * @returns {RouterConfig}
 */
export function getRouterConfig() {
    return routerConfig;
}
/**
 * Returns the RouteList array.
 * @returns {RouteList}
 */
export function getRouteList() {
    return routerConfig['routeList'];
}
/**
 * Returns the RouteNotFound Object.
 * @returns {RouteNotFound}
 */
export function getRouteNotFound() {
    return routerConfig['routeNotFound'];
}
/**
 * Returns the RedirectList Object.
 * @returns {RedirectList}
 */
export function getRedirectList() {
    return routerConfig['redirectList'];
}
