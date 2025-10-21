<script>
  import { apiFetch, deleteList } from "$lib/api.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let lists = [];
  let loading = true;
  let error = "";

  onMount(async () => {
    try {
      const data = await apiFetch("/lists");
      lists = data;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this list?")) {
      try {
        await deleteList(id);
        lists = lists.filter(l => l.id !== id);
      } catch (e) {
        alert("Error deleting list: " + e.message);
      }
    }
  }

  function openList(id) {
    goto(`/lists/${id}`);
  }
</script>

<section class="p-8">
  <h2 class="text-3xl font-bold text-emerald-400 mb-6">Your Grocery Lists</h2>

  {#if loading}
    <p class="text-gray-400">Loading lists...</p>
  {:else if error}
    <p class="text-red-400">{error}</p>
  {:else if lists.length === 0}
    <p class="text-gray-400">No lists found.</p>
  {:else}
    <ul class="space-y-4">
      {#each lists as list}
        <li
          class="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition cursor-pointer"
        >
          <div on:click={() => openList(list.id)} class="flex-1">
            <h3 class="text-xl font-semibold text-emerald-300 hover:text-emerald-200">
              {list.name}
            </h3>
            <p class="text-sm text-gray-400">{list.description}</p>
          </div>

          <button
            on:click={() => handleDelete(list.id)}
            class="ml-4 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</section>
