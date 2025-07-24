/**
 * @typedef {Object} Route
 * @property {string} path
 * @property {Function} enterFunction
 * @property {Function|null} [exitFunction]
 */

/**
 * @typedef {Route[]} RouteList
 */

/**
 * @typedef {Object} RouteNotFound
 * @property {boolean} server
 * @property {string} path
 */

/**
 * @typedef {string[]} ServerRouteList
 */

/**
 * @typedef {Object} Redirect
 * @property {string} fromPath
 * @property {string} toPath
 */

/**
 * @typedef {Redirect[]} RedirectList
 */

/**
 * @typedef {Object} RouterConfig
 * @property {RouteList} routeList
 * @property {ServerRouteList} serverRouteList
 * @property {RouteNotFound} routeNotFound
 * @property {RedirectList} redirectList
 */

/**
 * @typedef {Object} ActiveRoute
 * @property {Route} route
 */

export {
    Route,
    RouteList,
    RouteNotFound,
    ServerRouteList,
    Redirect,
    RedirectList,
    RouterConfig,
    ActiveRoute
}
