export function getRandomEmail() {
  const randomString =
    shuffleArray(
      new Date()
        .toLocaleDateString('de-De', {
          era: 'long',
          month: 'long',
          weekday: 'long',
        })
        .replace(/\s/, '')
        .split('')
        .slice(0, 6)
    ).join('') + new Date().getMilliseconds();

  return `me${randomString}@gmail.com`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
