/**
 * Adds body classes to indicated whether user has scrolled and current scroll direction
 * 
 * @param {HTMLElement} main The scrollable container of your site
 * @param {Integer} scrolledDelay How many pixels before the "is-scrolled" and directional classes are added
 */
export const scrollingBodyClasses = (
  main = '.main-content',
  scrolledDelay = 100
) => {
  const body = document.body;

  let header_progress = 0;
  let header_direction = 1;

  const st = ScrollTrigger.create({
    trigger: main,
    start: `+=${scrolledDelay}`,
    end: 'bottom bottom',
    onUpdate: function (self) {
      header_progress = self.progress.toFixed(2);
      header_direction = self.direction;
      if (header_progress == 0.00) {
        // scroll is at top
        body.classList.remove('is-scrolled');
      } else {
        // page has been scrolled
        body.classList.add('is-scrolled');
      }
      if (header_direction == -1) {
        // user is scrolling up
        body.classList.add('scroll-direction--up');
        body.classList.remove('scroll-direction--down');
      } else {
        // user is scrolling down
        body.classList.remove('scroll-direction--up');
        body.classList.add('scroll-direction--down');
      }
    }
  })

  return st
}