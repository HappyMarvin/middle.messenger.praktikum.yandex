export enum METHODS {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE',
        PATCH = 'PATCH'
};
const DEFAULT_CONTENT_TYPE = 'application/json'

type Options = {
        method: METHODS;
        data?: any;
        contentType?: string;
};
export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURSEC_URL = 'https://ya-praktikum.tech';
export default class HTTPTransport {
        static API_URL = API_URL;
        protected endpoint: string;

        constructor(endpoint: string) {
                this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
        }

        public get<Response>(path = '/'): Promise<Response> {
                return this.request<Response>(this.endpoint + path);
        }

        public post<Response = void>(path: string, data?: unknown): Promise<Response> {
                return this.request<Response>(this.endpoint + path, {
                        method: METHODS.POST,
                        data,
                });
        }

        public put<Response = void>(path: string, data: unknown, contentType?: string): Promise<Response> {
                return this.request<Response>(this.endpoint + path, {
                        method: METHODS.PUT,
                        data,
                        contentType
                });
        }

        public patch<Response = void>(path: string, data: unknown): Promise<Response> {
                return this.request<Response>(this.endpoint + path, {
                        method: METHODS.PATCH,
                        data,
                });
        }

        public delete<Response>(path: string, data?: unknown): Promise<Response> {
                return this.request<Response>(this.endpoint + path, {
                        method: METHODS.DELETE,
                        data
                });
        }

        private request<Response>(url: string, options: Options = { method: METHODS.GET }): Promise<Response> {
                const { method, data } = options;

                return new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open(method, url);

                        xhr.onreadystatechange = (e) => {

                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                        if (xhr.status < 400) {
                                                resolve(xhr.response);
                                        } else {
                                                reject(xhr.response);
                                        }
                                }
                        };

                        xhr.onabort = () => reject({ reason: 'abort' });
                        xhr.onerror = () => reject({ reason: 'network error' });
                        xhr.ontimeout = () => reject({ reason: 'timeout' });

                        const contentType = options.contentType || DEFAULT_CONTENT_TYPE;
                        if (contentType === DEFAULT_CONTENT_TYPE) {
                                xhr.setRequestHeader('content-type', contentType);
                        }

                        xhr.withCredentials = true;
                        xhr.responseType = 'json';

                        if (method === METHODS.GET || !data) {
                                xhr.send();
                        } else {
                                let sendData = data;
                                if (contentType === 'application/json') sendData = JSON.stringify(data) 
                                xhr.send(sendData);
                        }
                });
        }
}