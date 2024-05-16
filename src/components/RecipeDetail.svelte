<script lang="ts">
  import { selectedRecipe } from '../stores/recipeStore';
  import type { Recipe } from '../types/Recipe';

  // Local variable to hold the recipe details
  export let recipeDetail: Recipe | null = null;

  // Subscribe to the selectedRecipe store to get the current recipe details
  selectedRecipe.subscribe(($selectedRecipe) => {
    recipeDetail = $selectedRecipe;
  });

  // Function to clear the selected recipe in the store and go back to the list
  function handleBack() {
    selectedRecipe.set(null);
  }
</script>

<div class="recipe-detail-container">
  {#if recipeDetail}
    <img class="recipe-image" src={recipeDetail.image} alt={recipeDetail.label} />
    <h1 class="recipe-title">{recipeDetail.label}</h1>
    <p class="recipe-source">Source: {recipeDetail.source}</p>
    <!-- <p class="recipe-description">{recipe.description}</p> -->
    <h2>Ingredients</h2>
    <ul class="ingredients-list">
      {#each recipeDetail.ingredientLines as ingredient}
        <li>{ingredient}</li>
      {/each}
    </ul>
    <!-- Add more sections like instructions, nutrition facts, etc. -->
    <button class="back-button" on:click={handleBack}>Back to list</button>
  {:else}
    <p>No recipe details available.</p>
  {/if}
</div>

<style>
  .recipe-detail-container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .recipe-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .recipe-title {
    font-size: 2rem;
    margin-top: 1rem;
  }

  .recipe-source {
    font-style: italic;
    color: #666;
  }

  /* .recipe-description {
    margin-top: 1rem;
  } */

  .ingredients-list {
    list-style: none;
    padding: 0;
  }

  .ingredients-list li {
    margin-bottom: 0.5rem;
  }

  .back-button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .back-button:hover {
    background-color: #0056b3;
  }

  /* Add more styles as needed */
</style>
