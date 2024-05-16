// recipeStore.ts
import { writable } from 'svelte/store';
import type { Recipe } from '../types/Recipe';
import { searchRecipes } from '../api/edamam';

// Store for the selected recipe
export const selectedRecipe = writable<Recipe | null>(null);

const createRecipeStore = () => {
  const { subscribe, set, update } = writable<Recipe[]>([]);

  return {
    subscribe,
    search: async (query: string) => {
      try {
        const recipes = await searchRecipes(query);
        set(recipes);
      } catch (error) {
        console.error('Error searching recipes:', error);
        // Handle errors appropriately
      }
    },
    getRecipeByUri: (uri: string) => {
      let foundRecipe: Recipe | undefined;
      update((recipes) => {
        foundRecipe = recipes.find((recipe) => recipe.uri === uri);
        return recipes; // This is necessary to maintain reactivity
      });
      return foundRecipe;
    },
  };
};

export const recipeStore = createRecipeStore();
