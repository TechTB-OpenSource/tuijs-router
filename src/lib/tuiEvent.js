export class EventListenerManager {
    constructor() {
        // Store listeners in a Map to track them
        this.listeners = new Map();
    }

    /**
     * Method to add an event listener
     * @param {*} element 
     * @param {*} event 
     * @param {*} callback 
     */
    addListener(element, event, callback) {
        if (!this.listeners.has(element)) {
            this.listeners.set(element, new Map());
        }
        
        const elementListeners = this.listeners.get(element);
        if (!elementListeners.has(event)) {
            elementListeners.set(event, new Set());
        }

        // Store the callback in a Set to avoid duplicates
        const eventListeners = elementListeners.get(event);
        eventListeners.add(callback);

        // Add the actual event listener to the element
        element.addEventListener(event, callback);
    }

    /**
     * Method to remove an event listener
     * @param {*} element 
     * @param {*} event 
     * @param {*} callback 
     */
    removeListener(element, event, callback) {
        const elementListeners = this.listeners.get(element);
        if (elementListeners && elementListeners.has(event)) {
            const eventListeners = elementListeners.get(event);
            if (eventListeners.has(callback)) {
                // Remove the callback from the Set
                eventListeners.delete(callback);
                // Remove the event listener from the element
                element.removeEventListener(event, callback);
            }
        }
    }

    /**
     * Method to clean up all listeners for an element
     * @param {*} element 
     */
    clearListeners(element) {
        const elementListeners = this.listeners.get(element);
        if (elementListeners) {
            elementListeners.forEach((eventListeners, event) => {
                eventListeners.forEach(callback => {
                    element.removeEventListener(event, callback);
                });
            });
            this.listeners.delete(element); // Remove the entry for this element
        }
    }

    /**
     * Method to clear all listeners (if needed)
     */
    clearAllListeners() {
        this.listeners.forEach((eventListeners, element) => {
            this.clearListeners(element);
        });
        this.listeners.clear();
    }
}

export const eventListenerManager = new EventListenerManager();
