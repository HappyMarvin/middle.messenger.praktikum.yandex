import { renderDOM } from "../../utils/renderDOM";
import { ErrorBlock } from "../../components/error-block/errorBlock";
import './../index.css'
document.addEventListener('DOMContentLoaded', ()=>{
    const errorBlock = new ErrorBlock({
        error: '505',
        text: 'Уже чиним'
    });
    renderDOM('#app', errorBlock);
})
