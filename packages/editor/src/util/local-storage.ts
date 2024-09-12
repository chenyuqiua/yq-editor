"use client";

export enum LocalStorageKeyEnum {
  TrackAttribute = "trackAttribute",
}

export function localStorageGet(key: string): string | undefined {
  if (typeof window === "undefined") {
    return;
  }
  const value = window.localStorage.getItem(key);
  return value === null ? undefined : value;
}
export function localStorageSet(key: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, value);
}

export function localStorageJsonSet<S = unknown>(key: string, value: S): void {
  localStorageSet(key, JSON.stringify(value));
}

export function localStorageJsonGet<S = unknown>(
  key: string,
  defaultValue?: S
): S | undefined {
  try {
    const saved = localStorageGet(key);
    const initial = JSON.parse(saved || "") as S;
    return initial || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
