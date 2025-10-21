<script>
  import { login } from "$lib/auth.js";
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";

  let email = "";
  let password = "";
  let error = "";
  const dispatch = createEventDispatcher();

  async function handleSubmit() {
    try {
      error = "";
      await login(email, password);
      goto("/"); // ✅ redirect alla homepage
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
  <div class="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
    <h1 class="text-3xl font-bold text-emerald-400 mb-6">Sign In</h1>
    {#if error}
      <p class="text-red-400 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        class="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        class="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        required
      />
      <button
        type="submit"
        class="w-full bg-emerald-500 text-gray-900 font-semibold py-2 rounded-md hover:bg-emerald-400 transition"
      >
        Login
      </button>
    </form>
  </div>
</div>
