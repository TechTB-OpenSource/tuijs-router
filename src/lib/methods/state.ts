import type { StateData } from '../models.js';
import { stateData } from '../globals.js';

/**
 * Sets the stateData Object.
 */
export function setState(data: Record<string, unknown>): void {
    Object.keys(stateData).forEach(key => delete stateData[key]);
    Object.assign(stateData, data);
}

/**
 * Returns the stateData Object.
 */
export function getState(): StateData {
    return stateData;
}

/**
 * Clears the stateData Object.
 */
export function clearState(): void {
    Object.keys(stateData).forEach(key => delete stateData[key]);
}
