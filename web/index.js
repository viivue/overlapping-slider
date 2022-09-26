import './styles/index.scss'
import '@/_index'
import homeHtml from "./html/home.html";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

/**
 * Global init
 */
OverlappingSlider.init();

document.querySelectorAll('[data-prev]').forEach(button => {
    button.addEventListener('click', e => {
        const id = button.getAttribute('data-prev');
        const slider = OverlappingSlider.get(id);
        slider.previous();
    });
});

document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', e => {
        const id = button.getAttribute('data-next');
        const slider = OverlappingSlider.get(id);
        slider.next();
    });
});