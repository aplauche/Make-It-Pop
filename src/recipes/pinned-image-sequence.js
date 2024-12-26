/**
 * Create an "airpods" style canvas image sequence animation that is pinned and tied to scroll
 * 
 * Images should be named 0001.jpg - XXXX.jpg
 * 
 * @param {HTMLElement} trigger Triggering element
 * @param {String} baseImageUrl Base URL to retrieve image frames 
 * @param {Integer} frameCount Number of images
 * @param {Integer} scrollLength How long the scroll action should be to play through all images (px)
 */
export const pinnedImageSequence = (
  trigger = false,
  baseImageUrl = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/",
  frameCount = 147,
  scrollLength = 3500
) => {
  if(
    !trigger
  ) return
  
  const triggerContainer = document.querySelector(trigger);
  const canvas = triggerContainer.querySelector('canvas');

  if (canvas) {
    const context = canvas.getContext("2d");
    // Images should be named 0001.jpg and count up from there - modify the naming convention as needed
    const getCurrentFrameImage = (index) => `${baseImageUrl}${(index + 1).toString().padStart(4, "0")}.jpg`;

    const images = [];
    const playhead = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getCurrentFrameImage(i);
      images.push(img);
    }

    // Function to resize canvas to fit the trigger element dimensions
    const resizeCanvas = () => {
      const triggerWidth = triggerContainer.offsetWidth;
      const triggerHeight = triggerContainer.offsetHeight;

      canvas.width = triggerWidth;
      canvas.height = triggerHeight;
      render(); // Redraw image after resize
    };

    // Set initial canvas size based on trigger element
    resizeCanvas();

    // Handle window resize event to adjust canvas size
    window.addEventListener('resize', resizeCanvas);

    gsap.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: `+=${scrollLength}`,
        start: "top top",
        end: duration,
        pin: true,
        scrub: 0.5
      },
      onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
    });

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const image = images[playhead.frame];

      // Calculate the scaling factor based on the trigger element size
      const scaleFactor = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);

      // Calculate width and height based on the scale factor
      const imageWidth = image.naturalWidth * scaleFactor;
      const imageHeight = image.naturalHeight * scaleFactor;

      // Calculate position to center the image (cover the entire canvas)
      const offsetX = (canvas.width - imageWidth) / 2;
      const offsetY = (canvas.height - imageHeight) / 2;

      // Draw the image, covering the canvas, potentially cropped
      context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, offsetX, offsetY, imageWidth, imageHeight);
    }

    // Make sure to manually render starting image
    images[0].onload = render;
  }
};
