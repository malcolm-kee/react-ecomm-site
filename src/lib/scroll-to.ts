type ScrollToOptions = {
  offset?: number;
  behavior?: ScrollOptions['behavior'];
};

export const scrollTo = (
  target: Element | null,
  { offset = 30, behavior = 'smooth' }: ScrollToOptions = {}
) => {
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
