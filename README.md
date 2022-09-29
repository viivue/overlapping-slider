# Overlapping Slider v0.0.1

## Getting started

### Download

👉 Self hosted - [Download latest release](https://github.com/viivue/easy-tab-accordion/releases/latest)

## Initialize

To initialize an Overlapping Slider script, we have 2 ways:

1. With HTML
2. With Script

### With HTML

Using these HTML attributes to initialize without JavaScript.

```html
<!-- No Js init -->
<div data-overlapping-slider>
    <!-- Slider 1 -->
    <div style="background-color:darkblue">1</div>
    <!-- Slider 2 -->
    <div style="background-color:darkgreen">2</div>
    <!-- Slider 3 -->
    <div style="background-color:darkslategray">3</div>
    <!-- Slider 4 -->
    <div style="background-color:midnightblue">4</div>
</div>
```

### With JavaScript

Assume that we have the HTML like below

```html
<!-- Custom HTML -->
<div data-overlapping-slider="slider-1">
    <!-- Slider 1 -->
    <div style="background-color:darkblue">1</div>
    <!-- Slider 2 -->
    <div style="background-color:darkgreen">2</div>
    <!-- Slider 3 -->
    <div style="background-color:darkslategray">3</div>
    <!-- Slider 4 -->
    <div style="background-color:midnightblue">4</div>
</div>

<!-- Custom HTML -->
<div data-news-overlapping-slider>
    <!-- Slider 1 -->
    <div style="background-color:darkblue">1</div>
    <!-- Slider 2 -->
    <div style="background-color:darkgreen">2</div>
    <!-- Slider 3 -->
    <div style="background-color:darkslategray">3</div>
    <!-- Slider 4 -->
    <div style="background-color:midnightblue">4</div>
</div>
```

```js
// Init

// By default, select all elements that have "data-overlapping-slider" attribute (default name)
OverlappingSlider.init();

// Or

// select specific element
OverlappingSlider.init({
    el:document.querySelector('[data-overlapping-slider="slider-1"]')
});

// Or

// We can get all elements that have attribute name "data-news-overlapping-slider"
OverlappingSlider.init({
    selector: '[data-news-overlapping-slider]'
});
```

## Options

### Attribute options

### Selectors

| Name             | Type        | Default                     | Required | Description                                  |
|------------------|-------------|-----------------------------|----------|----------------------------------------------|
| el               | DOM element | No                          | ❌        | Wrapper element                              |
| selector         | string      | `[data-overlapping-slider]` | ❌        | CSS selector for wrapper elements            |
| data-os-swipe    | string      | No                          | ❌        | Attribute name of swipe elements             |
| data-os-autoplay | number      | No                          | ❌        | Pass a value to that data-attribute (second) |


### HTML attributes

Add these attributes on the wrapper element.

| Attribute              | As for option | 
|------------------------|---------------|
| `data-os-autoplay="2`  | `autoplay: 2` |
| `data-os-swipe`        | `swipe: true` | 

### Options pass through instance

Add these attributes on the instance when init.

| Attribute               | Description                                                    | 
|-------------------------|----------------------------------------------------------------|
| `swipe: true`           | Enable swipe option.                                           |
| `autoplay: 2`           | Enable autoplay option with 2 seconds interval.                |
| `aspect-ratio:1280/768` | Add aspect ratio for the slider item element.                  |
| `duration: .7`          | Add duration for each animation (second).                      | 
| `activeSlide: 0`        | The first active slide.                                        | 
| `offsetX: 23`           | The deviation between active and normal slide (in horizontal). | 
| `offsetY: 23`           | The deviation between active and normal slide (in vertical).   | 
| `scale: .85`            | The zoom IN/OUT value when slide change.                       | 

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

| Name                        | Description | 
|-----------------------------|-------------|
| `onPause: (data) => {}`     |             |
| `onPlay: (data) => {}`      |             |
| `onChange: (data,el) => {}` |             |

## Methods

> You can get **slider** from ***OverlappingSliderController.get( id )***

| Name       | Usage                    | Description                                             | 
|------------|--------------------------|---------------------------------------------------------|
| `play`     | `slider.play()`          |                                                         |
| `pause`    | `slider.pause()`         |                                                         |
| `select`   | `slider.select(index)`   | Select any slider item                                  |
| `previous` | `slider.previous()`      | Go to the previous slider                               |
| `next`     | `slider.next()`          | Go to the next slider                                   |
| `update`   | `slider.update(options)` | Pass an object to update the Overlapping Slider options |

Get the instance with JS init

```js
const options = {};
OverlappingSlider.init(options);

// use methods
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