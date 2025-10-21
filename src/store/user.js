import { writable } from "svelte/store";
import { browser } from "$app/environment";

const storedUser = browser ? JSON.parse(localStorage.getItem("user")) : null;
export const user = writable(storedUser);

if (browser) {
  user.subscribe(value => {
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  });
}

export function logout() {
  user.set(null);
}
