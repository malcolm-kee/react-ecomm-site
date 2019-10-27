const PREFIX = 'react-ecomm-';

export function save(key: string, value: any, prefix = PREFIX): string | null {
  try {
    const savedValue = JSON.stringify(value);
    window.localStorage.setItem(`${prefix}${key}`, savedValue);
    return savedValue;
  } catch (e) {
    console.error('Error in storage.save', e);
    return null;
  }
}

export function load(key: string, parse = true, prefix = PREFIX): unknown {
  try {
    const value = window.localStorage.getItem(`${prefix}${key}`);
    return value && parse ? JSON.parse(value) : value;
  } catch (e) {
    console.error('Error in storage.load', e);
    return null;
  }
}

export function clear(key: string, prefix = PREFIX): void {
  try {
    return window.localStorage.removeItem(`${prefix}${key}`);
  } catch (e) {
    console.error('Error in storage.clear', e);
  }
}
