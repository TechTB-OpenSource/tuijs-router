/**
 * Takes an HTML template literal, parses it with the DOM parser, then extracts the element with querySelectorAll.
 */
export function elmCleaner(templateLit) {
    try {
        let parser = new DOMParser();
        let elmBody = parser.parseFromString(templateLit, 'text/html');
        let elms = elmBody.body.querySelectorAll("*");
        return elms[0];
    } catch (er) {
        console.error(er);
        throw new Error(er);
    }
}

/**
 * Takes an HTML table row template literal, parses it with the DOM parser, then extracts the element with querySelectorAll.
 */
export function elmCleanerTr(templateLit) {
    try {
        let elmTemp = document.createElement('table');
        elmTemp.innerHTML = templateLit;
        let elms = elmTemp.querySelector("tr");
        elmTemp.remove();
        return elms;
    } catch (er) {
        console.error(er);
        throw new Error(er);
    }
}

/**
 * Takes an HTML template literal, parses it with the DOM parser, then extracts the NodeList. The list is then returned as an array.
 */
export function elmCleanerArray(templateLit) {
    try {
        let parser = new DOMParser();
        let elmBody = parser.parseFromString(templateLit, 'text/html');
        let elms = elmBody.body.querySelectorAll("*");
        return Array.from(elms);
    } catch (er) {
        console.error(er);
        throw new Error(er);
    }
}

/**
 * Parses template literal with 'template' tag
 */
export function parseTemplate(templateLit) {
    try {
        let parser = new DOMParser();
        let doc = parser.parseFromString(templateLit, 'text/html');
        let template = doc.querySelector('template');
        if (!template) {
            throw new Error('No template tag found in the provided string.');
        }
        return template.content;
    } catch (er) {
        console.error(er);
        throw new Error(er);
    }
}
