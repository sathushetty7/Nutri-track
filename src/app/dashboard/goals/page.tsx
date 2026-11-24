"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { GoalSummaryCard } from "@/components/goals/GoalSummaryCard";
import { NutritionGoal, UserProfile } from "@/types/nutrition";
import { getCurrentUser } from "@/lib/services/authService";
import { getUserProfile, getUserNutritionGoals } from "@/lib/services/profileService";
import { Target, Heart, ShieldCheck } from "lucide-react";

export default function GoalsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [goals, setGoals] = useState<NutritionGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = await getCurrentUser();
        const userId = session.user?.id || "demo-user-101";

        const [p, g] = await Promise.all([
          getUserProfile(userId),
          getUserNutritionGoals(userId),
        ]);

        setProfile(p);
        setGoals(g);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading || !goals) {
    return (
      <AppShell title="Nutrition Goals">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35]" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Nutrition Goals">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#173F35] uppercase tracking-wider mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>Target Customization</span>
          </div>
          <h2 className="text-xl font-bold text-[#173F35]">
            Manage Your Daily Calorie & Macronutrient Targets
          </h2>
          <p className="text-xs text-[#78847C] mt-0.5">
            Set custom energy budgets or use our scientific Mifflin-St Jeor metabolic calculator.
            Adjustments update your progress rings and daily reminders immediately.
          </p>
        </div>

        {/* Goal summary & interactive adjustment card */}
        <GoalSummaryCard
          initialGoals={goals}
          userProfile={
            profile
              ? {
                  age: profile.age,
                  heightCm: profile.heightCm,
                  weightKg: profile.weightKg,
                  gender: profile.gender,
                }
              : undefined
          }
          onGoalsUpdated={(updated) => {
            setGoals(updated);
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("nutritrack_meal_updated"));
            }
          }}
        />

        {/* Guilt-Free Philosophy Card */}
        <div className="p-4 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-2xl flex items-start gap-3 text-xs text-[#173F35]">
          <Heart className="w-5 h-5 text-[#173F35] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">Our Guilt-Free Nutritional Philosophy</h4>
            <p className="text-[#78847C] leading-relaxed">
              Nutrition is about consistency and vitality, not perfection. Over-consuming or
              under-consuming on a given day is completely normal. NutriTrack focuses on weekly
              rhythms and sustainable habits without restrictive dogmatism.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
