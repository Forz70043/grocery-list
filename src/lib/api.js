// src/lib/api.js
//import { browser } from "$app/environment";
import { get } from "svelte/store";
import { user } from "../store/user.js";

const API_URL = "http://localhost:5001/api";

// Generic API fetch helper
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
    // Token expired or invalid → logout
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

// ✅ DELETE helper
export async function deleteList(id) {
  return apiFetch(`/lists/${id}`, { method: "DELETE" });
}

// ✅ GET single list (for detail view)
export async function getListById(id) {
  return apiFetch(`/lists/${id}`);
}

// ✅ POST new item
export async function addItemToList(listId, itemData) {
  return apiFetch(`/lists/${listId}/items`, {
    method: "POST",
    body: JSON.stringify(itemData),
  });
}

// ✅ DELETE item
export async function deleteItem(id) {
  return apiFetch(`/items/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}