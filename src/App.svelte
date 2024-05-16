<script lang="ts">
  import SearchBar from './components/SearchBar.svelte';
  import RecipeList from './components/RecipeList.svelte';
  import UserProfile from './components/UserProfile.svelte';
  import RecipeDetail from './components/RecipeDetail.svelte';
  import { userStore } from './stores/userStore';
  import { selectedRecipe } from './stores/recipeStore';
  import type { Recipe } from './types/Recipe';
  import { recipeStore } from './stores/recipeStore';

  let userLoggedIn = false;

  // Subscribe to the user store to check if a user is logged in
  userStore.subscribe(($user) => {
    userLoggedIn = $user !== null;
  });

  // Subscribe to the selectedRecipe store to track the selected recipe
  let recipeDetail: Recipe | null = null;
  selectedRecipe.subscribe(($selectedRecipe) => {
    recipeDetail = $selectedRecipe;
  });

  // Handle search event from SearchBar
  function handleSearch(event: CustomEvent) {
    recipeStore.search(event.detail.query);
  }

  // Event handler for going back to the recipe list
  function goBackToList() {
    selectedRecipe.set(null);
  }
</script>

<style>
  main {
    padding: 1rem;
    max-width: 1200px;
    margin: auto;
  }

  header {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .user-profile-container {
    float: right;
  }

  footer {
    text-align: center;
    padding: 1rem;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<header>
  <h1>Recipe Search and Meal Planner</h1>
</header>

<main>
  <div class="user-profile-container">
    <UserProfile />
  </div>
  <SearchBar on:search={handleSearch} />

  {#if recipeDetail}
    <!-- Render the RecipeDetail component -->
    <RecipeDetail {recipeDetail} on:back={goBackToList} />
  {:else}
    <!-- Render the RecipeList component -->
    <RecipeList />
  {/if}
</main>

<footer>
  <p>© 2024 Nann Theint Kham Ko Ko. All rights reserved.</p>
</footer>


