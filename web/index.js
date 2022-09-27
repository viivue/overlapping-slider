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
OverlappingSlider.init({
    id: 'slider-2',
    el: document.querySelector('.slider'),
});

/**
 * Demo methods
 */
// select
document.querySelectorAll('[data-select]').forEach(button => {
    button.addEventListener('click', e => {
        const id = button.getAttribute('data-id');
        const slider = OverlappingSlider.get(id);
        const select = button.getAttribute('data-select');
        switch(select){
            case 'prev':
                slider.previous();
                break;
            case 'next':
                slider.next();
                break;
            default:
                slider.select(parseInt(select));
        }
    });
});

// update
const slider1 = OverlappingSlider.get('slider-1');
slider1.update({
    duration: .7, // second, slide change duration
    offsetX: 40,
    offsetY: 40,
    scale: .2,
});