import {log, setCSS, uniqueId} from "./utils";
import {getSlideByIndex} from "@/helpers";

/**
 * Private class Slider
 */
class Slider{
    constructor(options){
        this._class = {};
        this._attr = {
            container: 'data-overlapping-slider'
        };

        // save options
        this.originalOptions = options;

        // init
        this.initialize();

        console.log(this)
    }

    initialize(){
        // setup
        this.setupData();
        this.setupCSS();
        this.select(this.options.activeSlide);
    }

    setupData(){
        this.options = {
            ...{
                // selectors
                el: document.querySelector(`[${this._attr.container}]`), // DOM element

                // size
                aspectRatio: '1280/768', // CSS aspect ratio of each slide

                loop: true,
                activeSlide: 0, // slide index

                // events
                onBeforeInit: (data) => {
                },
                onAfterInit: (data) => {
                },
            }, ...this.originalOptions
        };

        if(!this.options.el){
            log(this, 'warn', 'Error, target not found!');
            return;
        }

        this.id = this.options.el.getAttribute(this._attr.container);
        if(!this.id){
            this.id = uniqueId('slider-');
        }

        this.wrapper = this.options.el;
        this.slides = this.options.el.querySelectorAll(':scope > *');
        this.slideCount = this.slides.length;
        this.currentIndex = this.options.activeSlide;
    }

    setupCSS(){
        // wrapper
        setCSS(this.wrapper, {
            position: 'relative',
            'aspect-ratio': this.options.aspectRatio
        });

        // slides
        this.slides.forEach((slide, index) => {
            // base CSS
            setCSS(slide, {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
            });

            // animation CSS
            if(index === this.options.activeSlide){
                this.select(index);
            }else{
                this.deSelect(index);
            }
        });
    }

    select(index){
        const slide = getSlideByIndex(this, index);

        // active CSS
        setCSS(slide, {
            top: '0',
            left: '0',
            'z-index': '2'
        })
    }

    deSelect(index){
        const slide = getSlideByIndex(this, index);

        // active CSS
        setCSS(slide, {
            top: '20px',
            left: '20px',
            'z-index': '1'
        })
    }

    next(){

    }

    previous(){

    }
}

/**
 * Private class Slider Controller
 */
class SliderController{
    constructor(){
        this.sliders = [];
    }

    add(slider){
        this.sliders.push(slider);
    }

    get(id){
        return this.sliders.filter(slider => slider.id === id)[0];
    }
}

/**
 * Public data
 * access via window.OverlappingSliderData
 */
window.OverlappingSliderData = new SliderController();

/**
 * Public methods
 */
window.OverlappingSlider = window.OverlappingSlider || {};

// init new sliders
OverlappingSlider.init = ({selector = '[data-overlapping-slider]'} = {}) => {
    document.querySelectorAll(selector).forEach(el => window.OverlappingSliderData.add(new Slider({el})));
};
OverlappingSlider.init();

// Get slider object by ID
OverlappingSlider.get = id => window.OverlappingSliderData.get(id);