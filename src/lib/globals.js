import { tuiEvent } from 'tuijs-event';

export const eventInstance = tuiEvent();

/**
 * @type {RouterConfig}
 */
export const routerConfig = {
    routeList: [],
    serverRouteList: [],
    routeNotFound: { server: true, path: '/404' },
    redirectList: []
}

/**
 * @type {ActiveRoute}
 */
export const activeRoute = {
    routes: {}
}

/**
 * @type {RouterState}
 */
export const routerState = {};
