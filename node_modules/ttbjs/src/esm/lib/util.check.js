// Checks for a valid FQDN (uses regex)
export function checkFqdn(str) {
    if (typeof str !== "string" || str.length === 0 || str.length > 253) {
        return false;
    }
    var pattern = /^(?=.{1,253}$)(([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z]{2,}|[a-zA-Z0-9-]{2,}))$/;
    return pattern.test(str);
}

// Checks for a valid URL (uses regex)
export function checkUrl(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str); // Returns false if the url is invalid
    } catch (er) {
        throw new Error(er);
    }
}

// Checks for special characters (Returns true if it matches)
export function checkSpecialChar(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        const regSp = /[\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\?]/;
        if (regSp.test(str) == true) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(er);
    }
}

// Checks for a valid Email (uses regex)
export function checkEmail(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (str.match(validRegex)) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(er);
    }
}

// Checks for a space in a string
export function checkSpaces(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        return str.indexOf(' ') >= 0;
    } catch (er) {
        throw new Error(er);
    }
}

// Check for a list of text???
export function checkIsList(input) {
    try {
        // Check if the variable is a string
        if (typeof input !== 'string') {
            return false;
        }
        // Split the string by comma
        const items = input.split(',');
        // Check if all items are non-empty strings
        for (let item of items) {
            item = item.trim(); // Trim any leading or trailing whitespace
            if (item === '') {
                return false; // Empty item found
            }
        }
        return true;
    } catch (er) {
        throw new Error(er);
    }
}

export function checkIsArray(input) {
    try {
        return input.constructor === Array;
    } catch (er) {
        throw new Error(er);
    }
}

export function checkIsObject(input) {
    try {
        return input.constructor === Object;
    } catch (er) {
        throw new Error(er);
    }
}

export function checkIsJson(input) {
    try {
        JSON.parse(input);
        return true;
    } catch (er) {
        return false;
    }
}


// Checks for number values in a string (Returns true if it matches)
export function checkNum(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        const regNm = /[0-9]/;
        if (regNm.test(str) === true) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(er);
    }
}

// Checks for lowercase characters (Returns true if it matches)
export function checkLowercase(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        const regLo = /[a-z]/;
        if (regLo.test(str) == true) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(er);
    }
}

// Checks for uppercase characters (Returns true if it matches)
export function checkUppercase(str) {
    try {
        if (str === null || typeof str !== "string") {
            throw new Error(`Invalid input.`);
        };
        const regUp = /[A-Z]/;
        if (regUp.test(str) == true) {
            return true;
        }
        return false;
    } catch (er) {
        throw new Error(er);
    }
}
