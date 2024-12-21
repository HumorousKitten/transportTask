class EventBus {
    static _subscriptions = {}
    static _lastId = 1;

    static subscribe(eventType, callback) {
        const id = this._lastId++;

        if (!this._subscriptions[eventType]) {
            this._subscriptions[eventType] = {}
        }

        this._subscriptions[eventType][id] = callback;
        return {
            unsubscribe: () => {
                if (typeof this._subscriptions[eventType] === 'undefined') {
                    return;
                }
                delete this._subscriptions[eventType][id]
                if (Object.keys(this._subscriptions[eventType]).length === 0) {
                    delete this._subscriptions[eventType];
                }
            }
        }
    }

    static publish(eventType, ...arg) {
        if (!this._subscriptions[eventType]) {
            return;
        }
        Object.keys(this._subscriptions[eventType]).forEach(id => this._subscriptions[eventType][id](...arg));
    }
}

