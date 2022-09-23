import {log, setCSS} from "./utils";

export class OverlappingSlider{
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
    }

    setupData(){
        this.options = {
            ...{
                // selectors
                el: document.querySelector(`[${this._attr.container}]`), // DOM element

                // size
                aspectRatio: '1280/768', // CSS aspect ratio of each slide

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

        this.wrapper = this.options.el;
        this.slides = this.options.el.querySelectorAll(':scope > *');
        this.slideCount = this.slides.length;
    }

    setupCSS(){
        // wrapper
        setCSS(this.wrapper, {
            position: 'relative',
            'aspect-ratio': this.options.aspectRatio
        });

        // slides
        this.slides.forEach((slide, index) => {
            setCSS(slide, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                'z-index': `${this.slideCount - index}`
            });
        });
    }
}


/**
 * Global init
 */
document.querySelectorAll('[data-overlapping-slider]').forEach(el => new OverlappingSlider({el}));