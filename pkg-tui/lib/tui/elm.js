//// IMPORTS ////
import {
    utilElmCleaner
} from './util.js'

//// VERSION ////
const version = '7.5.0-002';

//// FUNCTIONS ////
function loader() {
    let elmStr = /*HTML*/ `
        <div id="id_loader" class="t3s-modal-background-dark t3s-row-center-center">
            <div class="t3s-loader-black"></div>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function header() {
    let elmStr = /*HTML*/ `
        <header id="id_header" class="t3s-header t3s-column">
        </header>
    `
    return utilElmCleaner(elmStr);
}

function headerTitleBar() {
    let elmStr = /*HTML*/ `
        <div id="id_header_titlebar" class="t3s-h-48 t3s-row-between-center color-back-main">
        </div>
    `
    return utilElmCleaner(elmStr);
}

function headerTitleLink(title, link) {
    let elmStr = /*HTML*/ `
        <a href="${link}" class="t3s-row-start-center t3s-font-white">
            <img src="./img/logo.png" height="32" alt="TechTB" class="t3s-margin-left-16">
            <p id='id_title' class="t3s-center-center t3s-margin-left-16 t3s-bold t3s-font-16">${title}</p>
        </a>
    `
    return utilElmCleaner(elmStr);
}

function headerTitleNoLink(title) {
    let elmStr = /*HTML*/ `
        <div class="t3s-row-start-center t3s-font-white">
            <img src="./img/logo.png" height="32" alt="TechTB" class="t3s-margin-left-16">
            <p id='id_title' class="t3s-center-center t3s-margin-left-16 t3s-bold t3s-font-16">${title}</p>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function headerNavBar() {
    let elmStr = /*HTML*/ `
        <div id="id_header_navbar" class="t3s-h-48 t3s-row-between-center color-back-dark-8">
            <div id="id_header_navbar_items" class="t3s-h-100p t3s-row-start-center">
            </div>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function headerNavBarLink(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" class="t3s-button-simple t3s-h-100p t3s-min-w-128 t3s-pad-sides-16 t3s-row-center-center t3s-hover-under t3s-font-bold">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function headerNavBarLinkNewT(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" target='_blank' rel= 'noopener noreferrer nofollow' class="t3s-button-simple t3s-h-100p t3s-min-w-128 t3s-pad-sides-16 t3s-row-center-center t3s-hover-under t3s-font-bold">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function headerNavBarLinkClicked(label) {
    let elmStr = /*HTML*/ `
        <p class="t3s-h-100p t3s-min-w-128 t3s-pad-sides-16 t3s-row-center-center t3s-under t3s-font-bold">${label}</p>
    `
    return utilElmCleaner(elmStr);
}

function headerNavBarMenuContainer(label) {
    let elmStr = /*HTML*/ `
        <div class="t3s-button-simple t3s-h-100p t3s-min-w-128 t3s-pad-sides-16 t3s-row-center-center t3s-hoverdrop-container">
            <button alt="${label}" class="t3s-h-100p t3s-w-100p t3s-button-simple t3s-font-bold">
                <p>${label}</p>
            </button>
            <div data-elm="menu-hidable" class="t3s-min-w-128 t3s-hoverdrop-hidable color-back-dark-8 t3s-zn1 t3s-ani_down_200">
            </div>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function headerGear(color) {
    let elmStr = /*HTML*/ `
        <div class="t3s-column-center-center t3s-hoverdrop-container">
            <button class="t3s-h-48 t3s-w-48 t3s-row-center-center t3s-button-simple"><img src="./img/gear_${color}.png" height="24" data-elm="menu-button-gear-img"></button>
            <div data-elm="menu-hidable" class="t3s-min-w-128 t3s-hoverdrop-hidable t3s-right-0 color-back-dark-8 t3s-zn1 t3s-ani_down_200">
            </div>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function headerMenuLink(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" class="t3s-button-simple t3s-h-48 t3s-w-100p t3s-pad-16 t3s-row-center-center t3s-hover-grey t3s-font-bold t3s-borderbox">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function headerMenuLinkNewT(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" target='_blank' rel= 'noopener noreferrer nofollow' class="t3s-button-simple t3s-h-48 t3s-w-100p t3s-pad-16 t3s-row-center-center t3s-hover-grey t3s-font-bold t3s-borderbox">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function headerMenuLinkClicked(label) {
    let elmStr = /*HTML*/ `
        <p class="t3s-button-simple t3s-h-48 t3s-w-100p t3s-pad-16 t3s-row-center-center t3s-grey t3s-font-bold t3s-borderbox">${label}</p>
    `
    return utilElmCleaner(elmStr);
}

function page() {
    let elmStr = /*HTML*/ `
        <!-- PAGE -->
        <div id="id_page" class="t3s-h-fill"></div>
    `
    return utilElmCleaner(elmStr);
}

function sideBar() {
    let elmStr = /*HTML*/ `
        <!-- SIDEBAR -->
        <div id="id_sidebar" class="t3s-w-256 t3s-column-start-center color-back-dark-7 t3s-font-bold t3s-tran_w_200 " data-hidden="false">
            <div class="t3s-bar">
                <button id="id_sidebar_button" type="Button" class="t3s-button t3s-pad-16">
                    <img src="./img/fafabars_white.png" alt="Fafa" height="16" class="t3s-pad-0" data-elm="fafa">
                </button>
            </div>
            <div id="id_sidebar_hidable" class="t3s-w-fill t3s-h-fill t3s-column-start-center t3s-overauto-y">
                <div id="id_sidebar_items" class="t3s-w-fill t3s-margin-bottom-64 t3s-column-start-center">
                </div>
            </div>
            <!-- SIDEBAR - END -->
        </div>
    `
    return utilElmCleaner(elmStr);
}

function sideBarLink(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" class="t3s-button-menu t3s-hover-grey">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function sideBarLinkNewT(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" target='_blank' rel= 'noopener noreferrer nofollow' class="t3s-button-menu t3s-hover-grey">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function sideBarLinkClicked(label) {
    let elmStr = /*HTML*/ `
        <p class="t3s-button-menu t3s-grey">${label}</p>
    `
    return utilElmCleaner(elmStr);
}

function sideBarMenuContainer(label, color, height = '10') {
    let elmStr = /*HTML*/ `
        <div class="t3s-w-100p" data-elm="sidebar-menu-container">
            <button alt="${label}" class="t3s-button-simple t3s-w-100p t3s-pad-16 t3s-row-between-center t3s-hover-grey t3s-font-bold " data-elm="sidebar-menu-button">
                <p>${label}</p>
                <img src="./img/carrot_left_${color}.png" alt="Carrot" height="${height}" data-elm="sidebar-menu-carrot" data-carrot="left" data-color="${color}">
            </button>
            <div data-elm="sidebar-menu-hidable" class="t3s-hide">
            </div>
        </div>
    `
    return utilElmCleaner(elmStr);
}

function sideBarMenuLink(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" class="t3s-pad-left-32 t3s-button-menu t3s-hover-grey">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function sideBarMenuLinkNewT(label, href) {
    let elmStr = /*HTML*/ `
        <a href="${href}" alt="${label}" target='_blank' rel= 'noopener noreferrer nofollow' class="t3s-pad-left-32 t3s-button-menu t3s-hover-grey">${label}</a>
    `
    return utilElmCleaner(elmStr);
}

function sideBarMenuLinkClicked(label) {
    let elmStr = /*HTML*/ `
        <p class="t3s-pad-left-32 t3s-button-menu t3s-grey">${label}</p>
    `
    return utilElmCleaner(elmStr);
}

function darkModeSwitch() {
    let elmStr = /*HTML*/ `
        <div id="id_darkmode_container" class="t3s-h-32 t3s-button-simple t3s-pad-bread-16 t3s-row-center-center t3s-w-fill t3s-absolute color-back-dark-7">
            <label class="t3s-switch">
                <input id="id_darkmode_switch" type="checkbox" title="Dark Mode">
                <span class="t3s-switch-slider"></span>
            </label>
            <p class="t3s-margin-left-16">Dark Mode</p>
        </div>
        `
    return utilElmCleaner(elmStr);
}

function content() {
    let elmStr = /*HTML*/ `
        <!-- CONTENT -->
        <div id="id_content" class="t3s-h-fill t3s-flex-1 t3s-overauto-y"></div>
    `
    return utilElmCleaner(elmStr);
}

function footer(text, link) {
    let elmStr = /*HTML*/ `
        <!-- FOOTER -->
        <footer id="id_footer" class="t3s-h-32 t3s-footer t3s-row-start-center color-back-dark-8">
            <p class="t3s-pad-sides-8 t3s-font-12">${text}&nbsp;&nbsp;-&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer nofollow" href="${link}" class="t3s-underline">Terms Of Use</a></p>
        </footer>
    `
    return utilElmCleaner(elmStr);
}

function footerNoLink(text) {
    let elmStr = /*HTML*/ `
        <!-- FOOTER -->
        <footer id="id_footer" class="t3s-h-32 t3s-footer t3s-row-start-center color-back-dark-8">
            <p class="t3s-pad-sides-8 t3s-font-12">${text}</p>
        </footer>
    `
    return utilElmCleaner(elmStr);
}

// FUNCTIONS - Required exports for logic.js to work
function headerGearImg(color) {
    let elmStr = /*HTML*/ `
        <img src="./img/gear_${color}.png" height="24" data-elm="menu-button-gear-img">
    `
    return utilElmCleaner(elmStr);
}
function fafa(color, height = '16') {
    let elmStr = /*HTML*/ `
        <img src="./img/fafabars_${color}.png" alt="Fafa" height="${height}" data-elm="fafa">
    `
    return utilElmCleaner(elmStr);
}
function carrotLeft(color, height = '10') {
    let elmStr = /*HTML*/ `
        <img src="./img/carrot_left_${color}.png" alt="Carrot" height="${height}" data-elm="sidebar-menu-carrot" data-carrot="left" data-color="${color}">
    `
    return utilElmCleaner(elmStr);
}

function carrotDown(color, height = '10') {
    let elmStr = /*HTML*/ `
        <img src="/img/carrot_down_${color}.png" alt="Carrot" height="${height}" data-elm="sidebar-menu-carrot" data-carrot="down" data-color="${color}">
    `
    return utilElmCleaner(elmStr);
}

//// EXPORTS ////
export {
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
    // EXPORTS - Required for logic.js to work
    headerGearImg,
    fafa,
    carrotLeft,
    carrotDown,
}
