export type DietaryPreference =
  | "omnivore"
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "eggetarian"
  | "keto"
  | "gluten-free";

export type NutritionGoalType =
  | "maintain_weight"
  | "build_muscle"
  | "balanced_nutrition"
  | "weight_management";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface UserProfile {
  id: string;
  email?: string;
  fullName: string;
  age?: number;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  heightCm?: number;
  weightKg?: number;
  dietaryPreference: DietaryPreference;
  allergies: string[];
  activityLevel: ActivityLevel;
  nutritionGoal: NutritionGoalType;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionGoal {
  id: string;
  userId: string;
  caloriesTarget: number;
  proteinTarget: number; // in grams
  carbsTarget: number; // in grams
  fatTarget: number; // in grams
  fiberTarget?: number; // in grams
  updatedAt: string;
}

export interface MacroBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export type NutritionFacts = MacroBreakdown;

export interface Food {
  id: string;
  name: string;
  serving: string;
  facts: NutritionFacts;
}

export interface VerifiedFoodItem {
  id: string;
  name: string;
  category: "staple" | "curry" | "bread" | "snack" | "salad" | "fruit" | "protein" | "beverage" | "dessert";
  defaultUnit: string;
  gramsPerUnit: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g?: number;
  aliases: string[];
  isCommonIndianFood?: boolean;
}

export interface DetectedFoodItem {
  id: string;
  foodName: string;
  matchedFoodId?: string;
  quantity: number;
  servingUnit: string;
  weightGrams: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  confidenceScore?: number;
  source: "verified_db" | "ai_estimate" | "custom";
}

export interface Meal {
  id: string;
  userId: string;
  mealName: string;
  mealType: MealType;
  mealImageUrl?: string;
  mealDate: string; // YYYY-MM-DD
  mealTime?: string; // HH:mm
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  items: DetectedFoodItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number | string;
  unit: string;
  isOptional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  caloriesPerServing: number;
  proteinPerServing: number;
  carbsPerServing: number;
  fatPerServing: number;
  fiberPerServing?: number;
  dietaryTags: string[];
  allergens: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  cuisine: string;
  isPopular?: boolean;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  hasAllergyConflict: boolean;
  conflictingAllergens: string[];
}

export interface DailyNutritionSummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  mealsCount: number;
  meals: Meal[];
}
