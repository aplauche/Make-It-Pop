export const tweenHelpers = {
  /**
   * 
   * @param {HTMLElement} element 
   * @param {GSAPTimeline} scrollTriggerTimeline 
   * @param {*} startValue 
   * @param {*} endValue 
   * @param {*} decimals 
   * @param {*} options 
   * @param {*} position 
   * @returns {GSAPTimeline}
   */
  count: (
    element = false,
    timeline = false,
    startValue = 0,
    endValue = 100,
    decimals = 2,
    options = {},
    position = "0"
  ) => {
    if (!element) return

    let tl = timeline ? timeline : gsap.timeline()

    let counter = {value: startValue}

    // set it to start value
    element.innerText = counter.value.toFixed(decimals)

    tl.to(counter, {
      value: endValue,
      duration: 2,
      ease: "none",
      onUpdate: () => {
        element.innerText = counter.value.toFixed(decimals); 
      },
      ...options
    }, timingString)

    return tl
  },
  fadeIn: (
    element,
    timeline = false,
    options = {},
    position = "0"
  ) => {
    if(!element) return
    
    let tl = timeline ? timeline : gsap.timeline({})

    tl.from(element, {autoAlpha: 0, duration: 3}, position)

    return tl
  }
}