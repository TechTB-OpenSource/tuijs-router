import { stateData } from '../globals.js';
/**
 * Sets the stateData Object.
 */
export function setState(data) {
    Object.keys(stateData).forEach(key => delete stateData[key]);
    Object.assign(stateData, data);
}
/**
 * Returns the stateData Object.
 */
export function getState() {
    return stateData;
}
/**
 * Clears the stateData Object.
 */
export function clearState() {
    Object.keys(stateData).forEach(key => delete stateData[key]);
}
//# sourceMappingURL=state.js.map