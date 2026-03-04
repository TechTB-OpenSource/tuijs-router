export interface Route {
    path: string;
    enterFunction: Function;
    exitFunction?: Function | null;
}

export type RouteList = Route[];

export interface RouteNotFound {
    server: boolean;
    path: string;
}

export type ServerRouteList = string[];

export type Redirect = {
    fromPath: string;
    toPath: string;
};

export type RedirectList = Redirect[];

export interface RouterConfig {
    routeList: RouteList;
    serverRouteList: ServerRouteList;
    routeNotFound: RouteNotFound;
    redirectList: RedirectList;
}


export interface ActiveRoute {
    route: Route;
}

export type StateData = Record<string, any>;
