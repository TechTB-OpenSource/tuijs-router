/**
 * Handles the routing logic. This is the core of the router.
 */
export declare function navigateTo(targetRoute: string, data?: Record<string, any> | null, visitedPaths?: Set<string>): Promise<void>;
/**
* Allows the client side router to open a page in a new tab
*/
export declare function navigateToNewTab(route: string): void;
/**
 * Handles anchor tag routes
 * Scrolls to element into view smoothly
 */
export declare function navigateToAnchorTag(anchor: string): void;
/**
 * Navigates back to the previous page or to the root if no referrer exists.
 * Uses the browser's history API and delegates to navigateTo to maintain router state.
 */
export declare function navigateBack(): void;
//# sourceMappingURL=navigate.d.ts.map