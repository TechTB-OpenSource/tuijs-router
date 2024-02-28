//// IMPORTS ////
import {
    loader,
    header,
    headerTitleBar,
    headerTitleLink,
    headerTitleNoLink,
    headerNavBar,
    headerNavBarLink,
    headerNavBarLinkNewT,
    headerNavBarLinkClicked,
    headerNavBarMenuContainer,
    headerGear,
    headerMenuLink,
    headerMenuLinkNewT,
    headerMenuLinkClicked,
    page,
    sideBar,
    sideBarLink,
    sideBarLinkNewT,
    sideBarLinkClicked,
    sideBarMenuContainer,
    sideBarMenuLink,
    sideBarMenuLinkNewT,
    sideBarMenuLinkClicked,
    darkModeSwitch,
    content,
    footer,
    footerNoLink,
} from './elm.js'
import {
    logicSideBarStart,
    logicDarkModeStart,
    logicCarrotStart,
} from './logic.js'
import {
    utilElmDelChildren
} from './util.js'

//// VERSION ////
const version = '7.5.0-002';

//// FUNCTIONS ////
// FUNCTIONS - TUI RENDER - BASIC
async function tuiBasic(tuiConfig, callbackPageExFunction) {
    await renderHead(tuiConfig);
    renderBody(tuiConfig);
    callbackPageExFunction();
    return;
}

async function tuiRouter(tuiConfig, callbackRouterFunction) {
    await renderHead(tuiConfig);
    callbackRouterFunction;
    return;
}

// FUNCTIONS - TUI Render - Head Tag
// By default the index 0 is used, this can be changed by customizing the renderHead function modifiers.
async function renderHead(tuiConfig) {
    // HEAD - START //
    document.title = tuiConfig[0].title;;
    // HEAD - END //
    return;
}

// FUNCTIONS - TUI Render - Body for TUI Basic
// By default the index 0 is used, this can be changed by customizing the renderHead function modifiers.
function renderBody(tuiConfig, tuiConfigRoute = 'default') {
    try {
        /**
         * 
         *     Find the index of the route's config object.
         *     This is done by reviewing the 'tuiConfig' array and checking for a 'route' value that matches 'tuiConfigRoute'
         * 
         */
        const tuiConfigIndex = tuiConfig.findIndex(function (obj) {
            return obj.route === tuiConfigRoute;
        });

        /**
         * 
         *     If the index is not 0, then check for missing keys/values at the selected tuiConfig array index
         *     If missing keys are found, then add the keys and values from the default index (0).
         * 
         */
        if (tuiConfigIndex !== 0) {
            Object.keys(tuiConfig[0]).forEach(function (key) {
                if (tuiConfig[tuiConfigIndex][key] === undefined) {
                    tuiConfig[tuiConfigIndex][key] = tuiConfig[0][key];
                }
            });
        }

        const title = tuiConfig[tuiConfigIndex].title;
        const darkMode = tuiConfig[tuiConfigIndex].darkMode;
        const contentRow = tuiConfig[tuiConfigIndex].contentRow;
        const headerObj = {
            title: title,
            header: tuiConfig[tuiConfigIndex].header,
            headerTitleBar: tuiConfig[tuiConfigIndex].headerTitleBar,
            headerTitleBarHomeLink: tuiConfig[tuiConfigIndex].headerTitleBarHomeLink,
            headerTitleBarHomeLinkHref: tuiConfig[tuiConfigIndex].headerTitleBarHomeLinkHref,
            headerTitleBarGearMenu: tuiConfig[tuiConfigIndex].headerTitleBarGearMenu,
            headerTitleBarGearMenuItems: tuiConfig[tuiConfigIndex].headerTitleBarGearMenuItems,
            headerNavBar: tuiConfig[tuiConfigIndex].headerNavBar,
            headerNavBarItems: tuiConfig[tuiConfigIndex].headerNavBarItems,
            headerNavBarGearMenu: tuiConfig[tuiConfigIndex].headerNavBarGearMenu,
            headerNavBarGearMenuItems: tuiConfig[tuiConfigIndex].headerNavBarGearMenuItems,
        }
        const sideBarObj = {
            sideBar: tuiConfig[tuiConfigIndex].sideBar,
            sideBarItems: tuiConfig[tuiConfigIndex].sideBarItems,
            sideBarDarkSwitch: tuiConfig[tuiConfigIndex].sideBarDarkSwitch
        }
        const footerObj = {
            footer: tuiConfig[tuiConfigIndex].footer,
            footerText: tuiConfig[tuiConfigIndex].footerText,
            footerTermsLink: tuiConfig[tuiConfigIndex].footerTermsLink,
            footerTermsLinkHref: tuiConfig[tuiConfigIndex].footerTermsLinkHref
        }

        // PRE-RENDER - START //
        utilElmDelChildren(document.body); // Clear body child elements
        document.body.appendChild(loader()); // Show Loader
        // PRE-RENDER - END //

        // BODY - START //
        document.body.classList.add('t3s-h-fill');
        document.body.classList.add('color-back-dark-9');

        // BODY - HEADER - START //
        if (headerObj.header === true) {
            document.body.appendChild(buildHeader(headerObj));
        }
        // BODY - HEADER - END //

        // BODY - PAGE - START //
        document.body.appendChild(buildPage(headerObj));
        if (sideBarObj.sideBar === true) {
            document.getElementById('id_page').classList.add('t3s-row');
            document.getElementById('id_page').appendChild(buildSidebar(sideBarObj, footerObj));
        }
        document.getElementById('id_page').appendChild(buildContent(contentRow));
        // BODY - PAGE - END //

        // BODY - FOOTER - START //
        if (footerObj.footer === true) {
            document.body.classList.add('t3s-margin-bottom-32');
            document.body.appendChild(buildFooter(footerObj));
        }
        // BODY - FOOTER - END //
        // BODY - END //

        // POST-RENDER - START //
        if (darkMode === true) {
            logicDarkModeStart();
        }
        if (sideBarObj.sideBar === true) {
            logicSideBarStart();
            logicCarrotStart();
        }
        document.getElementById('id_loader').remove(); // Remove loader element after page load
        // POST-RENDER - END //

        return;
    } catch (er) {
        console.error(er)
    }
}

function buildHeader(headerObj) {
    let elmHeader = header();
    if (headerObj.headerTitleBar === true) {
        elmHeader.appendChild(buildHeaderTitleBar(headerObj));
    }
    if (headerObj.headerNavBar === true) {
        elmHeader.appendChild(buildHeaderNavBar(headerObj));
    }
    return elmHeader;
}

function buildHeaderTitleBar(headerObj) {
    let elmHeaderTitleBar = headerTitleBar();
    /**
     * If 'headerTitleBarHomeLink' is true, deploy 'headerTitleLink'
     * Else, deploy 'headerTitleNoLink'
     *  */
    if (headerObj.headerTitleBarHomeLink === true) {
        elmHeaderTitleBar.appendChild(headerTitleLink(headerObj.title, headerObj.headerTitleBarHomeLinkHref));
    } else {
        elmHeaderTitleBar.appendChild(headerTitleNoLink(headerObj.title));
    }
    // If 'headerTitleBarGearMenu' is true, add the gear menu and add links
    if (headerObj.headerTitleBarGearMenu === true) {
        let elmHeaderGear = headerGear('white');
        let elmHidable = elmHeaderGear.querySelector('[data-elm="menu-hidable"]');
        renderHeaderMenuLinks(elmHidable, headerObj.headerTitleBarGearMenuItems);
        elmHeaderTitleBar.appendChild(elmHeaderGear);
    }
    return elmHeaderTitleBar;
}

function buildHeaderNavBar(headerObj) {
    let elmHeaderNavBar = headerNavBar();
    let elmHeaderNavBarItems = elmHeaderNavBar.querySelector('#id_header_navbar_items');
    let navBarArr = headerObj.headerNavBarItems
    for (let i = 0; i < navBarArr.length; i++) {
        // LINK ITEMS
        if (navBarArr[i].type === 'link') {
            // If clicked is true, create a clicked link and continue
            if (navBarArr[i].clicked === true) {
                elmHeaderNavBarItems.appendChild(headerNavBarLinkClicked(navBarArr[i].label));
                continue;
            }
            // If clicked is 0 and the current location matches the link, create a clicked link and continue
            if (navBarArr[i].clicked === 0) {
                // If the 'href' value matches the location, the window path the link will be rendered disabled (Using <p> element)
                if (window.location.pathname === navBarArr[i].href || window.location.href === navBarArr[i].href) {
                    elmHeaderNavBarItems.appendChild(headerNavBarLinkClicked(navBarArr[i].label));
                    continue;
                }
            }
            // If clicked link is not created, and 'newTab' is true, create a newTab link and continue
            if (navBarArr[i].newTab === true) {
                elmHeaderNavBarItems.appendChild(headerNavBarLinkNewT(navBarArr[i].label, navBarArr[i].href));
                continue;
            }
            // If no other value matches, create standard link and continue
            elmHeaderNavBarItems.appendChild(headerNavBarLink(navBarArr[i].label, navBarArr[i].href));
            continue;
        }
        // MENU ITEMS
        if (navBarArr[i].type === 'menu') {
            let elmHeaderNavBarMenuContainer = headerNavBarMenuContainer(navBarArr[i].label);
            let elmMenuHidable = elmHeaderNavBarMenuContainer.querySelector('[data-elm="menu-hidable"]');
            renderHeaderMenuLinks(elmMenuHidable, navBarArr[i].menuItems);
            elmHeaderNavBarItems.appendChild(elmHeaderNavBarMenuContainer);
            continue;
        }
    }
    // If 'headerTitleBarGearMenu' is true, add the gear menu and add links
    if (headerObj.headerNavBarGearMenu === true) {
        let elmHeaderGear = headerGear('white');
        let elmHidable = elmHeaderGear.querySelector('[data-elm="menu-hidable"]');
        renderHeaderMenuLinks(elmHidable, headerObj.headerNavBarGearMenuItems);
        elmHeaderNavBar.appendChild(elmHeaderGear);
    }
    return elmHeaderNavBar;
}

function renderHeaderMenuLinks(elmParent, linksObj) {
    for (let i = 0; i < linksObj.length; i++) {
        // If clicked is true, create a clicked link and continue
        if (linksObj[i].clicked === true) {
            elmParent.appendChild(headerMenuLinkClicked(linksObj[i].label));
            continue;
        }
        // If clicked is 0 and the current location matches the link, create a clicked link and continue
        if (linksObj[i].clicked === 0) {
            // If the 'href' value matches the location, the window path the link will be rendered disabled (Using <p> element)
            if (window.location.pathname === linksObj[i].href || window.location.href === linksObj[i].href) {
                elmParent.appendChild(headerMenuLinkClicked(linksObj[i].label));
                continue;
            }
        }
        // If clicked link is not created, and 'newTab' is true, create a newTab link and continue
        if (linksObj[i].newTab === true) {
            elmParent.appendChild(headerMenuLinkNewT(linksObj[i].label, linksObj[i].href));
            continue;
        }
        // If no other value matches, create standard link and continue
        elmParent.appendChild(headerMenuLink(linksObj[i].label, linksObj[i].href));
        continue;
    }
    return;
}

function buildSidebar(sideBarObj, footerObj) {
    let elmSideBar = sideBar();
    let elmSideBarItems = elmSideBar.querySelector("#id_sidebar_items");
    let sideBarItemsArr = sideBarObj.sideBarItems;
    // Loop through SIDEBAR object and add each item to the SIDEBAR
    for (let i = 0; i < sideBarItemsArr.length; i++) {
        // LINK ITEMS
        if (sideBarItemsArr[i].type === 'link') {
            if (sideBarItemsArr[i].clicked === true) {
                elmSideBarItems.appendChild(sideBarLinkClicked(sideBarItemsArr[i].label));
                continue;
            }
            // If clicked is 0 and the current location matches the link, create a clicked link and continue
            if (sideBarItemsArr[i].clicked === 0) {
                // If the 'href' value matches the location, the window path the link will be rendered disabled (Using <p> element)
                if (window.location.pathname === sideBarItemsArr[i].href || window.location.href === sideBarItemsArr[i].href) {
                    elmSideBarItems.appendChild(sideBarLinkClicked(sideBarItemsArr[i].label));
                    continue;
                }
            }
            // If clicked link is not created, and 'newTab' is true, create a newTab link and continue
            if (sideBarItemsArr[i].newTab === true) {
                elmSideBarItems.appendChild(sideBarLinkNewT(sideBarItemsArr[i].label, sideBarItemsArr[i].href));
                continue;
            }
            // If no other value matches, create standard link and continue
            elmSideBarItems.appendChild(sideBarLink(sideBarItemsArr[i].label, sideBarItemsArr[i].href));
            continue;
        }
        // MENU ITEMS
        if (sideBarItemsArr[i].type === 'menu') {
            let elmSideBarMenuContainer = sideBarMenuContainer(sideBarItemsArr[i].label, 'white');
            let elmMenuHidable = elmSideBarMenuContainer.querySelector('[data-elm="sidebar-menu-hidable"]');
            if (sideBarItemsArr[i].id !== undefined) {
                elmSideBarMenuContainer.id = sideBarItemsArr[i].id;
            }
            renderSideBarMenuLinks(elmMenuHidable, sideBarItemsArr[i].menuItems);
            elmSideBarItems.appendChild(elmSideBarMenuContainer);
            continue;
        }
    }
    if (sideBarObj.sideBarDarkSwitch === true) {
        elmSideBar.querySelector('#id_sidebar_hidable').appendChild(darkModeSwitch());
        if (footerObj.footer === true) {
            elmSideBar.querySelector('#id_darkmode_container').classList.add('t3s-bottom-32');
        } else {
            elmSideBar.querySelector('#id_darkmode_container').classList.add('t3s-bottom-0');
        }
    }
    return elmSideBar;
}

function renderSideBarMenuLinks(elmParent, linksObj) {
    for (let i = 0; i < linksObj.length; i++) {
        // If clicked is true, create a clicked link and continue
        if (linksObj[i].clicked === true) {
            elmParent.appendChild(sideBarMenuLinkClicked(linksObj[i].label));
            continue;
        }
        // If clicked is 0 and the current location matches the link, create a clicked link and continue
        if (linksObj[i].clicked === 0) {
            // If the 'href' value matches the location, the window path the link will be rendered disabled (Using <p> element)
            if (window.location.pathname === linksObj[i].href || window.location.href === linksObj[i].href) {
                elmParent.appendChild(sideBarMenuLinkClicked(linksObj[i].label));
                continue;
            }
        }
        // If clicked link is not created, and 'newTab' is true, create a newTab link and continue
        if (linksObj[i].newTab === true) {
            elmParent.appendChild(sideBarMenuLinkNewT(linksObj[i].label, linksObj[i].href));
            continue;
        }
        // If no other value matches, create standard link and continue
        elmParent.appendChild(sideBarMenuLink(linksObj[i].label, linksObj[i].href));
        continue;
    }
    return;
}

function buildPage(headerObj) {
    let elmPage = page();
    if (headerObj.header === false) {
        return elmPage;
    }
    if (headerObj.headerTitleBar === true && headerObj.headerNavBar === true) {
        elmPage.classList.add('t3s-margin-top-96');
    }
    if (headerObj.headerTitleBar === true && headerObj.headerNavBar === false) {
        elmPage.classList.add('t3s-margin-top-48');
    }
    if (headerObj.headerTitleBar === false && headerObj.headerNavBar === true) {
        elmPage.classList.add('t3s-margin-top-48');
    }
    return elmPage;
}

function buildContent(contentRow) {
    let elmContent = content();
    if (contentRow === true) {
        elmContent.classList.add('t3s-row-center-start');
        return elmContent;
    }
    elmContent.classList.add('t3s-column-start-center');
    return elmContent;
}

function buildFooter(footerObj) {
    if (footerObj.footerTermsLink === true) {
        return footer(footerObj.footerText, footerObj.footerTermsLinkHref);
    }
    return footerNoLink(footerObj.footerText);
}

//// EXPORTS ////
export {
    tuiBasic,
    tuiRouter,
    renderHead,
    renderBody,
};
