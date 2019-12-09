/**
 * @see https://github.com/jonschlinkert/arr-flatten
 * @license MIT
 */
export function flattenArray(nestedArray) {
  const result = [];

  flatten(nestedArray, result);

  return result;
}

function flatten(input, result) {
  let arrLen = input.length;
  let index = 0;

  while (arrLen--) {
    const current = input[index++];
    if (Array.isArray(current)) {
      flatten(current, result);
    } else {
      result.push(current);
    }
  }
}

export function includes(array, item) {
  return array.indexOf(item) !== -1;
}
