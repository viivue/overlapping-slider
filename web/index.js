import './styles/index.scss';
import '@/_index';
import homeHtml from "./html/home.html";

/**
 * Create HTML
 */
const app = document.querySelector('#root');
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
            case 'pause':
                slider.pause();
                break;
            case 'play':
                slider.play();
                break;
            case 'prev':
                slider.previous();
                break;
            case 'next':
                slider.next();
                break;
            case 'remove-poh':
                slider.update({
                    pauseOnHover: false,
                });
                slider3_removePOH.style.display = 'none';
                slider3_addPOH.style.display = 'block';
                break;
            case 'register-poh':
                slider.update({
                    pauseOnHover: true,
                });
                slider3_removePOH.style.display = 'block';
                slider3_addPOH.style.display = 'none';
                break;
            default:
                slider.select(parseInt(select));
        }
    });
});

// update slider 1
const slider1 = OverlappingSlider.get('slider-1');
slider1.update({
    duration: .7, // second, slide change duration
    offsetX: 40,
    offsetY: 40,
    scale: .2,
});

// update slider 3
const slider3 = OverlappingSlider.get('slider-3');
const slider3_pauseBtn = document.querySelector('[data-select="pause"][data-id="slider-3"]');
const slider3_playBtn = document.querySelector('[data-select="play"][data-id="slider-3"]');
const slider3_removePOH = document.querySelector('[data-select="remove-poh"][data-id="slider-3"]');
const slider3_addPOH = document.querySelector('[data-select="register-poh"][data-id="slider-3"]');
slider3.update({
    onPause: () => {
        slider3_pauseBtn.classList.add('disabled');
        slider3_playBtn.classList.remove('disabled');
    },
    onPlay: () => {
        slider3_pauseBtn.classList.remove('disabled');
        slider3_playBtn.classList.add('disabled');
    }
});

// update slider 4
const slider4 = OverlappingSlider.get('slider-4');
slider4.update({
    onChange: data => {
        //console.log(data.currentIndex, data.action)
    }
});