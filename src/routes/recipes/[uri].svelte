<script context="module" lang="ts">
  import { recipeStore } from '../../stores/recipeStore';
  import type { Load } from '@sveltejs/kit';
  import type { Recipe } from '../../types/Recipe';

  // Adjust the LoadParams interface to match the expected type
  interface LoadParams {
    params: Partial<Record<string, string>>;
  }

  export const load: Load = async ({ params }: LoadParams) => {
    // Use a type guard to check if uri is a string
    const uri = params.uri;
    if (typeof uri === 'string') {
      const decodedUri = decodeURIComponent(uri);
      const recipe = recipeStore.getRecipeByUri(decodedUri);

      if (recipe) {
        return { props: { recipe } };
      } else {
        return { status: 404, error: new Error('Recipe not found') };
      }
    } else {
      return { status: 404, error: new Error('Recipe URI is undefined') };
    }
  };
</script>

<script lang="ts">
  // The recipe prop will be populated by the load function
  export let recipe: Recipe;
</script>

<style>
  .recipe-detail-container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
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

  /* Add more styles as needed */
</style>

<div class="recipe-detail-container">
  {#if recipe}
    <img class="recipe-image" src={recipe.image} alt={recipe.label} />
    <h1 class="recipe-title">{recipe.label}</h1>
    <p>{recipe.source}</p>
    <!-- Add more details about the recipe here -->
    <p>Cooking Time: {recipe.totalTime} minutes</p>
    <p>Servings: {recipe.yield}</p>
    <h2>Ingredients</h2>
    <ul>
      {#each recipe.ingredientLines as line}
        <li>{line}</li>
      {/each}
    </ul>
    <!-- You can add more sections like instructions, nutrition facts, etc. -->
  {:else}
    <p>Recipe details are loading or not available...</p>
  {/if}
</div>
