/**
 * API client helper for EventFlow.
 * Automatically attaches JWT authentication headers and handles API errors.
 */

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export function getStoredUser() {
  try {
    return (
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null") ||
      {}
    );
  } catch {
    return {};
  }
}

export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Automatically handle token expiry or unauthenticated status
  if (response.status === 401) {
    const isAuthRoute =
      endpoint.includes("/auth/login") || endpoint.includes("/auth/signup");

    if (!isAuthRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      window.location.href = "/Login";
    }
  }

  return response;
}
