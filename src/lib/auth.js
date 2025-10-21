// src/lib/auth.js
import { user } from "../store/user.js";
import { apiFetch } from "./api.js";

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

export async function register(email, password) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  user.set(null);
  localStorage.removeItem("user");
}
