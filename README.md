# Make It Pop!

This library serves as a wrapper for GSAP and ScrollTrigger to make some of the most common setups faster and easier to execute.

## Installation

At some point this will be made into an NPM module. Currently development is still very active and it is too soon to publish.

If you would like to use in a project, fork this repo to freeze the state.

Then you can make any changes you desire, but still have the option to pull in future updates.

Copy the contents of the src directory into a project and import the helpers where required.

## Usage

The library can be broken into a few sections:

### Helpers

The `each` helper allows you to quickly search a page for instances of a section and then wraps functionality within a scoped forEach loop. This is very useful for creating multiple scroll trigger instances.

```
mip.each('.example', (block) => {
  // Configure actions scoped to this block...
  // const items = block.querySelectorAll('.item')
})
```

### Scroll Utilities

The scroll utilities return timelines linked to various ScrollTrigger configurations.

You optionally pass in a preconfigured timeline or chain just as you would with native gsap.

```
mip.onScroll.enter('.trigger')
  .from('.example', {autoAlpha: 0, y:32, stagger: 1, duration: 3})
```
or
```
  const tl = gsap.timeline()
  tl.from('.example', {autoAlpha: 0, y:32, stagger: 1, duration: 3})
  mip.onScroll.enter('.trigger', tl)
```

Generally these will be used within a `mip.each` loop in order to scope the selectors on a per-section basis.

```
mip.each('.example', (block) => {
  const items = block.querySelectorAll('.item')
  mip.onScroll.enter(block)
    .from(items, {autoAlpha: 0, y:32, stagger: 1, duration: 3})
})
```

**NOTE** All scroll triggers use a default view threshold (or start value) of "top 50%". Which means the animation will play when the top of the trigger element hits 50% of the viewport. You can customize this default, or overide it per instance. 

#### Scroll Utility Methods

- **enter** - Plays the timeline when the trigger element hits the view threshold. 
- **enterAndReset** - Uses GSAP offscreen reset logic by configuring two seperate triggers. The animation plays when the trigger hits the view threshold, but will reset when scrolling up only once the trigger is completely offscreen (using onLeaveBack with value "top bottom"). 
- **scrub** - Scroll trigger with scrub, but no pinning. Begins scrub as soon as trigger enters viewport and ends only once trigger completely leaves. This is useful for parallax effects
- **scrubAndPin** Similar to scrub, but includes pinning and a "duration" parameter to control how long to pin the section for

Additional scroll methods are planned to streamline "sticky" functionality as well as overlapping sections, and horizontal scroll with pinning.

### Recipes 

Recipes are stand-alone functions that can be called to accomplish specific effects or functionality.

#### pinnedImageSequence

This sets up a common effect using a pinned canvas element to play through an animation of image frames on scroll (as made famous by the AirPods web page). 

#### scrollingBodyClasses

This adds helpful classes to the body element based on whether the page has been scrolled, and what the current scroll direction is. Helpful for headers or other sticky elements that pin and unpin based on scroll position/direction.