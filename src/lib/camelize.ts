const hyphenPattern = /-(.)/g;

/**
 * camel-case a hyphenated string
 * @example camelize('background-color') => 'backgroundColor'
 */
export function camelize(stringWithHyphen: string): string {
  return stringWithHyphen.replace(hyphenPattern, function(_, character) {
    return character.toUpperCase();
  });
}
