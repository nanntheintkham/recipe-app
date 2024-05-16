// edamam.ts
import type { Recipe } from '../types/Recipe';

const API_ID = '1e356109'; // Replace with your actual API ID
const API_KEY = '8396ca53c59a6a8f49099ed7e99e7a0a'; // Replace with your actual API Key

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data.hits.map((hit: any) => hit.recipe);
}
