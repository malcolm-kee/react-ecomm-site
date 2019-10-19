export const isShareSupported = () => !!navigator.share;

export const share = (options: { title?: string; url: string }) =>
  navigator.share(options);

declare global {
  interface Navigator {
    share: (options: {
      url: string;
      title?: string;
      text?: string;
    }) => Promise<void>;
  }
}
