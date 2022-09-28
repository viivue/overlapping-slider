import {setCSS} from "./utils";

export function initSwipe(context){
    // check for Hammer.js
    if(!context.options.swipe){
        // remove class
        context.wrapper.classList.remove(context._class.swipe);
        return;
    }
    if(typeof Hammer !== 'function'){
        console.warn(`[${context.id}] Hammer.js is required to enable swipe feature.`);
        return;
    }


    // avoid assign duplicate events
    if(typeof context.hammer !== 'undefined'){
        context.hammer.off('swipeleft swiperight');
    }

    // init swipe
    context.hammer = new Hammer(context.wrapper, {});
    context.hammer.on('swipeleft', () => context.next({action: 'swipe'}));
    context.hammer.on('swiperight', () => context.previous({action: 'swipe'}));

    // mouse cursor
    setCSS(context.wrapper, {cursor: 'grab'});
    context.wrapper.addEventListener('mousedown', () => {
        setCSS(context.wrapper, {cursor: 'grabbing'});
    });
    context.wrapper.addEventListener('mouseup', () => {
        setCSS(context.wrapper, {cursor: 'grab'});
    });

    // add class
    context.wrapper.classList.add(context._class.swipe);
}