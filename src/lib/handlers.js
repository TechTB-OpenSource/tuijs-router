import { navigateTo, navigateToAnchorTag } from "./navigate.js";


/**
 * Handles document click events to determine if the default action should be prevented for client-side routing.
 * If so, a navigation function is called accordingly.
 * @param {MouseEvent} event - The click event object.
 * @returns {void}
 */
export function handleClickEvent(event) {
    try {
        const anchor = event.target.closest('a'); // Find the closest <a> element
        if (anchor) {
            const href = anchor.getAttribute('href');
            const target = anchor.getAttribute('target');
            if (!href) {
                throw new Error('Clicked link does not have an href attribute.')
            };
            // If the target matches the below ignore client side routing
            if (
                href.startsWith('http://') ||
                href.startsWith('https://') ||
                href.startsWith('ftp://') ||
                href.startsWith('file://') ||
                href.startsWith('ws://') ||
                href.startsWith('wss://') ||
                href.startsWith('tel:') ||
                href.startsWith('mailto:')
            ) {
                return;
            }

            // If the URL begins with '#', ignore routing and call navigateToAnchorTag to scroll to link location on page
            if (href.startsWith('#')) {
                event.preventDefault();
                navigateToAnchorTag(href);
                return;
            }

            // If the target is blank, routing is used to open the page in a new tab
            if (target === '_blank') {
                event.preventDefault();
                navigateToNewTab(href);
                return;
            }

            event.preventDefault();
            navigateTo(href);
        }
        return;
    } catch (er) {
        console.error(`TUI Router Error: handlers > handleClickEvent`);
        console.error(er);
        return;
    }
}
