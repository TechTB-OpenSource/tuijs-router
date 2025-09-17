import {
    startRouter,
    stopRouter,
    setRouteList,
    addRoute,
    deleteRoute,
    replaceRoute,
    setServerRouteList,
    addServerRoute,
    deleteServerRoute,
    replaceServerRoute,
    setRouteNotFound,
    setRedirectList,
    addRedirect,
    deleteRedirect,
    getRouterConfig,
    getRouteList,
    getServerRouteList,
    getRouteNotFound,
    getRedirectList,
    getState,
    setState,
    clearState,
} from './lib/methods.js';
import {
    navigateTo,
    navigateToNewTab,
    navigateToAnchorTag,
    navigateBack
} from './lib/navigate.js';

/**
 * @typedef {import('./types.js').Route} Route
 * @typedef {import('./types.js').RouteList} RouteList
 * @typedef {import('./types.js').RouteNotFound} RouteNotFound
 * @typedef {import('./types.js').ServerRouteList} ServerRouteList
 * @typedef {import('./types.js').Redirect} Redirect
 * @typedef {import('./types.js').RedirectList} RedirectList
 * @typedef {import('./types.js').RouterConfig} RouterConfig
 * @typedef {import('./types.js').ActiveRoute} ActiveRoute
 * @typedef {import('./types.js').StateData} StateData
 */

/**
 * Creates a router instance
 * @returns {Object} Router instance with all methods
 */
function createRouter() {
    return {
        startRouter,
        stopRouter,
        setRouteList,
        addRoute,
        deleteRoute,
        replaceRoute,
        setServerRouteList,
        addServerRoute,
        deleteServerRoute,
        replaceServerRoute,
        setRouteNotFound,
        setRedirectList,
        addRedirect,
        deleteRedirect,
        getRouterConfig,
        getRouteList,
        getServerRouteList,
        getRouteNotFound,
        getRedirectList,
        navigateTo,
        navigateToNewTab,
        navigateToAnchorTag,
        navigateBack,
        getState,
        setState,
        clearState,
    }
}

export { createRouter };
export { createRouter as tuiRouter };

// Export types for TypeScript consumers
export {
    Route,
    RouteList,
    RouteNotFound,
    ServerRouteList,
    Redirect,
    RedirectList,
    RouterConfig,
    ActiveRoute,
    StateData
} from './types.js';
