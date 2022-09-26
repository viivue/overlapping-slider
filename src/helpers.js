import {loopFromIndex, setCSS} from "@/utils";

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