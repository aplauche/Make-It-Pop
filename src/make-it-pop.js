import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pinnedImageSequence } from './recipes/pinned-image-sequence';
import { scrollingBodyClasses } from './recipes/scrolling-body-classes';


/**
 *  TODO: Ideas for cleaning up logic
 * 
 * mip.each(item, () => { })
 * 
 * mip.scroll.enter()
 * mip.scroll.enterAndReset() 
 * mip.scroll.scrub()
 * mip.scroll.scrubAndPin() 
 * mip.scroll.sticky() TODO: build out this based on sticky half screen section OR recipe??
 * 
 * 
 * mip.recipes.pinnedImageSequence('.target-canvas-container')
 * mip.recipes.scrollingBodyClasses()
 * mip.recipes.parallax ??
 * mip.recipes.pinnedHorizontalScroll('.target-canvas-container') TODO: look into whether this makes sense
 * 
 * TODO: handle matchMedia / prefersReducedMotion / Etc
 * 
 * */


const makeItPop = () => {

  gsap.registerPlugin(ScrollTrigger);

  const scrollDefaults = {
    start: "50% bottom",
    scrub: false,
    pin: false
  }

  gsap.core.Timeline.prototype.mip_count = function (
    el, 
    start, 
    end, 
    decimals, 
    options = {}, 
    position = undefined
  ){
    let counter = {value: start}
    this.to(counter, {
        value: end,
        duration: 2,
        ease: "none",
        onUpdate: () => {
          el.innerText = counter.value.toFixed(decimals); 
        },
        ...options
      }, position)
    return this
  }

  /**
   * Utility for doing a querySelectorAll and forEach loop and then running functionality
   * 
   * @param {String} selector selector for querySelectorAll() to find and execute for each loop on
   * @param {Function} cb Function to execute scoped to each section
   */
  const each = (selector, cb) => {
    const items = document.querySelectorAll(selector)
    items.forEach(item => {
      cb(item)
    })
  }

  /**
   * Scrolltrigger generators for quickly creating scroll based animations
   */
  const onScroll = {
    /**
     * A basic scrolltrigger that will play your chained animations when the section enters the viewport
     * 
     * @param {HTMLElement} section The section to execute the trigger on
     * @param {GSAPTimeline} animation Optionally pass a preconfigured timeline to trigger
     * @param {Object} options object containing extra scroll trigger configurations
     * @returns {GSAPTimeline}
     */
    enter: (
      section,
      animation = false,
      options = {}
    ) => {
      // If a timeline is not passed, create one and return it for chaining
      let tl = animation ? animation : gsap.timeline({})

      ScrollTrigger.create({
        trigger: section,
        ...scrollDefaults,
        ...options,
        animation: tl
      })
      return tl
    },
    /**
     * A scrolltrigger with offscreen resets - pass in a timeline or tween 
     * 
     * @param {HTMLElement} section The section to execute the trigger on
     * @param {GSAPTimeline} animation Optionally pass a preconfigured timeline to trigger
     * @param {Object} options object containing extra scroll trigger configurations
     * @returns {GSAPTimeline}
     */
    enterAndReset: (
      section,
      animation = false,
      options = {}
    ) => {
      let tl = animation ? animation : gsap.timeline({})
      tl.pause(0)
      const playScrollTrigger = ScrollTrigger.create({
        trigger: section,
        ...scrollDefaults,
        ...options,
        onEnter: () => tl.play(),

      })
      const resetScrollTrigger = ScrollTrigger.create({
        trigger: section,
        onLeaveBack: () => tl.pause(0),
        start: "top bottom",
      })
      return tl
    },
    /**
     * A scrolltrigger that scrubs with scroll 
     * 
     * @param {HTMLElement} section The section to execute the trigger on
     * @param {GSAPTimeline} animation Optionally pass a preconfigured timeline to trigger
     * @param {Object} options object containing extra scroll trigger configurations
     * @returns {GSAPTimeline}
     */
    scrub: (
      section,
      animation = false,
      options = {}
    ) => {
      let tl = animation ? animation : gsap.timeline({})

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        pin: false,
        ...options,
        animation: tl
      })

      return tl
    },
    /**
     * A scrolltrigger that scrubs with scroll and pins section 
     * 
     * @param {HTMLElement} section The section to execute the trigger on
     * @param {GSAPTimeline} animation Optionally pass a preconfigured timeline to trigger
     * @param {Object} options object containing extra scroll trigger configurations
     * @returns {GSAPTimeline}
     */
    scrubAndPin: (
      section,
      animation = false,
      length = 500,
      options = {}
    ) => {
      let tl = animation ? animation : gsap.timeline({})

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${length}`,
        scrub: true,
        pin: true,
        ...options,
        animation: tl
      })

      return tl
    }
  }


  /**
   * Pre-built and ready to go recipes - plug and play 
   */
  const recipes = {
    pinnedImageSequence,
    scrollingBodyClasses
  }
  

  return {
    each,
    onScroll,
    recipes
  }
}

export const mip = makeItPop();

