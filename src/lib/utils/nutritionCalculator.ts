import { ActivityLevel, NutritionGoalType } from "@/types/nutrition";

export interface BMRParams {
  weightKg: number;
  heightCm: number;
  age: number;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
}

export interface SuggestedTargets {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  bmr: number;
  tdee: number;
  explanation: string;
}

/**
 * Activity Multipliers for Total Daily Energy Expenditure (TDEE).
 */
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Desk job, little to no exercise
  light: 1.375, // Light exercise 1-3 days/week
  moderate: 1.55, // Moderate exercise 3-5 days/week
  active: 1.725, // Hard exercise 6-7 days/week
  very_active: 1.9, // Very hard training or physical job
};

/**
 * Calculates BMR using the Mifflin-St Jeor equation.
 */
export function calculateBMR(params: BMRParams): number {
  const { weightKg, heightCm, age, gender } = params;
  if (!weightKg || !heightCm || !age) return 1800; // baseline fallback

  // Mifflin-St Jeor:
  // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;

  if (gender === "male") {
    return Math.round(base + 5);
  } else if (gender === "female") {
    return Math.round(base - 161);
  } else {
    // Neutral average
    return Math.round(base - 78);
  }
}

/**
 * Calculates suggested calorie and macro targets based on profile parameters.
 * Note: Clearly designated as general estimates, not medical prescriptions.
 */
export function calculateSuggestedTargets(
  params: BMRParams,
  activityLevel: ActivityLevel = "moderate",
  goal: NutritionGoalType = "balanced_nutrition"
): SuggestedTargets {
  const bmr = calculateBMR(params);
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.4;
  const maintenanceTDEE = Math.round(bmr * multiplier);

  let targetCalories = maintenanceTDEE;
  let carbPct = 0.45;
  let proteinPct = 0.25;
  let fatPct = 0.30;
  let explanation = "Calibrated for everyday sustained energy and general wellness.";

  switch (goal) {
    case "weight_management":
      // Moderate deficit ~ 350-400 kcal
      targetCalories = Math.max(1300, maintenanceTDEE - 380);
      carbPct = 0.35;
      proteinPct = 0.35; // Higher protein to preserve lean muscle
      fatPct = 0.30;
      explanation = "Moderate calorie deficit with elevated protein to support satiety and lean mass retention.";
      break;

    case "build_muscle":
      // Slight surplus ~ 250 kcal
      targetCalories = maintenanceTDEE + 280;
      carbPct = 0.42;
      proteinPct = 0.30;
      fatPct = 0.28;
      explanation = "Controlled calorie surplus paired with high protein to support muscular hypertrophy and recovery.";
      break;

    case "maintain_weight":
      targetCalories = maintenanceTDEE;
      carbPct = 0.50;
      proteinPct = 0.20;
      fatPct = 0.30;
      explanation = "Iso-caloric target engineered to sustain current body mass with steady metabolic vitality.";
      break;

    case "balanced_nutrition":
    default:
      targetCalories = maintenanceTDEE;
      carbPct = 0.45;
      proteinPct = 0.25;
      fatPct = 0.30;
      explanation = "Harmonious macronutrient distribution promoting balanced energy, gut health, and daily vitality.";
      break;
  }

  // 1g Protein = 4 kcal
  // 1g Carbs = 4 kcal
  // 1g Fat = 9 kcal
  const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
  const carbsGrams = Math.round((targetCalories * carbPct) / 4);
  const fatGrams = Math.round((targetCalories * fatPct) / 9);
  const fiberGrams = Math.round((targetCalories / 1000) * 14); // Recommended 14g per 1000 kcal

  return {
    calories: targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    bmr,
    tdee: maintenanceTDEE,
    explanation,
  };
}

/**
 * Returns supportive, guilt-free feedback for user's daily progress.
 */
export function getEncouragingFeedback(consumed: number, target: number): {
  message: string;
  badge: "on-track" | "approaching" | "surplus" | "beginning";
  percentage: number;
} {
  if (target <= 0) target = 2000;
  const percentage = Math.round((consumed / target) * 100);

  if (consumed === 0) {
    return {
      message: "Ready to nourish your body today. Log your first meal to get started.",
      badge: "beginning",
      percentage: 0,
    };
  }

  if (percentage < 65) {
    return {
      message: `You're making steady progress today. ${target - consumed} kcal remaining in your daily budget.`,
      badge: "beginning",
      percentage,
    };
  }

  if (percentage >= 65 && percentage <= 95) {
    return {
      message: "Great rhythm! You're comfortably pacing towards your nutritional targets.",
      badge: "approaching",
      percentage,
    };
  }

  if (percentage > 95 && percentage <= 110) {
    return {
      message: "Target met! Excellent nutritional balance achieved today.",
      badge: "on-track",
      percentage,
    };
  }

  return {
    message: "Target reached. Consistency over time is what matters most for long-term health.",
    badge: "surplus",
    percentage,
  };
}
