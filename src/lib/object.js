export function pick(oriObject, keysToPick) {
  const result = {};

  keysToPick.forEach((key) => {
    result[key] = oriObject[key];
  });

  return result;
}

export function omit(oriObject, keysToOmit) {
  const result = Object.assign({}, oriObject);

  keysToOmit.forEach((key) => delete result[key]);

  return result;
}
