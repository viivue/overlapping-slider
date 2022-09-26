import {setZIndex} from "./helpers";

export function slideForward(context, prevSlide, slide){
    const tl = gsap.timeline();
    tl.addLabel('hidePrevSlide');
    tl.to(prevSlide, {
        top: `-${context.options.offsetY}px`,
        left: `-${context.options.offsetX}px`,
        scale: context.options.scale,
        onComplete: () => setZIndex(context)
    });
    tl.addLabel('movePrevSlideToBack');
    tl.to(prevSlide, {
        top: `${context.options.offsetY}px`,
        left: `${context.options.offsetX}px`,
        scale: 1
    });

    tl.addLabel('showActiveSlide', 'movePrevSlideToBack');
    tl.to(slide, {
        top: '0',
        left: '0',
    }, 'showActiveSlide');
}

export function slideBackward(context, prevSlide, slide){
    const tl = gsap.timeline();
    tl.addLabel('hidePrevSlide');
    tl.to(prevSlide, {
        top: `${context.options.offsetY}px`,
        left: `${context.options.offsetX}px`,
        scale: 1
    });

    tl.addLabel('showActiveSlide', 'hidePrevSlide');
    tl.to(slide, {
        top: `-${context.options.offsetY}px`,
        left: `-${context.options.offsetX}px`,
        scale: context.options.scale,
        onComplete: () => setZIndex(context)
    }, 'showActiveSlide');
    tl.to(slide, {
        top: '0',
        left: '0',
        scale: 1,
    });
}