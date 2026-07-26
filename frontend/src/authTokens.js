import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const storage = window.sessionStorage;

export function getAccessToken() {
  return storage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return storage.getItem(REFRESH_TOKEN);
}

export function setAuthTokens({ access, refresh }) {
  storage.setItem(ACCESS_TOKEN, access);
  storage.setItem(REFRESH_TOKEN, refresh);
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
}

export function setAccessToken(access) {
  storage.setItem(ACCESS_TOKEN, access);
}

export function clearAuthTokens() {
  storage.removeItem(ACCESS_TOKEN);
  storage.removeItem(REFRESH_TOKEN);
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
}

export function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  try {
    const [, payload] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const { exp } = JSON.parse(window.atob(padded));
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
