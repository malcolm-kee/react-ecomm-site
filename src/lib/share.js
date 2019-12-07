export const isShareSupported = () => !!navigator.share;

export const share = ({ title, url }) =>
  navigator.share({
    title,
    url,
  });
