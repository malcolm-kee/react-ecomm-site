let tempId = Date.now();

/**
 * Generate a temporary id that is unique for the JS session.
 * There is no guarantee that this id is unique across session.
 * @param {boolean} number state if you want the id to be number
 */
export function getId(number = false) {
  return number ? tempId++ : `shopit-${tempId++}`;
}
