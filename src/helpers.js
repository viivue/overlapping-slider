import {isEmptyString, loopFromIndex, setCSS} from "./utils";

export function getSlideByIndex(context, index){
    return context.slides[index];
}

export function setZIndex(context){
    let countTemp = 0;
    loopFromIndex(context.slideCount, context.currentIndex, (index, count) => {
        setCSS(getSlideByIndex(context, index), {zIndex: `${count - countTemp}`});
        countTemp++;
    });
}

export function checkAutoplay(context){
    if(context.wrapper.hasAttribute(context._attr.autoplay)){
        context.isAutoplay = true;
        const autoplay = context.wrapper.getAttribute(context._attr.autoplay);

        if(isEmptyString(autoplay)){
            // no value: autoplay with default speed
            context.options.autoplay = true;
        }else{
            // has value: update speed
            context.autoplaySpeed = parseFloat(autoplay);
        }
    }else{
        if(typeof context.options.autoplay === 'number'){
            context.autoplaySpeed = context.options.autoplay;
            context.isAutoplay = true;
        }else{
            if(context.options.autoplay === true){
                context.isAutoplay = true;
            }
        }
    }
}