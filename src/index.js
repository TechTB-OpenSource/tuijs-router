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
    getRouteNotFound,
    getRedirectList
} from './lib/methods.js';
import {
    navigateTo,
    NavigateToAnchorTag
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
        getRouteNotFound,
        getRedirectList,
        navigateTo,
        NavigateToAnchorTag
    }
}

export { createRouter };
export { createRouter as tuiRouter };
