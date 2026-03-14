import type { RouterConfig, ActiveRoute, StateData } from './models.js';
export declare const eventInstance: {
    addTrackedEvent: (element: import("tuijs-event/src/lib/models.js").EventElement, eventType: string, callback: EventListener, name?: string | null) => boolean;
    removeTrackedEvent: (element: import("tuijs-event/src/lib/models.js").EventElement, eventType: string, callback: EventListener) => boolean;
    removeNamedEvent: (name: string) => boolean;
    removeAllTrackedEvents: () => boolean;
    getNamedEvents: (name: string) => Array<import("tuijs-event/src/lib/models.js").TrackedEventListener> | false;
    getAllTrackedEvents: () => Array<import("tuijs-event/src/lib/models.js").TrackedEventListener>;
};
export declare const routerConfig: RouterConfig;
export declare const activeRoute: ActiveRoute;
export declare const stateData: StateData;
//# sourceMappingURL=globals.d.ts.map