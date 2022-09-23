export function getSlideByIndex(context, index){
    return context.slides[index];
}

export function getNextIndex(context){
    const currentIndex = context.currentIndex;
    let newIndex = currentIndex + 1;

    if(newIndex >= context.slideCount){
        if(context.options.loop){
            newIndex = 0;
        }else{
            newIndex = context.slideCount - 1;
        }
    }
    return newIndex;
}

export function getPreviousIndex(context){
    const currentIndex = context.currentIndex;
    let newIndex = currentIndex - 1;

    if(newIndex < 0){
        if(context.options.loop){
            newIndex = context.slideCount - 1;
        }else{
            newIndex = 0;
        }
    }

    return newIndex;
}