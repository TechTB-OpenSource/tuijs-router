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
    getRedirectList
} from './lib/methods.js';
import {
    navigateTo,
    navigateToNewTab,
    navigateToAnchorTag
} from './lib/navigate.js';

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
        navigateToAnchorTag
    }
}

export { createRouter };
export { createRouter as tuiRouter };
