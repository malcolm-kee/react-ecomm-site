export const prefetchImage = (imageUrl: string): Promise<void> => {
  return new Promise((fulfill, reject) => {
    const image = new Image();
    image.onload = () => fulfill();
    image.onerror = reject;
    image.src = imageUrl;
  });
};
