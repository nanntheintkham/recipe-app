// User.ts
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // Store only password hash for security
  favorites: string[]; // Array of Recipe URIs
  mealPlans: MealPlan[];
  settings: UserSettings;
}

interface MealPlan {
  date: string;
  meals: Meal[];
}

interface Meal {
  type: string; // e.g., 'breakfast', 'lunch', 'dinner'
  recipeUri: string;
}

interface UserSettings {
  dietaryPreferences: string[];
  excludedIngredients: string[];
}
