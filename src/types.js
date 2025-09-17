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

/**
 * @typedef {Record<string, any>} StateData
 */

// Placeholder objects for the types (for runtime exports)
// These match the actual type structure from JSDoc
export const Route = {};
export const RouteList = []; // Array type
export const RouteNotFound = {};
export const ServerRouteList = []; // Array type  
export const Redirect = {};
export const RedirectList = []; // Array type
export const RouterConfig = {};
export const ActiveRoute = {};
export const StateData = {};
