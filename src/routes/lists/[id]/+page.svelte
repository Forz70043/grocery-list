<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { getListById, addItemToList, deleteItem } from "$lib/api.js";
import { onMount } from "svelte";

let list = null;
let loading = true;
let error = "";
let newItemName = "";
let newItemQuantity = "";
let success = "";

onMount(async () => {
    await loadList();
});

/**
 * Get list details including items
 */
async function loadList() {
    try {
        const id = $page.params.id;
        list = await getListById(id);
    } catch (e) {
        error = e.message;
    } finally {
        loading = false;
    }
}

async function handleAddItem() {
    if (!newItemName.trim()) return alert("Item name is required!");
    try {
        const id = $page.params.id;
        const newItem = await addItemToList(id, {
            name: newItemName,
            quantity: newItemQuantity || "1",
        });
        list.items = [...(list.items || []), newItem];
        newItemName = "";
        newItemQuantity = "";
        success = "✅ Item added successfully!";
        // hide after 2s
        setTimeout(() => (success = ""), 2000);
    } catch (e) {
        alert("Error adding item: " + e.message);
    }
}

async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        list.items = list.items.filter(item => item.id !== id);
      } catch (e) {
        alert("Error deleting item: " + e.message);
      }
    }
  }

function goBack() {
    goto("/");
}
</script>

<section class="p-8">
    <button on:click={goBack}
        class="mb-6 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition">
        ← Back to lists
    </button>

    {#if loading}
        <p class="text-gray-400">Loading list...</p>
    {:else if error}
        <p class="text-red-400">{error}</p>
    {:else if list}
        <h2 class="text-3xl font-bold text-emerald-400 mb-6">{list.name}</h2>

        {#if list.items?.length > 0}
        <ul class="space-y-3 mb-8">
            {#each list.items as item}
            <li class="flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow">
                <span>{item.name}</span>
                <button class="text-red-400 hover:text-red-600 transition" on:click={() => handleDelete(item.id)}>
                    🗑️
                </button>
            </li>
            {/each}
        </ul>
        {:else}
            <p class="text-gray-400 mb-8">No items in this list.</p>
        {/if}

        <!-- Form per aggiungere un nuovo item -->
        <div class="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 max-w-lg">
            <h3 class="text-xl font-bold text-emerald-400 mb-4">Add New Item</h3>
            <div class="space-y-4">
                <input type="text" placeholder="Item name" bind:value={newItemName}
                class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
                <input type="number" placeholder="Quantity (default 1)" bind:value={newItemQuantity}
                class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
                <button on:click={handleAddItem}
                class="w-full bg-emerald-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-emerald-400 transition">
                    ➕ Add Item
                </button>
            </div>
        </div>
    {/if}
    {#if success}
        <p class="text-emerald-400 mt-3 text-sm">{success}</p>
    {/if}
</section>
