import { createEventInstance } from 'tuijs-event';
import * as METHODS from './methods.js';
import * as NAVIGATE from './navigate.js';


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
        clearState,
        navigateTo,
        navigateToNewTab,
        navigateToAnchorTag,
        navigateBack
    }
}