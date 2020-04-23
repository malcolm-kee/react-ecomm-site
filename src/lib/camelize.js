const hyphenPattern = /-(.)/g;

/**
 * camel-case a hyphenated string
 * @example camelize('background-color') => 'backgroundColor'
 */
export function camelize(stringWithHyphen) {
  return stringWithHyphen.replace(hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}
