export const scrollTo = (target, { offset = 30, behavior = 'smooth' } = {}) => {
  if (target) {
    try {
      const elementTop = target.getBoundingClientRect().top;
      const bodyTop = document.body.getBoundingClientRect().top;
      const elementPosition = elementTop - bodyTop;
      const scrollOffset = elementPosition - offset;
      window.scrollTo({
        top: scrollOffset,
        behavior,
      });
    } catch (err) {
      // no big deal if doesn't work
    }
  }
};
