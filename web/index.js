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
console.log(OverlappingSliderController)
const slider1 = OverlappingSlider.get('slider-1');


document.querySelector('[data-prev]').addEventListener('click', () => {
    slider1.previous();
})
document.querySelector('[data-next]').addEventListener('click', () => {
    slider1.next();
})