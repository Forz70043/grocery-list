// src/lib/auth.js
import { user } from "../store/user.js";
import { apiFetch } from "./api.js";

// Login function
export async function login(email, password) {
  const res = await apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res.token) {
    user.set({
      email: res.user.email,
      token: res.token,
    });
  }

  return res;
}

// Registration function
export async function registerUser(name, username, email, password) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, username, email, password }),
  });
}

// Logout function
export function logout() {
  user.set(null);
  localStorage.removeItem("user");
}
