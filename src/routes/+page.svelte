<script>
  import { apiFetch, deleteList } from "$lib/api.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let lists = [];
  let loading = true;
  let error = "";
  let showModal = false;
  let newListName = "";
  let newListDescription = "";

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

  async function handleAddList() {
    if (!newListName.trim()) return alert("List name is required!");
    try {
      const newList = await apiFetch("/lists", {
        method: "POST",
        body: JSON.stringify({
          name: newListName,
          description: newListDescription,
        }),
      });
      lists = [...lists, newList];
      newListName = "";
      newListDescription = "";
      showModal = false;
    } catch (e) {
      alert("Error creating list: " + e.message);
    }
  }
</script>

<section class="p-8">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-3xl font-bold text-emerald-400">Your Grocery Lists</h2>
    <button
      on:click={() => (showModal = true)}
      class="bg-emerald-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-400 transition"
    >
      ➕ Add List
    </button>
  </div>

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
          <div on:click={() => openList(list.id)} class="flex-1" aria-label="Open List" aria-roledescription="button">
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

{#if showModal}
  <!-- Modal Overlay -->
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div class="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
      <h3 class="text-2xl font-bold text-emerald-400 mb-4">Create New List</h3>
      <input
        type="text"
        placeholder="List name"
        bind:value={newListName}
        class="w-full mb-3 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <textarea
        placeholder="Description (optional)"
        bind:value={newListDescription}
        class="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
      ></textarea>
      <div class="flex justify-end gap-3">
        <button
          on:click={() => (showModal = false)}
          class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          on:click={handleAddList}
          class="px-4 py-2 bg-emerald-500 text-gray-900 rounded-lg font-semibold hover:bg-emerald-400 transition"
        >
          Create
        </button>
      </div>
    </div>
  </div>
{/if}
