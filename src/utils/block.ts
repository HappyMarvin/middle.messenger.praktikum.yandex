import EventBus from './event-bus';
import { replaceAll } from './helpers';

export type Nullable<T> = T | null;
export type Keys<T extends Record<string, unknown>> = keyof T;
export type Values<T extends Record<string, unknown>> = T[Keys<T>];

export interface IBlockProps {
  events?: Record<string, any>
}

type Events = Values<typeof Block.EVENTS>;

export type IChildren = Record<string, Block>

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = Math.random().toString(36).substr(2, 9);

  protected _element: Nullable<HTMLElement> = null;
  public props: P;
  protected children: IChildren = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};
  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(propsAndChildren?: any) {
    if (!propsAndChildren) propsAndChildren = {};
    const eventBus = new EventBus<Events>();
    const { props, children } = this.getPropsAndChildren(propsAndChildren);

    this.children = children;
    this.initChildren(propsAndChildren)

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

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props?: any) {
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.initChildren(this.children);
    this._render();
  }

  componentDidUpdate(oldProps?: any, newProps?: any): boolean | Promise<boolean> {
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
    return document.createDocumentFragment()
  };

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === document.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== document.DOCUMENT_FRAGMENT_NODE) {
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
        const oldProp = {...target};
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, { ...target });
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
      }else {
      props[key] = `<div data-id="id-${child.id}"></div>`
      }
    });
    let htmlString: string = template({ ...props, children: this.children }); 
    htmlString = replaceAll(htmlString,'>,<', '><');
    fragment.innerHTML = htmlString;     
    Object.entries(this.children).forEach(([, child]) => {
      if (Array.isArray(child)) {
        child.forEach(component => {
            const stub = fragment.content.querySelector(`[data-id="id-${component.id}"]`);
          if (!stub) {
          return;
        } 
          stub.replaceWith(component.getContent()); 
        })
      } else {
        const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
        if (!stub) {
          return;
        } 
        stub.replaceWith(child.getContent());
      } 
    });
    return fragment.content;
  }


  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  initChildren(props?: any) {

  }
}