type ScrollToOptions = {
  behavior?: ScrollOptions['behavior'];
};

export const scrollIntoView = (
  target: Element | undefined | null,
  { behavior = 'smooth' }: ScrollToOptions = {}
) => {
  if (target) {
    try {
      target.scrollIntoView({
        behavior,
      });
    } catch (err) {
      // Do nothing, not a big deal
    }
  }
};
