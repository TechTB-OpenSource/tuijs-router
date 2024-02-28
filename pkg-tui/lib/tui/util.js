//// VERSION ////
const version = '7.5.0-002';

//// FUNCTIONS ////
// FUNCTIONS - String Cleaner
function utilElmCleaner(elmStr) {
    try {
        let parser = new DOMParser();
        let elmBody = parser.parseFromString(elmStr, 'text/html');
        let elm = elmBody.body.querySelectorAll("*");
        return elm[0];
    } catch (er) {
        console.error(er);
        return;
    }
}
// FUNCTIONS - String Cleaner Table
function utilElmCleanerTr(elmStr) {
    try {
        let elmTemp = document.createElement('table');
        elmTemp.innerHTML = elmStr;
        let elm = elmTemp.querySelector("tr");
        elmTemp.remove();
        return elm;
    } catch (er) {
        console.error(er);
        return;
    }
}

// FUNCTIONS - Delete all children
function utilElmDelChildren(parentElm) {
    try {
        if (parentElm.firstChild === null) {
            return;
        }
        while (parentElm.firstChild) {
            parentElm.removeChild(parentElm.firstChild);
        }
        return;
    } catch (er) {
        console.error(er);
        return;
    }
}

async function loadStylesheet(url) {
    return new Promise(function (resolve, reject) {
        var elmStyle = document.createElement('link');
        elmStyle.rel = 'stylesheet';
        elmStyle.href = url;
        elmStyle.onload = resolve;
        elmStyle.onerror = reject;
        document.head.appendChild(elmStyle);
    });
}

// FUNCTIONS - MISC
async function loadAllStylesheets(stylesheets) {
    try {
        // Load all stylesheets concurrently
        await Promise.all(stylesheets.map(loadStylesheet));
    } catch (er) {
        console.error(`Failed to load stylesheet: ${er}`);
    }
}

//// EXPORTS ////
export {
    utilElmCleaner,
    utilElmCleanerTr,
    utilElmDelChildren,
    loadStylesheet,
    loadAllStylesheets
}
