<script lang="ts">
  import RecipeCard from './RecipeCard.svelte';
  import { recipeStore, selectedRecipe } from '../stores/recipeStore';
  import type { Recipe } from '../types/Recipe';

  let recipes: Recipe[] = [];

  // Subscribe to the recipe store to get the latest search results
  recipeStore.subscribe(($recipes) => {
    recipes = $recipes;
  });

  // Function to set the selected recipe in the store
  function selectRecipe(recipe: Recipe) {
    selectedRecipe.set(recipe);
  }
</script>

<style>
  .recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }

  .recipe-card-container {
    cursor: pointer;
  }
</style>

<div class="recipe-list">
  {#each recipes as recipe}
    <div
      class="recipe-card-container"
      tabindex="0" 
      role="button" 
      on:click={() => selectRecipe(recipe)}
      on:keydown={(event) => event.key === 'Enter' && selectRecipe(recipe)} 
    >
      <RecipeCard {recipe} />
    </div>
  {/each}
</div>
