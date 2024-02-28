import {
    headerGearImg,
    fafa,
    carrotLeft,
    carrotDown,
} from './elm.js'

function logicSideBarStart() {
    try {
        if (localStorage.getItem('sideBarHidden') === 'true') {
            logicSideBarHide();
        }
        document.getElementById('id_sidebar_button').addEventListener('click', function () { logicSideBarHide() });
        return;
    } catch (er) {
        console.error(er);
    }
}
function logicSideBarHide() {
    try {
        // Sidebar container/parent element
        let sideBar = document.getElementById('id_sidebar');
        // Sidebar section that is hidden when hide button is used 
        let sideBarHidable = document.getElementById('id_sidebar_hidable');
        // When function is called, if side bar is currently marked as not hidden (false) then it will hide it
        if (sideBar.dataset.hidden === 'false') {
            // Remove animations if the sidebar is showing and will be hidden
            document.getElementById('id_darkmode_container').classList.remove('t3s-ani_right_600');
            document.getElementById('id_sidebar_items').classList.remove('t3s-ani_right_500');
            sideBarHidable.classList.add('t3s-hide');
            sideBar.classList.remove('t3s-w-256');
            sideBar.classList.add('t3s-w-48');
            localStorage.setItem('sideBarHidden', 'true');
            sideBar.dataset.hidden = true;
            return
        }
        // Add animations if the sidebar is hidden and will be shown
        document.getElementById('id_darkmode_container').classList.add('t3s-ani_right_600');
        document.getElementById('id_sidebar_items').classList.add('t3s-ani_right_500');
        sideBar.classList.remove('t3s-w-48');
        sideBar.classList.add('t3s-w-256');
        sideBarHidable.classList.remove('t3s-hide');
        localStorage.setItem('sideBarHidden', 'false');
        sideBar.dataset.hidden = false;
        return;
    } catch (er) {
        console.error(er);
    }
}

function logicDarkModeStart() {
    try {
        let darkModeSwitch = document.getElementById('id_darkmode_switch');
        if (darkModeSwitch) {
            darkModeSwitch.addEventListener('click', function () { logicDarkCheck(this) });
            if (localStorage.getItem('darkMode') === 'true') {
                darkModeSwitch.checked = true;
                logicDarkChange(true);
                return;
            }
            if (localStorage.getItem('darkMode') === 'false') {
                darkModeSwitch.checked = false;
                logicDarkChange(false);
                return;
            }
        }
        if (localStorage.getItem('darkMode') === 'true') {
            logicDarkChange(true);
            return;
        }
        if (localStorage.getItem('darkMode') === 'false') {
            logicDarkChange(false);
            return;
        }
        darkModeSwitch.checked = true;
        logicDarkChange(true); // This shouldn't ever run if localStorage is set correctly. This just ensure if it is not, than dark mode is enabled by default.
        return;
    } catch (er) {
        console.error(er);
    }
}

function logicDarkCheck(darkModeSwitch) {
    try {
        if (darkModeSwitch.checked === true) {
            logicDarkChange(true);
            return;
        }
        if (darkModeSwitch.checked === false) {
            logicDarkChange(false);
            return;
        }
    } catch (er) {
        console.error(er);
    }
}

function logicDarkChange(bol) {
    try {
        let darkMode = document.getElementById('id_darkmode');
        let elmsGearImg = document.querySelectorAll('[data-elm="menu-button-gear-img"]');
        let elmsFafa = document.querySelectorAll('[data-elm="fafa"]');
        let elmsCarrotImg = document.querySelectorAll('[data-elm="sidebar-menu-carrot"]');
        // Dark Mode - Change to true
        if (bol === true) {
            localStorage.setItem('darkMode', 'true');
            if (darkMode) {
                darkMode.checked = true;
            }
            // Update fafa elements
            if (elmsFafa) {
                for (let i = 0; i < elmsFafa.length; i++) {
                    let parent = elmsFafa[i].parentElement;
                    parent.removeChild(elmsFafa[i]);
                    parent.appendChild(fafa('white'));
                }
            }
            // Update carrot elements
            for (let i = 0; i < elmsCarrotImg.length; i++) {
                let parent = elmsCarrotImg[i].parentElement;
                if (elmsCarrotImg[i].dataset.carrot === 'left') {
                    parent.removeChild(elmsCarrotImg[i]);
                    parent.appendChild(carrotLeft('white'));
                }
                if (elmsCarrotImg[i].dataset.carrot === 'down') {
                    parent.removeChild(elmsCarrotImg[i]);
                    parent.appendChild(carrotDown('white'));
                }
            }
            // Update gear elements
            for (let i = 0; i < elmsGearImg.length; i++) {
                let parent = elmsGearImg[i].parentElement;
                parent.removeChild(elmsGearImg[i]);
                parent.appendChild(headerGearImg('white'));
            }
            // Update all elms with dark classes
            let elmsLight = document.querySelectorAll('[class*="color-back-light"]');
            for (let i = 0; i < elmsLight.length; i++) {
                let classes = elmsLight[i].classList;
                for (let c = 0; c < classes.length; c++) {
                    if (classes[c].includes('light')) {
                        let match = classes[c].match(/\d+$/);
                        let numDark = parseInt(match[0]);
                        let numLight = 10 - numDark;
                        let newClassName = classes[c].replace(`light-${numDark}`, `dark-${numLight}`);
                        elmsLight[i].classList.remove(classes[c]);
                        elmsLight[i].classList.add(newClassName);
                    }
                }
            }
            return;
        }

        // Dark Mode - Change to false
        localStorage.setItem('darkMode', 'false');
        if (darkMode) {
            darkMode.checked = false;
        }
        // Update fafa elements
        if (elmsFafa) {
            for (let i = 0; i < elmsFafa.length; i++) {
                let parent = elmsFafa[i].parentElement;
                parent.removeChild(elmsFafa[i]);
                parent.appendChild(fafa('black'));
            }
        }
        // Update carrot elements
        for (let i = 0; i < elmsCarrotImg.length; i++) {
            let parent = elmsCarrotImg[i].parentElement;
            if (elmsCarrotImg[i].dataset.carrot === 'left') {
                parent.removeChild(elmsCarrotImg[i]);
                parent.appendChild(carrotLeft('black'));
            }
            if (elmsCarrotImg[i].dataset.carrot === 'down') {
                parent.removeChild(elmsCarrotImg[i]);
                parent.appendChild(carrotDown('black'));
            }
        }
        // Update gear elements
        for (let i = 0; i < elmsGearImg.length; i++) {
            let parent = elmsGearImg[i].parentElement;
            parent.removeChild(elmsGearImg[i]);
            parent.appendChild(headerGearImg('black'));
        }
        // Update all elms with light classes
        let elmsDark = document.querySelectorAll('[class*="color-back-dark"]');
        for (let i = 0; i < elmsDark.length; i++) {
            let classes = elmsDark[i].classList;
            for (let c = 0; c < classes.length; c++) {
                if (classes[c].includes('dark')) {
                    let match = classes[c].match(/\d+$/);
                    let numDark = parseInt(match[0]);
                    let numLight = 10 - numDark;
                    let newClassName = classes[c].replace(`dark-${numDark}`, `light-${numLight}`);
                    elmsDark[i].classList.remove(classes[c]);
                    elmsDark[i].classList.add(newClassName);
                }
            }
        }
        return;
    } catch (er) {
        console.error(er);
    }
}

function logicCarrotStart() {
    try {
        let elmsCarrotMenuButtons = document.querySelectorAll('[data-elm="sidebar-menu-button"]');
        for (let i = 0; i < elmsCarrotMenuButtons.length; i++) {
            elmsCarrotMenuButtons[i].addEventListener('click', function () { logicCarrotChange(this) });
        }
        let storageObject = JSON.parse(localStorage.getItem('sideBarMenuHidden'));
        for (let key in storageObject) {
            let elm = document.getElementById(key);
            if (elm === null || elm === undefined) {
                delete storageObject[key];
                continue;
            }
            logicCarrotChangeBol(elm, storageObject[key]);
        }
        localStorage.setItem('sideBarMenuHidden', JSON.stringify(storageObject));
        return;
    } catch (er) {
        localStorage.setItem('sideBarMenuHidden', '{}');
        console.error(er);
    }
}

function logicCarrotChange(elmMenuButton) {
    try {
        let elmMenuImg = elmMenuButton.querySelector('[data-elm="sidebar-menu-carrot"]');
        let elmMenuContainer = elmMenuButton.parentNode;
        let elmMenuContainerId = elmMenuContainer.id;
        let elmHidable = elmMenuContainer.querySelector('[data-elm="sidebar-menu-hidable"]');
        let imgColor = elmMenuImg.dataset.color;
        let storageObject = JSON.parse(localStorage.getItem('sideBarMenuHidden'));
        if (storageObject === null) {
            storageObject = {};
        }
        elmMenuButton.removeChild(elmMenuImg);
        if (elmMenuImg.dataset.carrot === 'left') {
            elmMenuButton.appendChild(carrotDown(imgColor));
            elmHidable.classList.remove('t3s-hide');
            if (elmMenuContainer.id === '') {
                return;
            }
            storageObject[elmMenuContainerId] = false;
            localStorage.setItem('sideBarMenuHidden', JSON.stringify(storageObject))
            return;
        }
        elmMenuButton.appendChild(carrotLeft(imgColor));
        elmHidable.classList.add('t3s-hide');
        if (elmMenuContainer.id === '') {
            return;
        }
        storageObject[elmMenuContainerId] = true;
        localStorage.setItem('sideBarMenuHidden', JSON.stringify(storageObject))
        return;
    } catch (er) {
        console.error(er);
    }
}

function logicCarrotChangeBol(elmMenuContainer, hidden = true) {
    try {
        let elmMenuButton = elmMenuContainer.querySelector('[data-elm="sidebar-menu-button"]');
        let elmMenuImg = elmMenuButton.querySelector('[data-elm="sidebar-menu-carrot"]');
        let elmHidable = elmMenuContainer.querySelector('[data-elm="sidebar-menu-hidable"]');
        let imgColor = elmMenuImg.dataset.color;
        elmMenuButton.removeChild(elmMenuImg);
        if (!hidden) {
            elmMenuButton.appendChild(carrotDown(imgColor));
            elmHidable.classList.remove('t3s-hide');
            return;
        }
        elmMenuButton.appendChild(carrotLeft(imgColor));
        elmHidable.classList.add('t3s-hide');
        return;
    } catch (er) {
        console.error(er);
    }
}

export {
    logicSideBarStart,
    logicSideBarHide,
    logicDarkModeStart,
    logicDarkCheck,
    logicDarkChange,
    logicCarrotStart,
    logicCarrotChange
}
