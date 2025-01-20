"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = new Map();
    }
    EventEmitter.prototype.on = function (eventName, listeners) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
        }
        var subscribers = this._events.get(eventName);
        if (subscribers) {
            listeners.forEach(function (listener) { return subscribers.add(listener); });
        }
    };
    EventEmitter.prototype.off = function (eventName, listener) {
        var _a;
        if (this._events.has(eventName)) {
            this._events.get(eventName).delete(listener);
            if (((_a = this._events.get(eventName)) === null || _a === void 0 ? void 0 : _a.size) === 0) {
                this._events.delete(eventName);
            }
        }
    };
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._events.forEach(function (subscribers, name) {
            if ((name instanceof RegExp && name.test(eventName)) ||
                name === eventName) {
                subscribers.forEach(function (listener) { return listener(args); });
            }
        });
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
