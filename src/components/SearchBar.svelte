<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let searchQuery = '';

  function submitSearch() {
    if (searchQuery.trim().length > 0) {
      dispatch('search', { query: searchQuery });
    }
  }
</script>

<style>
  .search-bar {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .search-input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
  }

  .search-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .search-button:hover {
    background-color: #0056b3;
  }
</style>

<div class="search-bar">
  <input
    class="search-input"
    type="text"
    placeholder="Search for recipes..."
    bind:value={searchQuery}
    on:keyup={(event) => event.key === 'Enter' && submitSearch()}
  />
  <button class="search-button" on:click={submitSearch}>
    Search
  </button>
</div>
