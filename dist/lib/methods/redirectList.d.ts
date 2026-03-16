import type { Redirect, RedirectList } from '../models.js';
/**
 * Sets the redirectList Array in the routerConfig Object.
 */
export declare function setRedirectList(redirectList: RedirectList): void;
/**
 * Creates a redirect Object within the redirectList Array.
 * If a redirect with the same fromPath already exists, it is overwritten with the new redirect Object.
 */
export declare function addRedirect(newRedirect: Redirect): void;
/**
 * Deletes all matching redirect Objects within the redirectList Array based on input.
 */
export declare function deleteRedirect(fromPath: string): void;
/**
 * Returns the RedirectList Array.
 */
export declare function getRedirectList(): RedirectList;
//# sourceMappingURL=redirectList.d.ts.map