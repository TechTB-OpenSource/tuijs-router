import type { Redirect, RedirectList } from '../models.js';
import { routerConfig } from '../globals.js';

/**
 * Sets the redirectList Array in the routerConfig Object
 */
export function setRedirectList(redirectList: RedirectList): void {
    routerConfig['redirectList'] = redirectList;
}

/**
 * Creates a redirect Object within the redirectList Array
 */
export function addRedirect(newRedirect: Redirect): void {
    const index = routerConfig.redirectList.findIndex(redirect => redirect['fromPath'] === newRedirect.fromPath);
    if (index !== -1) {
        routerConfig.redirectList[index] = newRedirect;
        return;
    }
    routerConfig['redirectList'].push(newRedirect);
}

/**
 * Deletes all matching redirect Objects within the redirectList Array based on input.
 */
export function deleteRedirect(fromPath: string): void {
    for (let i = routerConfig['redirectList'].length - 1; i >= 0; i--) { // Using backward loop since array is being modified in loop
        if (routerConfig['redirectList'][i]['fromPath'] === fromPath) {
            routerConfig['redirectList'].splice(i, 1);
        }
    }
}

/**
 * Returns the RedirectList Array.
 */
export function getRedirectList(): RedirectList {
    return routerConfig['redirectList'];
}
