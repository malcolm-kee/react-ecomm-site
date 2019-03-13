const PREFIX = 'react-ecomm-';

export function save(key, value, prefix = PREFIX) {
  try {
    const savedValue = JSON.stringify(value);
    window.localStorage.setItem(`${prefix}${key}`, savedValue);
    return savedValue;
  } catch (e) {
    console.error('Error in storage.save', e);
    return null;
  }
}

export function load(key, parse = true, prefix = PREFIX) {
  try {
    const value = window.localStorage.getItem(`${prefix}${key}`);
    return value && parse ? JSON.parse(value) : value;
  } catch (e) {
    console.error('Error in storage.load', e);
    return null;
  }
}

export function clear(key, prefix = PREFIX) {
  try {
    return window.localStorage.removeItem(`${prefix}${key}`);
  } catch (e) {
    console.error('Error in storage.clear', e);
    return null;
  }
}
