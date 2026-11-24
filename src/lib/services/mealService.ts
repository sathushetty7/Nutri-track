import { createClient, isSupabaseConfigured } from "../supabase/client";
import { Meal, MealType } from "@/types/nutrition";

const DEMO_MEALS_KEY = "nutritrack_demo_meals";

function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPastDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const INITIAL_SEED_MEALS: Meal[] = [
  {
    id: "seed-meal-1",
    userId: "demo-user-101",
    mealName: "Nutritious Morning Breakfast",
    mealType: "breakfast",
    mealImageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    mealDate: getTodayDateString(),
    mealTime: "08:30",
    totalCalories: 430,
    totalProtein: 18.2,
    totalCarbs: 64.0,
    totalFat: 11.5,
    notes: "South Indian breakfast with homemade coconut chutney",
    items: [
      {
        id: "item-1-1",
        foodName: "Steamed Idli",
        matchedFoodId: "steamed-idli",
        quantity: 3,
        servingUnit: "piece (medium)",
        weightGrams: 135,
        calories: 189,
        protein: 6.1,
        carbohydrates: 37.8,
        fat: 1.1,
        source: "verified_db",
      },
      {
        id: "item-1-2",
        foodName: "Vegetable Sambar",
        matchedFoodId: "sambar",
        quantity: 1,
        servingUnit: "katori / bowl",
        weightGrams: 180,
        calories: 122,
        protein: 5.6,
        carbohydrates: 18.4,
        fat: 3.1,
        source: "verified_db",
      },
      {
        id: "item-1-3",
        foodName: "Fresh Coconut Chutney",
        matchedFoodId: "coconut-chutney",
        quantity: 1.5,
        servingUnit: "tbsp",
        weightGrams: 50,
        calories: 119,
        protein: 6.5,
        carbohydrates: 7.8,
        fat: 7.3,
        source: "verified_db",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-meal-2",
    userId: "demo-user-101",
    mealName: "Balanced High-Protein Lunch",
    mealType: "lunch",
    mealImageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    mealDate: getTodayDateString(),
    mealTime: "13:15",
    totalCalories: 680,
    totalProtein: 34.5,
    totalCarbs: 88.0,
    totalFat: 21.0,
    notes: "Home-cooked roti, dal, and fresh paneer sabzi",
    items: [
      {
        id: "item-2-1",
        foodName: "Chapati / Roti",
        matchedFoodId: "chapati-roti",
        quantity: 2,
        servingUnit: "piece (medium)",
        weightGrams: 70,
        calories: 208,
        protein: 6.5,
        carbohydrates: 40.6,
        fat: 2.6,
        source: "verified_db",
      },
      {
        id: "item-2-2",
        foodName: "Yellow Dal Tadka / Fry",
        matchedFoodId: "dal-tadka",
        quantity: 1,
        servingUnit: "katori / bowl",
        weightGrams: 150,
        calories: 156,
        protein: 9.3,
        carbohydrates: 20.2,
        fat: 4.6,
        source: "verified_db",
      },
      {
        id: "item-2-3",
        foodName: "Palak Paneer",
        matchedFoodId: "palak-paneer",
        quantity: 1,
        servingUnit: "katori / bowl",
        weightGrams: 160,
        calories: 237,
        protein: 13.1,
        carbohydrates: 8.6,
        fat: 17.3,
        source: "verified_db",
      },
      {
        id: "item-2-4",
        foodName: "Cucumber Raita",
        matchedFoodId: "cucumber-raita",
        quantity: 1,
        servingUnit: "katori",
        weightGrams: 120,
        calories: 62,
        protein: 3.4,
        carbohydrates: 5.0,
        fat: 3.1,
        source: "verified_db",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Past days for rich weekly chart visual
  {
    id: "seed-meal-past-1",
    userId: "demo-user-101",
    mealName: "Khichdi & Curd Dinner",
    mealType: "dinner",
    mealDate: getPastDateString(1),
    mealTime: "20:00",
    totalCalories: 510,
    totalProtein: 21.0,
    totalCarbs: 72.0,
    totalFat: 14.5,
    items: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-meal-past-2",
    userId: "demo-user-101",
    mealName: "Mediterranean Quinoa Lunch",
    mealType: "lunch",
    mealDate: getPastDateString(1),
    mealTime: "13:30",
    totalCalories: 640,
    totalProtein: 28.0,
    totalCarbs: 82.0,
    totalFat: 22.0,
    items: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-meal-past-3",
    userId: "demo-user-101",
    mealName: "Oatmeal & Fruits",
    mealType: "breakfast",
    mealDate: getPastDateString(1),
    mealTime: "08:15",
    totalCalories: 380,
    totalProtein: 15.0,
    totalCarbs: 58.0,
    totalFat: 9.0,
    items: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-meal-past-4",
    userId: "demo-user-101",
    mealName: "Full Day Nutrition Log",
    mealType: "lunch",
    mealDate: getPastDateString(2),
    mealTime: "13:00",
    totalCalories: 1950,
    totalProtein: 105.0,
    totalCarbs: 230.0,
    totalFat: 62.0,
    items: [],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "seed-meal-past-5",
    userId: "demo-user-101",
    mealName: "Full Day Nutrition Log",
    mealType: "lunch",
    mealDate: getPastDateString(3),
    mealTime: "13:00",
    totalCalories: 2080,
    totalProtein: 114.0,
    totalCarbs: 245.0,
    totalFat: 68.0,
    items: [],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "seed-meal-past-6",
    userId: "demo-user-101",
    mealName: "Full Day Nutrition Log",
    mealType: "lunch",
    mealDate: getPastDateString(4),
    mealTime: "13:00",
    totalCalories: 1890,
    totalProtein: 98.0,
    totalCarbs: 220.0,
    totalFat: 59.0,
    items: [],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "seed-meal-past-7",
    userId: "demo-user-101",
    mealName: "Full Day Nutrition Log",
    mealType: "lunch",
    mealDate: getPastDateString(5),
    mealTime: "13:00",
    totalCalories: 2120,
    totalProtein: 118.0,
    totalCarbs: 250.0,
    totalFat: 65.0,
    items: [],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: "seed-meal-past-8",
    userId: "demo-user-101",
    mealName: "Full Day Nutrition Log",
    mealDate: getPastDateString(6),
    mealType: "lunch",
    mealTime: "13:00",
    totalCalories: 2020,
    totalProtein: 110.0,
    totalCarbs: 235.0,
    totalFat: 64.0,
    items: [],
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    updatedAt: new Date(Date.now() - 518400000).toISOString(),
  },
];

function getStoredMeals(): Meal[] {
  if (typeof window === "undefined") return INITIAL_SEED_MEALS;
  const raw = localStorage.getItem(DEMO_MEALS_KEY);
  if (!raw) {
    localStorage.setItem(DEMO_MEALS_KEY, JSON.stringify(INITIAL_SEED_MEALS));
    return INITIAL_SEED_MEALS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_MEALS;
  }
}

function saveStoredMeals(meals: Meal[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_MEALS_KEY, JSON.stringify(meals));
  }
}

export async function getMealsByDate(userId: string, date: string): Promise<Meal[]> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data: mealsData, error } = await supabase
      .from("meals")
      .select("*, meal_items(*)")
      .eq("user_id", userId)
      .eq("meal_date", date)
      .order("created_at", { ascending: true });

    if (!error && mealsData) {
      return mealsData.map((m) => ({
        id: m.id,
        userId: m.user_id,
        mealName: m.meal_name,
        mealType: m.meal_type as MealType,
        mealImageUrl: m.meal_image_url,
        mealDate: m.meal_date,
        mealTime: m.meal_time,
        totalCalories: m.total_calories,
        totalProtein: Number(m.total_protein),
        totalCarbs: Number(m.total_carbs),
        totalFat: Number(m.total_fat),
        notes: m.notes,
        items: (m.meal_items || []).map((i: Record<string, unknown>) => ({
          id: String(i.id),
          foodName: String(i.food_name),
          quantity: Number(i.quantity),
          servingUnit: String(i.serving_unit),
          weightGrams: Number(i.weight_grams),
          calories: Number(i.calories),
          protein: Number(i.protein),
          carbohydrates: Number(i.carbohydrates),
          fat: Number(i.fat),
          source: (i.source as "verified_db" | "ai_estimate" | "custom") || "verified_db",
          confidenceScore: i.confidence_score ? Number(i.confidence_score) : undefined,
        })),
        createdAt: m.created_at,
        updatedAt: m.updated_at,
      }));
    }
  }

  // Local Storage fallback
  const all = getStoredMeals();
  return all.filter((m) => m.mealDate === date);
}

export async function getAllMeals(userId: string): Promise<Meal[]> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data: mealsData, error } = await supabase
      .from("meals")
      .select("*, meal_items(*)")
      .eq("user_id", userId)
      .order("meal_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && mealsData) {
      return mealsData.map((m) => ({
        id: m.id,
        userId: m.user_id,
        mealName: m.meal_name,
        mealType: m.meal_type as MealType,
        mealImageUrl: m.meal_image_url,
        mealDate: m.meal_date,
        mealTime: m.meal_time,
        totalCalories: m.total_calories,
        totalProtein: Number(m.total_protein),
        totalCarbs: Number(m.total_carbs),
        totalFat: Number(m.total_fat),
        notes: m.notes,
        items: (m.meal_items || []).map((i: Record<string, unknown>) => ({
          id: String(i.id),
          foodName: String(i.food_name),
          quantity: Number(i.quantity),
          servingUnit: String(i.serving_unit),
          weightGrams: Number(i.weight_grams),
          calories: Number(i.calories),
          protein: Number(i.protein),
          carbohydrates: Number(i.carbohydrates),
          fat: Number(i.fat),
          source: (i.source as "verified_db" | "ai_estimate" | "custom") || "verified_db",
        })),
        createdAt: m.created_at,
        updatedAt: m.updated_at,
      }));
    }
  }

  const all = getStoredMeals();
  return all.sort((a, b) => new Date(b.mealDate).getTime() - new Date(a.mealDate).getTime());
}

export async function createMeal(
  userId: string,
  meal: Omit<Meal, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; meal?: Meal; error?: string }> {
  const newMealId = "meal-" + Date.now();
  const createdDate = new Date().toISOString();

  const newMeal: Meal = {
    ...meal,
    id: newMealId,
    userId,
    createdAt: createdDate,
    updatedAt: createdDate,
  };

  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { data: mealRow, error: mealErr } = await supabase
      .from("meals")
      .insert({
        user_id: userId,
        meal_name: meal.mealName,
        meal_type: meal.mealType,
        meal_image_url: meal.mealImageUrl,
        meal_date: meal.mealDate,
        meal_time: meal.mealTime || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        total_calories: meal.totalCalories,
        total_protein: meal.totalProtein,
        total_carbs: meal.totalCarbs,
        total_fat: meal.totalFat,
        notes: meal.notes,
      })
      .select()
      .single();

    if (mealErr || !mealRow) {
      return { success: false, error: mealErr?.message || "Failed to save meal record" };
    }

    if (meal.items && meal.items.length > 0) {
      const itemsToInsert = meal.items.map((item) => ({
        meal_id: mealRow.id,
        food_name: item.foodName,
        quantity: item.quantity,
        serving_unit: item.servingUnit,
        weight_grams: item.weightGrams,
        calories: item.calories,
        protein: item.protein,
        carbohydrates: item.carbohydrates,
        fat: item.fat,
        source: item.source || "verified_db",
        confidence_score: item.confidenceScore,
      }));

      await supabase.from("meal_items").insert(itemsToInsert);
    }

    return { success: true, meal: { ...newMeal, id: mealRow.id } };
  }

  // Local storage
  const current = getStoredMeals();
  current.unshift(newMeal);
  saveStoredMeals(current);

  return { success: true, meal: newMeal };
}

export async function deleteMeal(userId: string, mealId: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase.from("meals").delete().eq("id", mealId).eq("user_id", userId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  const current = getStoredMeals();
  const filtered = current.filter((m) => m.id !== mealId);
  saveStoredMeals(filtered);
  return { success: true };
}

export async function updateMeal(
  userId: string,
  mealId: string,
  updates: Partial<Meal>
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    const { error } = await supabase
      .from("meals")
      .update({
        meal_name: updates.mealName,
        meal_type: updates.mealType,
        meal_date: updates.mealDate,
        total_calories: updates.totalCalories,
        total_protein: updates.totalProtein,
        total_carbs: updates.totalCarbs,
        total_fat: updates.totalFat,
        notes: updates.notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", mealId)
      .eq("user_id", userId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  const current = getStoredMeals();
  const index = current.findIndex((m) => m.id === mealId);
  if (index !== -1) {
    current[index] = { ...current[index], ...updates, updatedAt: new Date().toISOString() };
    saveStoredMeals(current);
  }
  return { success: true };
}

export interface WeeklyStatItem {
  dayName: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calorieTarget: number;
}

export async function getWeeklyNutritionStats(userId: string, calorieTarget = 2000): Promise<WeeklyStatItem[]> {
  const allMeals = await getAllMeals(userId);
  const days: WeeklyStatItem[] = [];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Last 7 days in chronological order
  for (let i = 6; i >= 0; i--) {
    const dateStr = getPastDateString(i);
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayName = i === 0 ? "Today" : dayNames[d.getDay()];

    const mealsOnDay = allMeals.filter((m) => m.mealDate === dateStr);
    const cals = mealsOnDay.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
    const protein = mealsOnDay.reduce((sum, m) => sum + (m.totalProtein || 0), 0);
    const carbs = mealsOnDay.reduce((sum, m) => sum + (m.totalCarbs || 0), 0);
    const fat = mealsOnDay.reduce((sum, m) => sum + (m.totalFat || 0), 0);

    days.push({
      dayName,
      date: dateStr,
      calories: Math.round(cals),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      calorieTarget,
    });
  }

  return days;
}
