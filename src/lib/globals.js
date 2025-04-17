import { tuiEvent } from 'tuijs-event';

export const eventInstance = tuiEvent();
/**
 * @type {RouterConfig}
 */
export let routerConfig = {
    routeList: [],
    routeNotFound: { server: false, path: '/404' },
    redirectList: []
}

/**
 * @type {Object}
 */
export let activeRoute = {};
