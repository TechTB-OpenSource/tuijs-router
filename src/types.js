/**
 * Data Example
 * 
 * route Object Example:
 *      {
 *          path: '/',
 *          enterFunction: functionName,
 *          exitFunction: functionName,
 *      }
 * 
 * routeNotFound Object Example:
 *      {
 *          server: false,
 *          path: '/404'
 *      }
 * 
 * redirect Object Example:
 *      {
 *          fromPath: '/old-path',
 *          toPath:  '/new-path'
 *      }
 */

/**
 * @typedef {Object} Route
 * @property {string} path - The route path (e.g., '/about')
 * @property {Function} handlerFunction - Function to run when the route matches
 * @property {Function|null} [exitFunction] - Optional function to run when exiting the route
 */

/**
 * @typedef {Route[]} RouteList
 */

/**
 * @typedef {Object} RouteNotFound
 * @property {boolean} server - A boolean showing if a route should be forwarded to the server or SPA router.
 * @property {string} path - The path to send route not found requests to.
 */

/**
 * @typedef {Object} Redirect
 * @property {string} fromPath - The route being hit that will trigger a redirect.
 * @property {string} toPath - The target path of the redirect once triggered.
 */

/**
 * @typedef {Redirect[]} RedirectList
 */

/**
 * @typedef {Object} RouterConfig
 * @property {Route[]} routeList - List of route definitions
 * @property {RouteNotFound} routeNotFound - Handler for unknown routes
 * @property {Redirect[]} redirectList - List of path redirects
 */
