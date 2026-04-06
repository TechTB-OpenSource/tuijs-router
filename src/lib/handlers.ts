import { navigateTo, navigateToNewTab, scrollTo } from "./methods/navigate.js";


/**
 * Handles document click events to determine if the default action should be prevented for client-side routing.
 * If so, a navigation function is called accordingly.
 */
export function handleClickEvent(event: Event) {
    const path: EventTarget[] = event.composedPath?.() || [];
    const anchor: HTMLAnchorElement | undefined = path.find(el => (el as HTMLElement).tagName === 'A') as HTMLAnchorElement | undefined;
    if (anchor) {
        const href: string | null = anchor.getAttribute('href');
        const target: string | null = anchor.getAttribute('target');
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

        // If the URL begins with '#', ignore routing and call scrollTo to scroll to link location on page
        if (href.startsWith('#')) {
            event.preventDefault();
            scrollTo(href);
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
}
