const KEY = "ml_staff_token";

export function getStaffToken() {
  if (typeof window === "undefined") return "";
  try {
    return window.sessionStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

export function setStaffToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.sessionStorage.setItem(KEY, token);
    else window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
