export const API_BASE_URL = "http://192.168.0.12:8080/api/auth";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let json = {};

  try {
    json = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error("Server returned an invalid response");
  }

  if (!response.ok || json.success === false) {
    throw new Error(json.message || "Request failed");
  }

  return json;
}
