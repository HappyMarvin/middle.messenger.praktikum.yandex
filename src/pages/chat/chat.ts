import { renderDOM } from "../../utils/renderDOM";
import './../index.css'
import { MainChat } from "./components/mainChat";

document.addEventListener('DOMContentLoaded', ()=>{

    const mainChat = new MainChat({});
    renderDOM('#app', mainChat);
})
