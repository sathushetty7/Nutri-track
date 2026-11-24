"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DateNavigator } from "@/components/history/DateNavigator";
import { MealFilterBar } from "@/components/history/MealFilterBar";
import { HistoryMealCard } from "@/components/history/HistoryMealCard";
import { getAllMeals, deleteMeal } from "@/lib/services/mealService";
import { getCurrentUser } from "@/lib/services/authService";
import { Meal, MealType } from "@/types/nutrition";
import { BookOpen, Utensils, Flame, Sparkles } from "lucide-react";

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedType, setSelectedType] = useState<MealType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMeals = useCallback(async () => {
    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";
      const meals = await getAllMeals(userId);
      setAllMeals(meals);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const handleDeleteMeal = async (mealId: string) => {
    const session = await getCurrentUser();
    const userId = session.user?.id || "demo-user-101";
    await deleteMeal(userId, mealId);
    await loadMeals();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("nutritrack_meal_updated"));
    }
  };

  // Filter meals by selected date, meal type, and search query
  const dateMeals = allMeals.filter((m) => m.mealDate === selectedDate);

  const filteredMeals = dateMeals.filter((m) => {
    // Meal type filter
    if (selectedType !== "all" && m.mealType !== selectedType) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesName = m.mealName.toLowerCase().includes(q);
      const matchesItems = (m.items || []).some((it) =>
        it.foodName.toLowerCase().includes(q)
      );
      if (!matchesName && !matchesItems) return false;
    }
    return true;
  });

  // Calculate daily totals for selected date
  const dayCalories = dateMeals.reduce((sum, m) => sum + m.totalCalories, 0);
  const dayProtein = Math.round(dateMeals.reduce((sum, m) => sum + m.totalProtein, 0) * 10) / 10;
  const dayCarbs = Math.round(dateMeals.reduce((sum, m) => sum + m.totalCarbs, 0) * 10) / 10;
  const dayFat = Math.round(dateMeals.reduce((sum, m) => sum + m.totalFat, 0) * 10) / 10;

  return (
    <AppShell title="Meal History & Food Diary">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#173F35] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Food Log</span>
          </div>
          <h2 className="text-xl font-bold text-[#173F35]">
            Daily Diary & Meal Records
          </h2>
          <p className="text-xs text-[#78847C] mt-0.5">
            Review past meals, inspect itemized macronutrients, and monitor your nutrition consistency
            over time.
          </p>
        </div>

        {/* 1. Date Navigator */}
        <DateNavigator selectedDate={selectedDate} onChange={setSelectedDate} />

        {/* Daily Summary Bar for the selected day */}
        <div className="bg-[#173F35] text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8BFA5] block">
              Nutrition Intake For This Day
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">{dayCalories.toLocaleString()}</span>
              <span className="text-xs text-[#E8F1E8]">kcal total</span>
              <span className="text-xs text-[#A8BFA5] ml-2">
                ({dateMeals.length} meal{dateMeals.length !== 1 ? "s" : ""} logged)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/15 text-xs">
            <div>
              <span className="text-[#A8BFA5] block text-[10px] font-semibold">Protein</span>
              <span className="font-bold text-white text-sm">{dayProtein}g</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <span className="text-[#A8BFA5] block text-[10px] font-semibold">Carbs</span>
              <span className="font-bold text-white text-sm">{dayCarbs}g</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <span className="text-[#A8BFA5] block text-[10px] font-semibold">Fat</span>
              <span className="font-bold text-white text-sm">{dayFat}g</span>
            </div>
          </div>
        </div>

        {/* 2. Filters & Search */}
        <MealFilterBar
          selectedType={selectedType}
          onSelectType={setSelectedType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 3. Meals List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2E8E2]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35] mx-auto" />
            </div>
          ) : filteredMeals.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#dbe2d8] p-12 text-center">
              <Utensils className="w-10 h-10 text-[#A8BFA5] mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#173F35] mb-1">
                No meals recorded for this date
              </h4>
              <p className="text-xs text-[#78847C] max-w-sm mx-auto">
                Use the AI Meal Scanner or Add Food Manually from the top bar to record meals for this
                day.
              </p>
            </div>
          ) : (
            filteredMeals.map((meal) => (
              <HistoryMealCard
                key={meal.id}
                meal={meal}
                onDelete={handleDeleteMeal}
              />
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
