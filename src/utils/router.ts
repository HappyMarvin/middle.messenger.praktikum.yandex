import Block from "./block";
import { renderDOM } from "./renderDOM";

class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: Block | null;
    private _props: any;
    constructor(pathname: string, view: Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname || this._pathname === '*';
    }

    render() {
        if (!this._block) {
            const props = this._props.blockProps || {};
            this._block = new this._blockClass(props);
            renderDOM(this._props.rootQuery, this._block as Block);
            return;
        }

        this._block.show();
    }

    getPathName(): string {
        return this._pathname;
    }
}

export class Router {
    static __instance: any;
    routes: any[];
    history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any, props?: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery, blockProps: props});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    getCurrentRoute(): string {
        return this._currentRoute?.getPathName() || '';
    }
}
