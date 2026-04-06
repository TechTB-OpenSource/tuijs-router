/**
 * Navigates to the target route.
 * If the target route is the same as the current route, it will re-run the enter function and update state.
 * If the target route is different from the current route, it will create a new entry in the browser's history stack and run the enter function.
 * If the target route matches a redirect, it will navigate to the redirect's toPath.
 * If the target route is not found in the client route list but is found in the server route list, it will send a request to the server.
 * If the target route is not found in either the client or server route list, it will navigate to the route not found path.
 * To prevent infinite loops, if a route is visited more than once during a single navigation attempt, the router will log an error and navigate to the root path.
 */
export declare function navigateTo(targetRoute: string, data?: Record<string, any> | null, visitedPaths?: Set<string>): Promise<void>;
/**
* Allows the client side router to open a page in a new tab
*/
export declare function navigateToNewTab(route: string): void;
/**
 * Navigates back to the previous page or to the root if no referrer exists.
 * Uses the browser's history API and delegates to navigateTo to maintain router state.
 */
export declare function navigateBack(): void;
/**
 * Scrolls element into view smoothly.
 * Accepts any valid CSS selector (tags, #ids, .classes, etc.).
 * For IDs, include the # prefix (e.g., '#myId').
 * Searches main document first, then shadow DOM trees as fallback.
 */
export declare function scrollTo(input: string): void;
//# sourceMappingURL=navigate.d.ts.map