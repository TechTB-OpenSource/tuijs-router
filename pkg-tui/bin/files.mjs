//// VARIABLES ////
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./img/logo_ttb_solid_256.png">
    <link rel="stylesheet" href="./css/site.css">
    <script type="module" src="./js/index.js" defer></script>
</head>
<body>
</body>
</html>
`;

const indexJsBasic = `//// REQUIRED - TUI IMPORTS - START ////
import { tuiBasic } from '../tui/render.js';
import tuiConfig from '../config/index.config.js';
//// REQUIRED - TUI IMPORTS - END ////

//// CUSTOM PAGE - IMPORTS - START ////
//// CUSTOM PAGE - IMPORTS - END ////

//// REQUIRED - TUI RENDER - START ////
tuiBasic(tuiConfig, ex);
//// REQUIRED - TUI RENDER - END ////

//// CUSTOM PAGE - EXECUTION CODE - START ////
function ex() {
}
//// CUSTOM PAGE - EXECUTION CODE - END ////
`;

const indexJsRouter = `//// REQUIRED - TUI IMPORTS - START ////
import tuiConfig from '../config/index.config.js';
import { routeList, routeServer, routeNotFound } from '../config/router.config.js';
import { tuiRouter } from '../tui/render.js';
import { routerStart } from '../tui/router.js'
//// REQUIRED - TUI IMPORTS - END ////

//// CUSTOM PAGE - IMPORTS - START ////
//// CUSTOM PAGE - IMPORTS - END ////

//// REQUIRED - TUI RENDER - START ////
tuiRouter(tuiConfig, routerStart(routeList, routeServer, routeNotFound));
//// REQUIRED - TUI RENDER - END ////

//// CUSTOM PAGE - EXECUTION CODE - START ////
//// CUSTOM PAGE - EXECUTION CODE - END ////  
`;

const indexConfigJsBasic = `const tuiConfig = [
    {
        route: 'default',
        title: 'Title',
        darkMode: true,
        header: true,
        headerTitleBar: true,
        headerTitleBarHomeLink: false,
        headerTitleBarHomeLinkHref: '',
        headerTitleBarGearMenu: false,
        headerTitleBarGearMenuItems: [
        ],
        headerNavBar: true,
        headerNavBarItems: [
            {
                type: 'link',
                label: 'Home',
                href: '',
                newTab: false,
                clicked: true
            },
            {
                type: 'menu',
                label: 'Menu',
                clicked: false,
                menuItems: [
                    {
                        label: 'Link',
                        href: '',
                        newTab: false,
                        clicked: false
                    }
                ]
            },
            {
                type: 'link',
                label: 'TechTB Site',
                href: 'https://www.techtb.biz',
                newTab: true,
                clicked: false,
                routed: false
            }
        ],
        headerNavBarGearMenu: true,
        headerNavBarGearMenuItems: [
            {
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false
            },
            {
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false
            }
        ],
        sideBar: true,
        sideBarItems: [
            {
                type: 'link',
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false,
            },
            {
                type: 'menu',
                id: 'tempid',
                label: 'Menu',
                clicked: false,
                menuItems: [
                    {
                        label: 'Link',
                        href: '',
                        newTab: false,
                        clicked: false
                    }
                ]
            }
        ],
        sideBarDarkSwitch: true,
        contentRow: false,
        footer: true,
        footerText: 'TechTB™&nbsp;&nbsp;-&nbsp;&nbsp;©&nbsp;2023',
        footerTermsLink: false,
        footerTermsLinkHref: ''
    }
]

export default tuiConfig;
`;

const indexConfigJsRouter = `const tuiConfig = [
    {
        route: 'default',
        title: 'Title',
        darkMode: true,
        header: true,
        headerTitleBar: true,
        headerTitleBarHomeLink: false,
        headerTitleBarHomeLinkHref: '',
        headerTitleBarGearMenu: false,
        headerTitleBarGearMenuItems: [
        ],
        headerNavBar: true,
        headerNavBarItems: [
            {
                type: 'link',
                label: 'Home',
                href: '/',
                newTab: false,
                clicked: 0
            },
            {
                type: 'link',
                label: 'Route 2',
                href: '/route2',
                newTab: false,
                clicked: 0
            },
            {
                type: 'link',
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false,
            },
            {
                type: 'menu',
                label: 'Menu',
                clicked: false,
                menuItems: [
                    {
                        label: 'Link',
                        href: '',
                        newTab: false,
                        clicked: false
                    }
                ]
            },
            {
                type: 'link',
                label: 'TechTB Site',
                href: 'https://www.techtb.biz',
                newTab: true,
                clicked: false,
                routed: false
            }
        ],
        headerNavBarGearMenu: true,
        headerNavBarGearMenuItems: [
            {
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false
            },
            {
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false
            }
        ],
        sideBar: true,
        sideBarItems: [
            {
                type: 'link',
                label: 'Home',
                href: '/',
                newTab: false,
                clicked: 0
            },
            {
                type: 'link',
                label: 'Route 2',
                href: '/route2',
                newTab: false,
                clicked: 0
            },
            {
                type: 'link',
                label: 'Link',
                href: '',
                newTab: false,
                clicked: false,
            },
            {
                type: 'menu',
                id: 'tempid',
                label: 'Menu',
                clicked: false,
                menuItems: [
                    {
                        label: 'Link',
                        href: '',
                        newTab: false,
                        clicked: false
                    }
                ]
            }
        ],
        sideBarDarkSwitch: true,
        contentRow: false,
        footer: true,
        footerText: 'TechTB™&nbsp;&nbsp;-&nbsp;&nbsp;©&nbsp;2023',
        footerTermsLink: false,
        footerTermsLinkHref: ''
    },
    {
        route: 'route2'
    }
]

export default tuiConfig;
`;

const routerConfigJs = `//// IMPORTS ////
import tuiConfig from './index.config.js';
import { renderBody  } from '../tui/render.js';

//// CUSTOM PAGE - IMPORTS - START ////
//// CUSTOM PAGE - IMPORTS - END ////

//// VARIABLES ////
const routeList = {
    '/': routeHome,
    '/route2': route2,
};
const routeServer = [
];
const routeNotFound = './404.html'

//// FUNCTIONS ////
// FUNCTIONS - ROUTES

function routeHome() {
    renderBody(tuiConfig, 'default');
    console.log('routeHome');
    const content = document.getElementById('id_content');
    content.innerText = 'routeHome';
    // ADD ROUTE LOGIC HERE
}
function route2() {
    renderBody(tuiConfig, 'route2');
    console.log('route2')
    const content = document.getElementById('id_content');
    content.innerText = 'route2';
    // ADD ROUTE LOGIC HERE
}

//// EXPORTS ////
export {
    routeList,
    routeServer,
    routeNotFound
};    
`;

export {
    indexHtml,
    indexJsBasic,
    indexJsRouter,
    indexConfigJsBasic,
    indexConfigJsRouter,
    routerConfigJs,
};
