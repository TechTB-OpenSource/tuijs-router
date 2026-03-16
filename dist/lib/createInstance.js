import * as CONTROL from './methods/control.js';
import * as NAVIGATE from './methods/navigate.js';
import * as ROUTE_LIST from './methods/routeList.js';
import * as REDIRECT_LIST from './methods/redirectList.js';
import * as SERVER_ROUTE_LIST from './methods/serverRouteList.js';
import * as ROUTE_NOT_FOUND from './methods/routeNotFound.js';
import * as STATE from './methods/state.js';
export function createRouterInstance() {
    const { startRouter, stopRouter, getRouterConfig } = CONTROL;
    const { navigateTo, navigateToNewTab, navigateToAnchorTag, navigateBack } = NAVIGATE;
    const { setRouteList, addRoute, deleteRoute, getRouteList } = ROUTE_LIST;
    const { setRedirectList, addRedirect, deleteRedirect, getRedirectList } = REDIRECT_LIST;
    const { setServerRouteList, addServerRoute, deleteServerRoute, replaceServerRoute, getServerRouteList } = SERVER_ROUTE_LIST;
    const { setRouteNotFound, getRouteNotFound } = ROUTE_NOT_FOUND;
    const { setState, getState, clearState } = STATE;
    return {
        startRouter,
        stopRouter,
        getRouterConfig,
        setRouteList,
        addRoute,
        deleteRoute,
        getRouteList,
        setServerRouteList,
        addServerRoute,
        deleteServerRoute,
        replaceServerRoute,
        getServerRouteList,
        setRouteNotFound,
        getRouteNotFound,
        setRedirectList,
        addRedirect,
        deleteRedirect,
        getRedirectList,
        setState,
        getState,
        clearState,
        navigateTo,
        navigateToNewTab,
        navigateToAnchorTag,
        navigateBack
    };
}
//# sourceMappingURL=createInstance.js.map