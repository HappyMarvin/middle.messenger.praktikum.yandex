const { JSDOM } = require('jsdom');
const XMLHttpRequest  = require('xhr2')
global.XMLHttpRequest = XMLHttpRequest;

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.js'] });

const dom = new JSDOM('<body><div id="app"><div></body>', { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;