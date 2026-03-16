import { eventInstance, routerConfig } from '../globals.js';
import { handleClickEvent } from '../handlers.js';
import { navigateTo } from "../methods/navigate.js";
/**
 * Attaches window and document event listeners to start the router.
 */
export function startRouter() {
    eventInstance.addTrackedEvent(document, 'click', handleClickEvent); // Click Events
    eventInstance.addTrackedEvent(window, 'popstate', function () { navigateTo(location.pathname + location.search + location.hash); }); // Navigation Events
    navigateTo(location.pathname + location.search + location.hash); // Initial route
}
/**
 * Removes all event listeners to stop the router.
 */
export function stopRouter() {
    eventInstance.removeAllTrackedEvents();
}
/**
 * Returns the active routerConfig object.
 */
export function getRouterConfig() {
    return routerConfig;
}
//# sourceMappingURL=control.js.map