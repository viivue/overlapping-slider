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
    hammer.on('swipeleft', () => context.next({action: 'swipe'}));
    hammer.on('swiperight', () => context.previous({action: 'swipe'}));

    // update CSS
    setCSS(context.wrapper, {
        cursor: 'pointer'
    });
}