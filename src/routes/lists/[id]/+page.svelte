<script>
  import { page } from "$app/stores";
  import { getListById } from "$lib/api.js";
  import { onMount } from "svelte";

  let list = null;
  let loading = true;
  let error = "";

  onMount(async () => {
    try {
      const id = $page.params.id;
      list = await getListById(id);
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<section class="p-8">
  {#if loading}
    <p class="text-gray-400">Loading list...</p>
  {:else if error}
    <p class="text-red-400">{error}</p>
  {:else if list}
    <h2 class="text-3xl font-bold text-emerald-400 mb-6">{list.name}</h2>

    {#if list.items?.length > 0}
      <ul class="space-y-3">
        {#each list.items as item}
          <li class="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <p class="font-medium">{item.name}</p>
            <p class="text-sm text-gray-400">Qty: {item.quantity}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-400">No items in this list.</p>
    {/if}
  {/if}
</section>
