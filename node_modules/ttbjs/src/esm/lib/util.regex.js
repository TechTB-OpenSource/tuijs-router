/**
 * List of RegEx variables for different patterns.
*/
export const letters = /^[a-zA-Z]+$/;
export const lettersLower = /^[a-z]+$/;
export const lettersUpper = /^[A-Z]+$/;
export const numbers = /^\d+$/;
export const binary = /[^01]/g;
export const hexadecimal = /[^0-9A-Fa-f]/g;
export const special = /^[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\|\;\'\:\"\,\.\<\>\?\/]+$/;

/**
 * Removes characters from a string based on a provided regex pattern.
 * @param {string} string The string to process.
 * @param {RegExp} regex The regex pattern of characters to remove from the string.
 * @return {string} The processed string with specified characters removed.
 * @throws {Error} Throws an error if the first parameter is not a string or if the second parameter is not a RegExp.
 */
export function removeChar(string, regex) {
    if (typeof string !== 'string') {
        throw new Error(`First parameter must be a string.`);
    }
    if (!(regex instanceof RegExp)) {
        throw new Error(`Second parameter must be a RegExp.`);
    }
    return string.replace(regex, '');
}
