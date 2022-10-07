# Overlapping Slider

[![release](https://badgen.net/github/release/viivue/overlapping-slider/)](https://github.com/viivue/overlapping-slider/releases/latest)
[![minified](https://badgen.net/badge/minified/6KB/cyan)](https://www.jsdelivr.com/package/gh/viivue/overlapping-slider)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/viivue/overlapping-slider/badge?style=rounded)](https://www.jsdelivr.com/package/gh/viivue/overlapping-slider)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f89c933-2c47-4a3f-b2ba-a32166f4f15d/deploy-status)](https://app.netlify.com/sites/overlapping-slider/deploys)

> Demo: https://overlapping-slider.netlify.app

## Getting started

### Download

👉 Self hosted - [Download the latest release](https://github.com/viivue/overlapping-slider)

## Initialize

To initialize an Overlapping Slider script, we have 2 ways:

1. With HTML
2. With Script

### With HTML

Using these HTML attributes to initialize without JavaScript.

```html
<!-- Init with HTML attribute -->
<div data-overlapping-slider>
   <div>Slide 1</div>
   <div>Slide 2</div>
   <div>Slide 3</div>
<div>
```

### With JavaScript

Assume that we have the HTML like below

```html
<div data-overlapping-slider="slider-1">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
</div>

<!-- You can use another attribute name -->
<div data-custom-overlapping-slider>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
</div>
```

```js
// Init

// By default, select all elements that have "data-overlapping-slider" attribute (default name)
OverlappingSlider.init();

// Or

// Select specific element
OverlappingSlider.init({
    el:document.querySelector('[data-overlapping-slider="slider-1"]')
});

// Or

// We can get all elements that have attribute name "data-custom-overlapping-slider"
OverlappingSlider.init({
    selector: '[data-custom-overlapping-slider]'
});
```

## Options

### HTML attributes

Add these attributes on the wrapper element and always remember that setting by an attribute always override the setting
by JS init().

| Attribute                   | As for option                        | Description                                |
|-----------------------------|--------------------------------------|--------------------------------------------|
| `data-os-autoplay="2`       | `autoplay: 2`                        | Add autoplay option through html attribute |
| `data-os-swipe`             | `swipe: true`                        | Add swipe option through html attribute    |
| `data-overlapping-slider`   | `data-overlapping-slider="slider-1"` | Pass an specific id for each slider        |

### Attribute options

### Options pass through instance

Add these attributes on the instance when init.

| Attribute               | Description                                                             | 
|-------------------------|-------------------------------------------------------------------------|
| `id: 'slider-1'`        | Assign a specific id for your slider to use Overlapping Slider methods. |
| `swipe: true`           | Enable swipe option.                                                    |
| `autoplay: 2`           | Enable autoplay option with 2 seconds interval.                         |
| `aspect-ratio:1280/768` | Add aspect ratio for the slider item element.                           |
| `duration: .7`          | Add duration for each animation (second).                               | 
| `activeSlide: 0`        | The first active slide.                                                 | 
| `offsetX: 23`           | The deviation between active and normal slide (in horizontal).          | 
| `offsetY: 23`           | The deviation between active and normal slide (in vertical).            | 
| `scale: .85`            | The zoom IN/OUT value when slide change.                                | 

```js
// demo
OverlappingSlider.init({
    el: document.querySelector('.overlapping-slider'),
    swipe: true,
    autoplay: 2,
    duration: 0.7,
    activeSlide: 1
});
```

## Events

| Name                        | Description                                   | 
|-----------------------------|-----------------------------------------------|
| `onPause: (data) => {}`     | Fired after turning off the autoplay setting. |
| `onPlay: (data) => {}`      | Fired after turning on the autoplay setting.  |
| `onChange: (data,el) => {}` | Fired after changing between each slide.      |

## Methods

> You can get **slider** from ***OverlappingSlider.get( id )***

| Name       | Usage                    | Description                                             | 
|------------|--------------------------|---------------------------------------------------------|
| `play`     | `slider.play()`          | Only for autoplay feature.                              |
| `pause`    | `slider.pause()`         | Only for autoplay feature.                              |
| `select`   | `slider.select(index)`   | Select any slider item                                  |
| `previous` | `slider.previous()`      | Go to the previous slider                               |
| `next`     | `slider.next()`          | Go to the next slider                                   |
| `update`   | `slider.update(options)` | Pass an object to update the Overlapping Slider options |

Get the instance with JS init

```js
const options = {};
OverlappingSlider.init(options);

const slider = OverlappingSlider.get(id); // pass your slider id

// use methods
slider.pause();
```

## Deployment

Run `./web` in live server

```shell
npm run dev
```

Build files from `./src` to `./dist`

```shell
npm run prod
```

Build sources from `./web` to `./build`

```shell
npm run build
```

Build files from `./src` to `./dist` then publish to `npm`

```shell
npm run publish
```