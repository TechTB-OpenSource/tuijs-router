// tuijs-router.d.ts
declare module 'tuijs-router' {


    export interface RouterConfig {
        routeList: RouteList,
        serverRouteList: ServerRouteList,
        routeNotFound: RouteNotFound,
        redirectList: RedirectList
    }

    export type RouteList = Route[];
    export type ServerRouteList = ServerRoute[];
    export interface RouteNotFound {
        server: boolean;
        path: string;
    }
    export type RedirectList = Redirect[];

    export interface Route {
        path: string;
        enterFunction: Function;
        exitFunction?: Function;
    }
    export type ServerRoute = string;
    export interface Redirect {
        fromPath: string;
        toPath: string;
    }

    export type StateData = Record<string, any>;

    export interface RouterInstance {
        startRouter: () => boolean;
        stopRouter: () => boolean;
        setRouteList: (newRouteList: RouteList) => boolean;
        addRoute: (path: string, enterFunction: Function, exitFunction: Function) => boolean;
        deleteRoute: (path: string) => boolean;
        replaceRoute: (path: string, newEnterFunction: Function, newExitFunction: Function) => boolean;
        setServerRouteList: (newServerRouteList: ServerRouteList) => boolean;
        addServerRoute: (path: string) => boolean;
        deleteServerRoute: (path: string) => boolean;
        replaceServerRoute: (oldPath: string, newPath: string) => boolean;
        setRouteNotFound: (newRouteNotFoundOptions: RouteNotFound) => boolean;
        setRedirectList: (redirectList: RedirectList) => boolean;
        addRedirect: (fromPath: string, toPath: string) => boolean;
        deleteRedirect: (fromPath: string) => boolean;
        getRouterConfig: () => RouterConfig;
        getRouteList: () => RouterConfig['routeList'];
        getRouteNotFound: () => RouterConfig['routeNotFound'];
        getRedirectList: () => RouterConfig['redirectList'];
        navigateTo: (targetRoute: string, data?: stateData | null, visitedPaths?: Set<string>) => void;
        navigateToNewTab: (route: string) => void;
        navigateToAnchorTag: (anchor: string) => void;
        navigateBack: () => void;
        setState: (data: stateData) => void;
        getState: () => stateData;
        clearState: () => void;
    }

    // The createRouter function returns a RouterInstance
    export function createRouter(): RouterInstance;
    export { createRouter as tuiRouter };
    export { createRouter as createRouterInstance };
}
