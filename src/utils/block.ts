import EventBus from './event-bus';

export type Nullable<T> = T | null;
export type Keys<T extends Record<string, unknown>> = keyof T;
export type Values<T extends Record<string, unknown>> = T[Keys<T>];

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = Math.random().toString(36).substr(2, 9);

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};
  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(propsAndChildren?: P) {
    const eventBus = new EventBus<Events>();
    const { props, children } = this.getPropsAndChildren(propsAndChildren);

    this.children = children;
    this.initChildren()

    this.getStateFromProps(props)

    this.props = this._makePropsProxy(props || {} as P);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  init() {
    // this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  getPropsAndChildren = (propsAndChildren: any) => {
    const props: any = {};
    const children: any = {};
    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(v => v instanceof Block)) {
        props[key] = value;
      } else {
        props[key] = value;
      }
    })
    return { props, children }
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild! as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
      this._removeEvents();
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment
  };

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100)
    }

    return this.element!;
  }

  _makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }
 
    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  compile(template: any, props: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        props[key] = child.map(ch => `<div data-id="id-${ch.id}"></div>`);
      }
      props[key] = `<div data-id="id-${child.id}"></div>`
    });

    const htmlString = template({ ...props, children: this.children }); 
    fragment.innerHTML = htmlString;
    Object.entries(this.children).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      } 
      stub.replaceWith(child.getContent());    
    });
    return fragment.content;
  }


  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  initChildren(prop?: any) {

  }
}