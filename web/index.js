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