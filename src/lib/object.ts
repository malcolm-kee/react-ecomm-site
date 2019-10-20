export function pick<T extends {}, KeysToPick extends keyof T>(
  oriObject: T,
  keysToPick: KeysToPick[]
): Pick<T, KeysToPick> {
  const result = {} as Pick<T, KeysToPick>;

  keysToPick.forEach(key => {
    result[key] = oriObject[key];
  });

  return result;
}

export function omit<T extends {}, KeysToOmit extends keyof T>(
  oriObject: T,
  keysToOmit: KeysToOmit[]
): Omit<T, KeysToOmit> {
  const result = Object.assign({}, oriObject);

  keysToOmit.forEach(key => delete result[key]);

  return result;
}
