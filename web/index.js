import './styles/index.scss'
import '@/_index'
import homeHtml from "./html/home.html";

import {gsap} from "gsap";
import Flip from "gsap/Flip";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

/**
 * Global init
 */
OverlappingSlider.init();