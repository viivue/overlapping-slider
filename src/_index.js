import {log, setCSS, uniqueId, getNextIndex, getPreviousIndex, isGoingForward} from "./utils";
import {getSlideByIndex, setZIndex} from "./helpers";


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
                top: '20px',
                left: '20px',
                transformOrigin: 'top left',
                zIndex: `${this.slideCount - index}`
            });
        });
    }

    select(index){
        this.direction = isGoingForward(this.currentIndex, index);
        this.currentIndex = index;

        const slide = getSlideByIndex(this, index);
        const prevSlide = this.direction
            ? getSlideByIndex(this, getPreviousIndex(this.slideCount, this.currentIndex, this.options.loop))
            : getSlideByIndex(this, getNextIndex(this.slideCount, this.currentIndex, this.options.loop));

        // active CSS
        const tl = gsap.timeline();
        if(this.direction){
            tl.addLabel('hidePrevSlide');
            tl.set(prevSlide, {transformOrigin: 'top left'})
            tl.to(prevSlide, {
                top: '-20px',
                left: '-20px',
                scale: .7,
                onComplete: () => setZIndex(this)
            });
            tl.addLabel('movePrevSlideToBack');
            tl.to(prevSlide, {
                top: '20px',
                left: '20px',
                scale: 1
            });

            tl.addLabel('showActiveSlide', 'movePrevSlideToBack');
            tl.to(slide, {
                top: '0',
                left: '0',
            }, 'showActiveSlide');
        }else{
            tl.addLabel('hidePrevSlide');
            tl.to(prevSlide, {
                top: '20px',
                left: '20px',
            });

            tl.addLabel('showActiveSlide', 'hidePrevSlide');
            tl.to(slide, {
                top: '-20px',
                left: '-20px',
                scale: .7,
                onComplete: () => setZIndex(this)
            }, 'showActiveSlide');
            tl.to(slide, {
                top: '0',
                left: '0',
                scale: 1,
            });
        }
    }

    next(){
        this.select(getNextIndex(this.slideCount, this.currentIndex, this.options.loop));
    }

    previous(){
        this.select(getPreviousIndex(this.slideCount, this.currentIndex, this.options.loop));
    }
}

/**
 * Private class Slider Controller
 */
class OverlappingSliderController{
    constructor(){
        this.instances = [];
    }

    add(instance){
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }
}

/**
 * Public data
 * access via window.OverlappingSliderController
 */
window.OverlappingSliderController = new OverlappingSliderController();

/**
 * Public library object
 * access via window.OverlappingSlider
 */
window.OverlappingSlider = {
    // init new instances
    init: (options = {}) => {
        const selector = options.selector || '[data-overlapping-slider]';

        // init with selector
        document.querySelectorAll(selector).forEach(el => {
            window.OverlappingSliderController.add(new Slider({el, ...options}));
        });
    },
    // Get instance object by ID
    get: id => window.OverlappingSliderController.get(id)
};

window.OverlappingSlider.init();