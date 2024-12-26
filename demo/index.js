import gsap from "gsap";
import { mip } from "../src/make-it-pop";


mip.each('.icon-row', (block) => {
  const items = block.querySelectorAll('.item')
  mip.onScroll.enterAndReset(block)
    .from(items, {autoAlpha: 0, y:32, stagger: 1, duration: 3})
})



// mip.each('.icon-row', (block) => {
//   const items = block.querySelectorAll('.item')
//   const tl = gsap.timeline()
//   tl.from(items, {autoAlpha: 0, y:32, stagger: 1, duration: 3})
  
//   mip.onScroll.enterAndReset(block, tl)
    
// })

// mip.each('.counter-row', (block) => {
//   const counter = block.querySelector('.counter-item')
//   mip.onScroll.enter(block).mip_count(counter, 10, 200, 2)
// })

mip.each('.counter-row', (block) => {
  const counter = block.querySelector('.counter-item')
  mip.onScroll.enter(block).mip_count(counter, 10, 200, 2)
})

mip.each('.plax-row', (block) => {
  const items = block.querySelectorAll('.item')
  mip.onScroll.scrubAndPin(block)
    .from(items[0], {y: -300}, "0")
    .from(items[1], {y: 200}, "0")
    .from(items[2], {y: 400}, "0")
})

// mip.each('.icon-row', (block) => {
//   const items = block.querySelectorAll('.icon-row__item')
//   const tl = mip.scroll.enter(block).from(items, {autoAlpha: 0, y:32, stagger: 1, duration: 3})
// })


// mip.each('.icon-row', (block) => {
//   const items = block.querySelectorAll('.icon-row__item')
//   const tl = mip.scroll.enter(block).from(items, {autoAlpha: 0, y:32, stagger: 1, duration: 3})
// })

// mip.each('.counter-row', (block) => {
//   mip.scroll.enter(block).from(block, {
//     onUpdate: (this) => {
//       mip.onUpdate.count(this, '.count', 8, 80, 2)
//     }
//   })
// })

// mip.recipes.pinnedImageSequence()