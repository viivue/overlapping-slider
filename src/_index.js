import {log, setCSS, uniqueId, getNextIndex, getPreviousIndex, isGoingForward, isEmptyString} from "./utils";
import {getSlideByIndex} from "./helpers";
import {slideBackward, slideForward} from "./animation";
import {checkAutoplay, runAutoplay} from "./autoplay";


/**
 * Private class Slider
 */
class Slider{
    constructor(options){
        this._class = {
            enabled: `os-enabled`,
            active: 'os-active'
        };
        this._attr = {
            container: 'data-overlapping-slider',
            autoplay: 'data-os-autoplay'
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
                // init
                id: uniqueId('slider-'),
                selector: `[${this._attr.container}]`, // for window object only
                el: document.querySelector(`[${this._attr.container}]`), // DOM element

                // style
                aspectRatio: '1280/768', // CSS aspect ratio of each slide

                // animation
                duration: .7, // second, slide change duration
                offsetX: 23,
                offsetY: 23,
                scale: .85,

                // control
                autoplay: false, // boolean or number
                loop: true,
                activeSlide: 0, // slide index

                // events
                onPause: (data) => {
                },
                onPlay: (data) => {
                },
            }, ...this.originalOptions
        };

        if(!this.options.el){
            log(this, 'warn', 'Error, target not found!');
            return;
        }

        // wrapper
        this.wrapper = this.options.el;
        this.slides = this.options.el.querySelectorAll(':scope > *');
        this.slideCount = this.slides.length;
        this.currentIndex = this.options.activeSlide;

        // id (priority: attribute > options > auto-generate)
        const id = this.wrapper.getAttribute(this._attr.container);
        this.id = id !== null && !isEmptyString(id) ? id : this.options.id;
        this.wrapper.setAttribute(this._attr.container, this.id);

        // autoplay (priority: attribute > options)
        this.autoplaySpeed = 3; // second
        this.isAutoplay = false;
        this.autoplayInterval = undefined;
        this.isPlay = true;
        checkAutoplay(this);

        // add enabled class
        this.wrapper.classList.add(this._class.enabled);
    }

    setupCSS(){
        // wrapper
        setCSS(this.wrapper, {
            position: 'relative',
            aspectRatio: this.options.aspectRatio,
            marginBottom: `${this.options.offsetY}px`,
        });

        // slides
        this.slides.forEach((slide, index) => {
            // base CSS
            setCSS(slide, {
                position: 'absolute',
                width: '100%',
                aspectRatio: this.options.aspectRatio,
                top: `${this.options.offsetY}px`,
                left: `${this.options.offsetX}px`,
                transformOrigin: 'top left',
                zIndex: `${this.slideCount - index}`
            });
        });
    }

    update(options){
        Object.assign(this.options, options);
        this.setupCSS();
        this.select(this.options.activeSlide);
    }

    select(index, direction = undefined){
        this.direction = typeof direction === 'boolean' ? direction : isGoingForward(this.currentIndex, index);
        this.currentIndex = index;

        const slide = getSlideByIndex(this, index);
        const prevSlide = this.direction
            ? getSlideByIndex(this, getPreviousIndex(this.slideCount, this.currentIndex, this.options.loop))
            : getSlideByIndex(this, getNextIndex(this.slideCount, this.currentIndex, this.options.loop));

        // animate
        if(this.direction){
            slideForward(this, prevSlide, slide);
        }else{
            slideBackward(this, prevSlide, slide);
        }

        // add active class
        this.slides.forEach((item, i) => {
            if(i === this.currentIndex){
                item.classList.add(this._class.active);
            }else{
                item.classList.remove(this._class.active);
            }
        });

        // autoplay
        runAutoplay(this);
    }

    next(){
        this.select(getNextIndex(this.slideCount, this.currentIndex, this.options.loop), true);
    }

    previous(){
        this.select(getPreviousIndex(this.slideCount, this.currentIndex, this.options.loop), false);
    }

    pause(){
        this.isPlay = false;
        clearTimeout(this.autoplayInterval);

        // event
        this.options.onPause(this);
    }

    play(){
        this.isPlay = true;
        runAutoplay(this);

        // event
        this.options.onPlay(this);
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
        // init with element
        const el = options.el;
        if(el){
            window.OverlappingSliderController.add(new Slider({el, ...options}));
            return;
        }

        // init with selector
        const selector = options.selector || '[data-overlapping-slider]';
        document.querySelectorAll(selector).forEach(el => {
            window.OverlappingSliderController.add(new Slider({el, ...options}));
        });
    },
    // Get instance object by ID
    get: id => window.OverlappingSliderController.get(id)
};

window.OverlappingSlider.init();