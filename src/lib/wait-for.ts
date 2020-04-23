export const waitFor = (ms: number) =>
  new Promise((fulfill) => setTimeout(fulfill, ms));
