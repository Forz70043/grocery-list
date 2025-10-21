<script>
  import { apiFetch } from "$lib/api.js";
  import { onMount } from "svelte";

  let lists = [];

  onMount(async () => {
    try {
      const data = await apiFetch("/lists");
      lists = data;
    } catch (e) {
      console.error("Error loading lists:", e);
    }
  });
</script>

<section class="p-8">
  <h2 class="text-3xl font-bold text-emerald-400 mb-6">Your Grocery Lists</h2>

  {#if lists.length > 0}
    <ul class="space-y-4">
      {#each lists as list}
        <li class="p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
          <h3 class="text-xl font-semibold">{list.name}</h3>
          <p class="text-sm text-gray-400">{list.description}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-gray-400">No lists found.</p>
  {/if}
</section>
