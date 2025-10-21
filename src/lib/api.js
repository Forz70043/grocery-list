// src/lib/api.js
import { get } from "svelte/store";
import { user } from "../store/user.js";

const API_URL = "http://localhost:5001/api";

export async function apiFetch(endpoint, options = {}) {
  const token = get(user)?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    // Token scaduto o invalido → logout
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
}
