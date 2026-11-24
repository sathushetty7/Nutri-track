import { Recipe, RecipeMatchResult, DietaryPreference } from "@/types/nutrition";
import { CURATED_RECIPES } from "../database/recipesCatalog";

export interface MatchFilters {
  dietaryPreference?: DietaryPreference;
  userAllergies?: string[];
  highProteinOnly?: boolean;
  lowPrepTimeOnly?: boolean; // <= 20 mins
  vegetarianOnly?: boolean;
  veganOnly?: boolean;
  balancedOnly?: boolean;
}

/**
 * Normalizes an ingredient name string for robust partial and stemmed matching.
 * e.g., "tomatoes" -> "tomato", "diced paneer" -> "paneer"
 */
function normalizeIngredientName(raw: string): string {
  let cleaned = raw.toLowerCase().trim();
  // Strip common packaging or prep descriptors
  cleaned = cleaned.replace(
    /\b(boiled|soaked|chopped|diced|sliced|fresh|frozen|dry|cooked|grated|minced|pureed|leaves|powder|seeds|oil|pieces|organic)\b/g,
    ""
  );
  cleaned = cleaned.replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

  // Simple plurals
  if (cleaned.endsWith("ies")) {
    cleaned = cleaned.slice(0, -3) + "y";
  } else if (cleaned.endsWith("es") && !cleaned.endsWith("ches") && !cleaned.endsWith("shes")) {
    cleaned = cleaned.slice(0, -2);
  } else if (cleaned.endsWith("s") && !cleaned.endsWith("ss")) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

/**
 * Checks if a user's ingredient list matches a recipe's ingredient item.
 */
function ingredientMatches(recipeIngName: string, userAvailableList: string[]): boolean {
  const normRecipe = normalizeIngredientName(recipeIngName);
  if (!normRecipe) return false;

  for (const userIng of userAvailableList) {
    const normUser = normalizeIngredientName(userIng);
    if (!normUser) continue;

    // Direct equal, substring match in either direction
    if (
      normRecipe === normUser ||
      normRecipe.includes(normUser) ||
      normUser.includes(normRecipe)
    ) {
      return true;
    }

    // Common synonyms
    if (
      (normRecipe.includes("egg") && normUser.includes("egg")) ||
      (normRecipe.includes("chickpea") && (normUser.includes("chana") || normUser.includes("chole"))) ||
      (normRecipe.includes("paneer") && normUser.includes("cottage cheese")) ||
      (normRecipe.includes("curd") && normUser.includes("yogurt")) ||
      (normRecipe.includes("kidney bean") && normUser.includes("rajma"))
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Finds and ranks recipes based on available ingredients and user dietary restrictions.
 */
export function matchRecipesWithIngredients(
  availableIngredients: string[],
  filters: MatchFilters = {},
  recipesCatalog: Recipe[] = CURATED_RECIPES
): RecipeMatchResult[] {
  const userAllergies = (filters.userAllergies || []).map((a) => a.toLowerCase().trim());
  const cleanAvailable = availableIngredients
    .map((i) => i.trim())
    .filter((i) => i.length > 0);

  const results: RecipeMatchResult[] = [];

  for (const recipe of recipesCatalog) {
    // 1. Strict Allergy Check: NEVER recommend if recipe contains a recorded allergy
    const conflictingAllergens: string[] = [];
    if (userAllergies.length > 0 && recipe.allergens && recipe.allergens.length > 0) {
      for (const allergy of userAllergies) {
        if (recipe.allergens.some((a) => a.toLowerCase().includes(allergy) || allergy.includes(a.toLowerCase()))) {
          conflictingAllergens.push(allergy);
        }
      }
    }

    // Exclude conflicting recipes completely if user has allergies
    if (conflictingAllergens.length > 0) {
      continue;
    }

    // 2. Dietary Filter Checks
    if (filters.vegetarianOnly && !recipe.dietaryTags.some((t) => ["vegetarian", "vegan"].includes(t))) {
      continue;
    }

    if (filters.veganOnly && !recipe.dietaryTags.includes("vegan")) {
      continue;
    }

    if (filters.highProteinOnly && recipe.proteinPerServing < 15) {
      continue;
    }

    if (filters.lowPrepTimeOnly && (recipe.prepTimeMinutes + recipe.cookTimeMinutes) > 25) {
      continue;
    }

    if (filters.balancedOnly && !recipe.dietaryTags.includes("balanced")) {
      // Allow if balanced is not strict, but check if user explicitly requested
    }

    // Check user dietary preference if specified
    if (filters.dietaryPreference) {
      if (filters.dietaryPreference === "vegan" && !recipe.dietaryTags.includes("vegan")) {
        continue;
      }
      if (
        filters.dietaryPreference === "vegetarian" &&
        !recipe.dietaryTags.some((t) => ["vegetarian", "vegan"].includes(t))
      ) {
        continue;
      }
      if (
        filters.dietaryPreference === "eggetarian" &&
        !recipe.dietaryTags.some((t) => ["vegetarian", "vegan", "eggetarian"].includes(t))
      ) {
        continue;
      }
      if (filters.dietaryPreference === "gluten-free" && !recipe.dietaryTags.includes("gluten-free")) {
        continue;
      }
    }

    // 3. Ingredient Matching & Calculation
    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];

    for (const ing of recipe.ingredients) {
      if (ingredientMatches(ing.name, cleanAvailable)) {
        matchedIngredients.push(ing.name);
      } else {
        missingIngredients.push(ing.name);
      }
    }

    const totalIngCount = recipe.ingredients.length;
    let matchPercentage = 0;

    if (cleanAvailable.length === 0) {
      // If user hasn't typed ingredients yet, show full catalog with 0% match
      matchPercentage = 0;
    } else if (totalIngCount > 0) {
      matchPercentage = Math.round((matchedIngredients.length / totalIngCount) * 100);
    }

    results.push({
      recipe,
      matchPercentage,
      matchedIngredients,
      missingIngredients,
      hasAllergyConflict: false,
      conflictingAllergens: [],
    });
  }

  // 4. Sort results:
  // - Highest match percentage first
  // - If match percentage is tied, prioritize lower prep time or popular recipes
  results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    const aTotalTime = a.recipe.prepTimeMinutes + a.recipe.cookTimeMinutes;
    const bTotalTime = b.recipe.prepTimeMinutes + b.recipe.cookTimeMinutes;
    return aTotalTime - bTotalTime;
  });

  return results;
}
