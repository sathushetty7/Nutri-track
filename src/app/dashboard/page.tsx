"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { NutritionOverview } from "@/components/dashboard/NutritionOverview";
import { MealTimeline } from "@/components/dashboard/MealTimeline";
import { NutritionCharts } from "@/components/dashboard/NutritionCharts";
import { SmartSuggestions } from "@/components/dashboard/SmartSuggestions";
import { getCurrentUser } from "@/lib/services/authService";
import { getUserProfile, getUserNutritionGoals } from "@/lib/services/profileService";
import { getMealsByDate, getWeeklyNutritionStats, WeeklyStatItem } from "@/lib/services/mealService";
import { Meal, NutritionGoal, UserProfile } from "@/types/nutrition";
import { ManualFoodModal } from "@/components/scanner/ManualFoodModal";

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [goals, setGoals] = useState<NutritionGoal | null>(null);
  const [todayMeals, setTodayMeals] = useState<Meal[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const loadDashboardData = useCallback(async () => {
    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";

      const todayStr = new Date().toISOString().split("T")[0];

      const [profData, goalsData, mealsData, statsData] = await Promise.all([
        getUserProfile(userId),
        getUserNutritionGoals(userId),
        getMealsByDate(userId, todayStr),
        getWeeklyNutritionStats(userId, 2150),
      ]);

      setProfile(profData);
      setGoals(goalsData);
      setTodayMeals(mealsData);
      setWeeklyStats(statsData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();

    // Listen for custom update events triggered across pages
    const handleUpdate = () => loadDashboardData();
    window.addEventListener("nutritrack_meal_updated", handleUpdate);
    return () => window.removeEventListener("nutritrack_meal_updated", handleUpdate);
  }, [loadDashboardData]);

  if (isLoading || !goals) {
    return (
      <AppShell title="Dashboard">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35]" />
        </div>
      </AppShell>
    );
  }

  // Calculate consumed totals today
  const consumedCalories = todayMeals.reduce((sum, m) => sum + m.totalCalories, 0);
  const consumedProtein = Math.round(todayMeals.reduce((sum, m) => sum + m.totalProtein, 0) * 10) / 10;
  const consumedCarbs = Math.round(todayMeals.reduce((sum, m) => sum + m.totalCarbs, 0) * 10) / 10;
  const consumedFat = Math.round(todayMeals.reduce((sum, m) => sum + m.totalFat, 0) * 10) / 10;

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {/* 1. Daily Overview with Macro Progress Rings */}
        <NutritionOverview
          consumed={{
            calories: consumedCalories,
            protein: consumedProtein,
            carbs: consumedCarbs,
            fat: consumedFat,
          }}
          goals={goals}
          userName={profile?.fullName?.split(" ")[0] || "there"}
        />

        {/* 2. Today's Meals Timeline & Quick Food Log */}
        <MealTimeline
          meals={todayMeals}
          onMealDeleted={loadDashboardData}
          onOpenQuickAdd={() => setIsQuickAddOpen(true)}
        />

        {/* 3. Nutrition Insights & Charts */}
        <NutritionCharts
          weeklyData={weeklyStats}
          macroTotals={{
            protein: consumedProtein,
            carbs: consumedCarbs,
            fat: consumedFat,
          }}
        />

        {/* 4. Smart Supportive Recommendations */}
        <SmartSuggestions
          consumed={{
            calories: consumedCalories,
            protein: consumedProtein,
            carbs: consumedCarbs,
            fat: consumedFat,
          }}
          goals={goals}
        />
      </div>

      <ManualFoodModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onFoodAdded={() => {
          setIsQuickAddOpen(false);
          loadDashboardData();
        }}
      />
    </AppShell>
  );
}
