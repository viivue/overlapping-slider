import './styles/index.scss'
import homeHtml from "./html/home.html";
import {OverlappingSlider} from "@/_index";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

/**
 * Global init
 */
document.querySelectorAll('[data-overlapping-slider]').forEach(el => new OverlappingSlider({el}));