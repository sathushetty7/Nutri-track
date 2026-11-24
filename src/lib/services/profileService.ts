import { createClient, isSupabaseConfigured } from "../supabase/client";
import { NutritionGoal, UserProfile } from "@/types/nutrition";

const DEMO_PROFILE_KEY = "nutritrack_demo_profile";
const DEMO_GOALS_KEY = "nutritrack_demo_goals";

const DEFAULT_PROFILE: UserProfile = {
  id: "demo-user-101",
  email: "sathwik@nutritrack.io",
  fullName: "Sathwik Kumar",
  age: 23,
  gender: "male",
  heightCm: 175,
  weightKg: 68,
  dietaryPreference: "vegetarian",
  allergies: [],
  activityLevel: "moderate",
  nutritionGoal: "balanced_nutrition",
  isOnboarded: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEFAULT_GOALS: NutritionGoal = {
  id: "goals-101",
  userId: "demo-user-101",
  caloriesTarget: 2150,
  proteinTarget: 125,
  carbsTarget: 240,
  fatTarget: 65,
  fiberTarget: 30,
  updatedAt: new Date().toISOString(),
};

export async function getUserProfile(userId: string): Promise<UserProfile> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        fullName: data.full_name,
        age: data.age,
        gender: data.gender,
        heightCm: data.height_cm,
        weightKg: data.weight_kg,
        dietaryPreference: data.dietary_preference,
        allergies: data.allergies || [],
        activityLevel: data.activity_level,
        nutritionGoal: data.nutrition_goal,
        isOnboarded: data.is_onboarded,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
  }

  // Local storage fallback
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(DEMO_PROFILE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }

  return DEFAULT_PROFILE;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ success: boolean; profile: UserProfile; error?: string }> {
  const current = await getUserProfile(userId);
  const updated: UserProfile = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: updated.fullName,
        age: updated.age,
        gender: updated.gender,
        height_cm: updated.heightCm,
        weight_kg: updated.weightKg,
        dietary_preference: updated.dietaryPreference,
        allergies: updated.allergies,
        activity_level: updated.activityLevel,
        nutrition_goal: updated.nutritionGoal,
        is_onboarded: updated.isOnboarded,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return { success: false, profile: current, error: error.message };
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(updated));
  }

  return { success: true, profile: updated };
}

export async function getUserNutritionGoals(userId: string): Promise<NutritionGoal> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("nutrition_goals")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        userId: data.user_id,
        caloriesTarget: data.calories_target,
        proteinTarget: Number(data.protein_target),
        carbsTarget: Number(data.carbs_target),
        fatTarget: Number(data.fat_target),
        fiberTarget: Number(data.fiber_target || 28),
        updatedAt: data.updated_at,
      };
    }
  }

  // Local fallback
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(DEMO_GOALS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }

  return DEFAULT_GOALS;
}

export async function updateNutritionGoals(
  userId: string,
  goals: Partial<NutritionGoal>
): Promise<{ success: boolean; goal: NutritionGoal; error?: string }> {
  const current = await getUserNutritionGoals(userId);
  const updated: NutritionGoal = {
    ...current,
    ...goals,
    userId,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase
      .from("nutrition_goals")
      .upsert({
        user_id: userId,
        calories_target: updated.caloriesTarget,
        protein_target: updated.proteinTarget,
        carbs_target: updated.carbsTarget,
        fat_target: updated.fatTarget,
        fiber_target: updated.fiberTarget,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return { success: false, goal: current, error: error.message };
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_GOALS_KEY, JSON.stringify(updated));
  }

  return { success: true, goal: updated };
}
