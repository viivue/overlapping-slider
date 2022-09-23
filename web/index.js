import './styles/index.scss'
import homeHtml from "./html/home.html";
import {Greeting} from "@/_index";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

new Greeting('Phuc Bui');