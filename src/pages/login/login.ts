import { renderDOM } from "../../utils/renderDOM";
import { LoginForm } from "./components/loginForm";
import './../index.css'

document.addEventListener('DOMContentLoaded', ()=>{

    const loginForm = new LoginForm({
        title: 'Логин'
    });
    renderDOM('#app', loginForm);
})
