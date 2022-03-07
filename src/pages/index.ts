import { renderDOM } from '../utils/renderDOM';
import './index.css'
import { Stub } from './stub';

document.addEventListener('DOMContentLoaded', ()=>{

    const stub = new Stub({});
    renderDOM('#app', stub);
})