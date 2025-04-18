import { tuiEvent } from 'tuijs-event';

export const eventInstance = tuiEvent();

/**
 * @type {RouterConfig}
 */
export const routerConfig = {
    routeList: [],
    routeNotFound: { server: false, path: '/404' },
    redirectList: []
}

/**
 * @type {ActiveRoute}
 */
export const activeRoute = {
    routes: {}
}
