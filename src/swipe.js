import {setCSS} from "./utils";

export function initSwipe(context){
    // check for Hammer.js
    if(!context.options.swipe) return;
    if(typeof Hammer !== 'function'){
        console.warn(`[${context.id}] Hammer.js is required to enable swipe feature.`);
        return;
    }

    // init swipe
    const hammer = new Hammer(context.wrapper, {});
    hammer.on('swipeleft', () => context.next());
    hammer.on('swiperight', () => context.previous());

    // update CSS
    setCSS(context.wrapper, {
        cursor: 'pointer'
    });
}