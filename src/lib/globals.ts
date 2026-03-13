import type { Route, RouterConfig, ActiveRoute, StateData } from './models.js';
import { tuiEvent } from 'tuijs-event';

export const eventInstance = tuiEvent();

export const routerConfig: RouterConfig = {
    routeList: [],
    serverRouteList: [],
    routeNotFound: { server: true, path: '/404' },
    redirectList: []
}

export const activeRoute: ActiveRoute = {
    route: {} as Route
}

export const stateData: StateData = {};
