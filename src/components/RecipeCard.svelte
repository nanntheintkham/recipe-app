<script lang="ts">
    import { userStore } from '../stores/userStore';
    import type { Recipe } from '../types/Recipe';
    import { createEventDispatcher } from 'svelte';
    export let recipe: Recipe;

    const dispatch = createEventDispatcher();
    function viewRecipeDetails() {
    // Dispatch a custom event with the recipe data
        dispatch('viewDetails', { recipe });
    }

  // Function to handle favoriting a recipe
    // Function to handle favoriting a recipe
  function toggleFavorite(event: MouseEvent) {
    // Prevent the click event from triggering viewRecipeDetails
    event.stopPropagation();
    userStore.update(currentUser => {
      if (currentUser) {
        // Check if the recipe is already in favorites
        const isFavorite = currentUser.favorites.includes(recipe.uri);
        if (isFavorite) {
          // Remove from favorites
          currentUser.favorites = currentUser.favorites.filter(uri => uri !== recipe.uri);
        } else {
          // Add to favorites
          currentUser.favorites.push(recipe.uri);
      }
      return currentUser;
    }
    return currentUser; // Return as is if currentUser is null
  });
}
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      viewRecipeDetails();
    }
  }
</script>

<style>
  .recipe-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    max-width: 300px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
  }

  .recipe-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .recipe-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .recipe-content {
    padding: 1rem;
  }

  .recipe-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .recipe-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  .favorite-button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<div class="recipe-card"
  role="button" 
  tabindex="0" 
  on:click={viewRecipeDetails}
  on:keydown={handleKeyDown}
>
  <img class="recipe-image" src={recipe.image} alt={recipe.label} />
  <div class="recipe-content">
    <h3 class="recipe-title">{recipe.label}</h3>
    <p>{recipe.source}</p>
    <!-- Add more details as needed -->
    <div class="recipe-info">
      <span>Cooking Time: {recipe.totalTime} min</span>
      <button class="favorite-button" on:click={toggleFavorite}>
        ♥
      </button>
    </div>
  </div>
</div>
