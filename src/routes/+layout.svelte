<script>
  import { user, logout } from "$store/user.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let currentUser;

  $: currentUser = $user;

  function handleLogout() {
    logout();
    goto("/login");
  }
</script>

{#if currentUser}
  <nav class="bg-gray-900 text-white p-4 flex justify-between">
    <h1 class="text-emerald-400 font-bold">Grocery List</h1>
    <button on:click={handleLogout} class="text-sm hover:text-emerald-300">Logout</button>
  </nav>
{/if}

<main class="min-h-screen bg-gray-950 text-gray-100">
  <slot />
</main>
