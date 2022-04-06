export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> {
  private _listeners: { [key in E]?: Listener<M[E]>[] } = {};

  on(event: E, callback: Listener<M[E]>) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event]!.filter(
      listener => listener !== callback,
    );
  }

  emit(event: E, ...args: M[E]) {
    
    if (!this._listeners[event]) {
      return;
    }
    this._listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}