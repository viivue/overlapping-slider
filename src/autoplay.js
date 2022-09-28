import {isEmptyString} from "@/utils";

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

export function runAutoplay(context){
    if(context.isAutoplay && context.isPlay){
        clearTimeout(context.autoplayInterval);

        context.autoplayInterval = setTimeout(() => {
            context.next({action: 'autoplay'});
        }, context.autoplaySpeed * 1000);
    }
}