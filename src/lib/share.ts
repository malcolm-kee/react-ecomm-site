export const isShareSupported = () => !!navigator.share;

export const share = (options: { title?: string; url: string }) =>
  navigator.share(options);
