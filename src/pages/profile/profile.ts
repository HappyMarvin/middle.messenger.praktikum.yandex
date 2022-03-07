import { renderDOM } from "../../utils/renderDOM";
import './../index.css'
import { ProfileForm } from "./components/profileForm";

document.addEventListener('DOMContentLoaded', ()=>{

    const profileForm = new ProfileForm({
        title: 'Профиль', 
        className: 'profile__form'
    });
    renderDOM('#app', profileForm);
})