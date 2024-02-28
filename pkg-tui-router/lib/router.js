
export default function routerStart(routeList, routeServer, routeNotFound) {
    document.addEventListener('click', function (event) {
        try {
            if (event.target.tagName === 'A') {
                const elm = event.target;
                const href = event.target.getAttribute('href');
                const target = event.target.getAttribute('target');
                for (let i = 0; i < routeServer.length; i++) {
                    if (routeServer[i] === href) {
                        return;
                    }
                }
                // If the URL ends with '.html', ignore routing
                if (href.endsWith('.html')) {
                    return;
                }
                // If the URL begins with 'http', 'https', or the routed dataset is 'false', ignore routing
                if (href.startsWith('http://') || href.startsWith('https://')) {
                    return;
                }
                // If the URL begins with '#', ignore routing and scroll to link location on page
                if (href.startsWith('#')) {
                    event.preventDefault();
                    let elmId = document.getElementById(href.slice(1));
                    elmId.scrollIntoView({ behavior: "smooth" });
                    return;
                }
                // If the target is blank, routing is used to open the page in a new tab
                if (target === '_blank') {
                    event.preventDefault();
                    routerNewTab(href);
                    return;
                }
                event.preventDefault();
                history.pushState({}, '', href);
                router(routeList, routeNotFound);
            }
        } catch (er) {
            console.error(`Router Link Handling Error: ${er}`)
        }
    });
    // Navigation
    window.onpopstate = function () {
        try {
            router(routeList, routeNotFound);
        } catch (er) {
            console.error(`Window onpopstate error: ${er}`)
        }
    };
    // Initial Route
    try {
        router(routeList, routeNotFound);
    } catch (er) {
        console.error(`Window onpopstate error: ${er}`)
    }
}

function router(routeList, routeNotFound) {
    try {
        const path = window.location.pathname; // Collects current path
        if (!history.state) { // Always redirect to "/" on the initial page load
            history.replaceState({}, '', path);
        }
        const routeHandler = routeList[path]; // Locates the path in the 'routeList' object
        if (routeHandler) { // If the route exists call route function
            routeHandler(); // Call route function that corresponds to 'routeHandler' variable
            return;
        }
        window.location = routeNotFound; // If the route does not exist use 'routeNotFound' page
        return;
    } catch (er) {
        throw new Error(`Router error: ${er}`)
    }
}

function routerNewTab(route) {
    try {
        const newTab = window.open('', '_blank');
        const newUrl = `${window.location.origin}${route}`;
        newTab.location.href = newUrl;
        return;
    } catch (er) {
        throw new Error(`Router new tab error: ${er}`)
    }
}
