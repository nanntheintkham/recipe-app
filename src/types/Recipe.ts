// Recipe.ts
export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: { [key: string]: NutrientInfo };
  totalDaily: { [key: string]: NutrientInfo };
  digest: Digest[];
}

interface Ingredient {
  text: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub: Digest[] | null;
}
