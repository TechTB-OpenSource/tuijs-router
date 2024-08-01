import { checkUrl } from './util.check';

// Adds 'http://' if valid URL
export function urlAddHttp(url) {
    try {
        if (url === null || !checkUrl(url)) {
            throw `Invalid input.`;
        };
        if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
            url = "http://" + url
        }
        return url;
    } catch (er) {
        throw new Error(er);
    }
}

// Adds 'https://' if valid URL
export function urlAddHttps(url) {
    try {
        if (url === null || !checkUrl(url)) {
            throw `Invalid input.`;
        };
        if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
            url = "https://" + url
        }
        return url;
    } catch (er) {
        throw new Error(er);
    }
}

// Simple read JSON file utility
export async function reqFileJson(file) {
    try {
        const res = await fetch(file);
        if (!res.ok) {
            return res;
        }
        const data = await res.json();
        return data;
    } catch (er) {
        throw new Error(er);
    }
}

// Simple GET request - This is expecting JSON data from the target URL
export async function reqGet(url) {
    try {
        const res = await fetch(url, { method: 'GET' });
        if (!res.ok) {
            throw res;
        }
        return res;
    } catch (er) {
        throw er;
    }
}

// Simple POST request. export function is expecting JSON data. The JSON.parse will throw an error if data is not valid JSON.
// NEEDS REVIEW
export async function reqPostJson(url, dataJson) {
    try {
        if (dataJson === null || dataJson === undefined) {
            throw `No JSON data provided`;
        }
        JSON.parse(dataJson);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataJson
        });
        if (!res.ok) {
            return res;
        }
        return res;
    } catch (er) {
        throw new Error(er);
    }
}
// Simple POST request. export function is expecting FormData.
// NEEDS REVIEW
export async function reqPostForm(url, dataForm) {
    try {
        if (!(dataForm instanceof FormData)) {
            throw `The data provided was not form data`;
        }
        const res = await fetch(url, {
            method: 'POST',
            body: dataForm
        });
        if (!res.ok) {
            return res;
        }
        return res;
    } catch (er) {
        throw new Error(er);
    }
}
