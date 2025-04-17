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

            // If the URL begins with '#', ignore routing and call handleAnchorTag to scroll to link location on page
            if (href.startsWith('#')) {
                event.preventDefault();
                handleAnchorTag(href);
                return;
            }

            // If the target is blank, routing is used to open the page in a new tab
            if (target === '_blank') {
                event.preventDefault();
                handleNewTab(href);
                return;
            }

            event.preventDefault();
            navigateTo(href);
        }
        return;
    } catch (er) {
        console.error(`TUI Router: Event Listener Error`);
        console.error(er);
        return;
    }
}

/**
* Allows the client side router to open a page in a new tab
* @param {string} route - Path to the route
* @returns  {void}
* @throws {Error} - If an error occurs.
*/
export function handleNewTab(route) {
    try {
        const newTab = window.open('', '_blank');
        const newUrl = `${window.location.origin}${route}`;
        if (newTab) {
            newTab.location.href = newUrl;
        } else {
            throw new Error('Pop-up blocked or new tab could not be opened.');
        }
        return;
    } catch (er) {
        console.error(`TUI Router: New Tab Route Handling Error`);
        console.error(er);
        return;
    }
}

/**
 * Handles anchor tag routes
 * Scrolls to element into view smoothly
 * @param {string} href - URL 
 * @returns {void}
 * @throws {Error} - If an error occurs.
 */
export function handleAnchorTag(href) {
    try {
        let elmId = document.getElementById(href.slice(1));
        if (!elmId) {
            console.warn(`Anchor element not found for href: ${href}`);
            return;
        }
        elmId.scrollIntoView({ behavior: 'smooth' });
        return;
    } catch (er) {
        console.error(`TUI Router: Anchor Tag Handler Error`);
        console.error(er);
        return;
    }
}
