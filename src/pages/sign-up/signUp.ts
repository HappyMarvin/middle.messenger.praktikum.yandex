import { renderDOM } from "../../utils/renderDOM";
import './../index.css'
import { SignUpForm } from "./components/signUpForm";

document.addEventListener('DOMContentLoaded', ()=>{
    const signUpForm = new SignUpForm({
        title: 'Регистрация'
    });
    renderDOM('#app', signUpForm);
})
