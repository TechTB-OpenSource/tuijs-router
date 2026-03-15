import { createEventInstance } from 'tuijs-event';
import * as NAVIGATE from './methods/navigate.js';


export function createRouterInstance() {
    const {
        startRouter,
        stopRouter,
        setRouteList,
        addRoute,
        deleteRoute,
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
        setState,
        getState,
        clearState
    } = METHODS;
    const {
        navigateTo,
        navigateToNewTab,
        navigateToAnchorTag,
        navigateBack
    } = NAVIGATE;
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
    }
}