type EventName = string | RegExp;
type Subscriber<T> = (data: T) => void;

type EmitterEvent = {
  eventName: string;
  data: unknown;
};

export interface IEvents {
  on<T>(eventName: EventName, listeners: Subscriber<T>[]): void;
  emit<T extends object>(eventName: string, ...args: T[]): void;
  off<T>(eventName: EventName, listener: (data: T) => void): void;
}

export class EventEmitter implements IEvents {
  _events: Map<EventName, Set<Subscriber<any>>>;

  constructor() {
    this._events = new Map<EventName, Set<Subscriber<any>>>();
  }

  on<T>(eventName: EventName, listeners: Subscriber<T>[]) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber<any>>());
    }
    const subscribers = this._events.get(eventName);

    if (subscribers) {
      listeners.forEach(listener => subscribers.add(listener));
    }
  }

  off<T>(eventName: EventName, listener: (data: T) => void): void {
    if (this._events.has(eventName)) {
      this._events.get(eventName)!.delete(listener);
      if (this._events.get(eventName)?.size === 0) {
        this._events.delete(eventName);
      }
    }
  }

  emit<T extends object>(eventName: string, ...args: T[]) {
    this._events.forEach((subscribers, name) => {
      if (
        (name instanceof RegExp && name.test(eventName)) ||
        name === eventName
      ) {
        subscribers.forEach((listener) => listener(args));
      }
    });
  }
}
