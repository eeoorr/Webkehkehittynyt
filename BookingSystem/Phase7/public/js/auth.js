/* public/js/auth.js */

export function getToken() {
  return localStorage.getItem("token");
}

export function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "/login.html";
    return null;
  }
  return token;
}

export async function authFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json"
  };

  return fetch(url, {
    ...options,
    headers
  });
}
