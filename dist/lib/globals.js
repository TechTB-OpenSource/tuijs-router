import { tuiEvent } from 'tuijs-event';
export const eventInstance = tuiEvent();
export const routerConfig = {
    routeList: [],
    serverRouteList: [],
    routeNotFound: { server: true, path: '/404' },
    redirectList: []
};
export const activeRoute = {
    route: {}
};
export const stateData = {};
//# sourceMappingURL=globals.js.map