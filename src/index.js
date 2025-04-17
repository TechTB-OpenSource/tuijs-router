import {
    startRouter,
    stopRouter,
    setRouteList,
    addRoute,
    deleteRoute,
    replaceRoute,
    setRouteNotFound,
    setRedirectList,
    addRedirect,
    deleteRedirect,
    getRouterConfig,
    getRouteList,
    getRouteNotFound,
    getRedirectList,
    navigateTo
} from '/src/methods.js';

function createRouter() {
    return {
        startRouter,
        stopRouter,
        setRouteList,
        addRoute,
        deleteRoute,
        replaceRoute,
        setRouteNotFound,
        setRedirectList,
        addRedirect,
        deleteRedirect,
        getRouterConfig,
        getRouteList,
        getRouteNotFound,
        getRedirectList,
        navigateTo
    }
}

export { createRouter };
export { createRouter as tuiRouter };
