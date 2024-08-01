'use strict';

// Checks for a valid FQDN (uses regex)
function checkFqdn$1(str) {
  if (typeof str !== "string" || str.length === 0 || str.length > 253) {
    return false;
  }
  var pattern = /^(?=.{1,253}$)(([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z]{2,}|[a-zA-Z0-9-]{2,}))$/;
  return pattern.test(str);
}

// Checks for a valid URL (uses regex)
function checkUrl$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
    var pattern = new RegExp('^(https?:\\/\\/)?' +
    // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str); // Returns false if the url is invalid
  } catch (er) {
    throw new Error(er);
  }
}

// Checks for special characters (Returns true if it matches)
function checkSpecialChar$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
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
function checkEmail$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
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
function checkSpaces$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
    return str.indexOf(' ') >= 0;
  } catch (er) {
    throw new Error(er);
  }
}

// Check for a list of text???
function checkIsList$1(input) {
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
function checkIsArray$1(input) {
  try {
    return input.constructor === Array;
  } catch (er) {
    throw new Error(er);
  }
}
function checkIsObject$1(input) {
  try {
    return input.constructor === Object;
  } catch (er) {
    throw new Error(er);
  }
}
function checkIsJson$1(input) {
  try {
    JSON.parse(input);
    return true;
  } catch (er) {
    return false;
  }
}

// Checks for number values in a string (Returns true if it matches)
function checkNum$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
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
function checkLowercase$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
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
function checkUppercase$1(str) {
  try {
    if (str === null || typeof str !== "string") {
      throw new Error(`Invalid input.`);
    }
    ;
    const regUp = /[A-Z]/;
    if (regUp.test(str) == true) {
      return true;
    }
    return false;
  } catch (er) {
    throw new Error(er);
  }
}

var check = /*#__PURE__*/Object.freeze({
    __proto__: null,
    checkEmail: checkEmail$1,
    checkFqdn: checkFqdn$1,
    checkIsArray: checkIsArray$1,
    checkIsJson: checkIsJson$1,
    checkIsList: checkIsList$1,
    checkIsObject: checkIsObject$1,
    checkLowercase: checkLowercase$1,
    checkNum: checkNum$1,
    checkSpaces: checkSpaces$1,
    checkSpecialChar: checkSpecialChar$1,
    checkUppercase: checkUppercase$1,
    checkUrl: checkUrl$1
});

/**
 * Takes an HTML template literal, parses it with the DOM parser, then extracts the element with querySelectorAll.
 */
function elmCleaner$1(templateLit) {
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
function elmCleanerTr$1(templateLit) {
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
function elmCleanerArray$1(templateLit) {
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
function parseTemplate$1(templateLit) {
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

var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    elmCleaner: elmCleaner$1,
    elmCleanerArray: elmCleanerArray$1,
    elmCleanerTr: elmCleanerTr$1,
    parseTemplate: parseTemplate$1
});

// Adds 'http://' if valid URL
function urlAddHttp$1(url) {
  try {
    if (url === null || !checkUrl$1(url)) {
      throw `Invalid input.`;
    }
    ;
    if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
      url = "http://" + url;
    }
    return url;
  } catch (er) {
    throw new Error(er);
  }
}

// Adds 'https://' if valid URL
function urlAddHttps$1(url) {
  try {
    if (url === null || !checkUrl$1(url)) {
      throw `Invalid input.`;
    }
    ;
    if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
      url = "https://" + url;
    }
    return url;
  } catch (er) {
    throw new Error(er);
  }
}

// Simple read JSON file utility
async function reqFileJson$1(file) {
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
async function reqGet$1(url) {
  try {
    const res = await fetch(url, {
      method: 'GET'
    });
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
async function reqPostJson$1(url, dataJson) {
  try {
    if (dataJson === null || dataJson === undefined) {
      throw `No JSON data provided`;
    }
    JSON.parse(dataJson);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
async function reqPostForm$1(url, dataForm) {
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

var http = /*#__PURE__*/Object.freeze({
    __proto__: null,
    reqFileJson: reqFileJson$1,
    reqGet: reqGet$1,
    reqPostForm: reqPostForm$1,
    reqPostJson: reqPostJson$1,
    urlAddHttp: urlAddHttp$1,
    urlAddHttps: urlAddHttps$1
});

const htmlTags$1 = ["html", "body", "div", "span", "applet", "object", "iframe", "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "pre", "a", "abbr", "acronym", "address", "big", "cite", "code", "del", "dfn", "em", "img", "ins", "kbd", "q", "s", "samp", "small", "strike", "strong", "sub", "sup", "tt", "var", "b", "u", "i", "center", "dl", "dt", "dd", "ol", "ul", "li", "fieldset", "form", "label", "legend", "table", "caption", "tbody", "tfoot", "thead", "tr", "th", "td", "article", "aside", "canvas", "details", "embed", "figure", "figcaption", "footer", "header", "hgroup", "menu", "nav", "output", "ruby", "section", "summary", "time", "mark", "audio", "video"];

var lists = /*#__PURE__*/Object.freeze({
    __proto__: null,
    htmlTags: htmlTags$1
});

// Adds zero in front of numbers less than 10
function addLeadZero$1(num) {
  try {
    if (num === null || typeof num !== 'number' || num > 9) {
      throw `Invalid input.`;
    }
    ;
    num = "0" + num;
  } catch (er) {
    console.error(er);
    throw new Error(er);
  }
}

/**
 * Generates a unique ID
 */
function generateUID$1() {
  return 'uid-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2);
}

var misc = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addLeadZero: addLeadZero$1,
    generateUID: generateUID$1
});

/**
 * List of RegEx variables for different patterns.
*/
const letters$1 = /^[a-zA-Z]+$/;
const lettersLower$1 = /^[a-z]+$/;
const lettersUpper$1 = /^[A-Z]+$/;
const numbers$1 = /^\d+$/;
const binary$1 = /[^01]/g;
const hexadecimal$1 = /[^0-9A-Fa-f]/g;
const special$1 = /^[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\|\;\'\:\"\,\.\<\>\?\/]+$/;

/**
 * Removes characters from a string based on a provided regex pattern.
 * @param {string} string The string to process.
 * @param {RegExp} regex The regex pattern of characters to remove from the string.
 * @return {string} The processed string with specified characters removed.
 * @throws {Error} Throws an error if the first parameter is not a string or if the second parameter is not a RegExp.
 */
function removeChar$1(string, regex) {
  if (typeof string !== 'string') {
    throw new Error(`First parameter must be a string.`);
  }
  if (!(regex instanceof RegExp)) {
    throw new Error(`Second parameter must be a RegExp.`);
  }
  return string.replace(regex, '');
}

var regex = /*#__PURE__*/Object.freeze({
    __proto__: null,
    binary: binary$1,
    hexadecimal: hexadecimal$1,
    letters: letters$1,
    lettersLower: lettersLower$1,
    lettersUpper: lettersUpper$1,
    numbers: numbers$1,
    removeChar: removeChar$1,
    special: special$1
});

const {
  elmCleaner,
  elmCleanerTr,
  elmCleanerArray,
  parseTemplate
} = dom;
const {
  checkEmail,
  checkIsArray,
  checkIsJson,
  checkIsList,
  checkIsObject,
  checkLowercase,
  checkNum,
  checkSpaces,
  checkSpecialChar,
  checkUppercase,
  checkUrl,
  checkFqdn
} = check;
const {
  reqFileJson,
  reqGet,
  reqPostForm,
  reqPostJson,
  urlAddHttp,
  urlAddHttps
} = http;
const {
  htmlTags
} = lists;
const {
  addLeadZero,
  generateUID
} = misc;
const {
  binary,
  hexadecimal,
  letters,
  lettersLower,
  lettersUpper,
  numbers,
  removeChar,
  special
} = regex;

exports.addLeadZero = addLeadZero;
exports.binary = binary;
exports.check = check;
exports.checkEmail = checkEmail;
exports.checkFqdn = checkFqdn;
exports.checkIsArray = checkIsArray;
exports.checkIsJson = checkIsJson;
exports.checkIsList = checkIsList;
exports.checkIsObject = checkIsObject;
exports.checkLowercase = checkLowercase;
exports.checkNum = checkNum;
exports.checkSpaces = checkSpaces;
exports.checkSpecialChar = checkSpecialChar;
exports.checkUppercase = checkUppercase;
exports.checkUrl = checkUrl;
exports.dom = dom;
exports.elmCleaner = elmCleaner;
exports.elmCleanerArray = elmCleanerArray;
exports.elmCleanerTr = elmCleanerTr;
exports.generateUID = generateUID;
exports.hexadecimal = hexadecimal;
exports.htmlTags = htmlTags;
exports.http = http;
exports.letters = letters;
exports.lettersLower = lettersLower;
exports.lettersUpper = lettersUpper;
exports.lists = lists;
exports.misc = misc;
exports.numbers = numbers;
exports.parseTemplate = parseTemplate;
exports.regex = regex;
exports.removeChar = removeChar;
exports.reqFileJson = reqFileJson;
exports.reqGet = reqGet;
exports.reqPostForm = reqPostForm;
exports.reqPostJson = reqPostJson;
exports.special = special;
exports.urlAddHttp = urlAddHttp;
exports.urlAddHttps = urlAddHttps;
