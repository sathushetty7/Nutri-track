"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";
import { MacroRing } from "../ui/MacroRing";
import { ProgressBar } from "../ui/ProgressBar";
import { NutritionGoal } from "@/types/nutrition";
import { getEncouragingFeedback } from "@/lib/utils/nutritionCalculator";
import { Flame, Sparkles } from "lucide-react";

interface NutritionOverviewProps {
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: NutritionGoal;
  userName?: string;
}

export function NutritionOverview({ consumed, goals, userName = "there" }: NutritionOverviewProps) {
  const remainingCalories = Math.max(0, goals.caloriesTarget - consumed.calories);
  const feedback = getEncouragingFeedback(consumed.calories, goals.caloriesTarget);

  return (
    <Card className="overflow-hidden border border-[#E2E8E2]">
      {/* Top Welcome & Motivational Greeting */}
      <div className="bg-gradient-to-r from-[#173F35] to-[#245B48] text-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A8BFA5] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily Nutrition Rhythm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {userName}
            </h2>
            <p className="text-sm text-[#E8F1E8]/90 mt-1 max-w-xl font-normal">
              {feedback.message}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/15 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Flame className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs uppercase font-medium text-[#A8BFA5] block">
                Remaining Budget
              </span>
              <span className="text-xl font-bold text-white">
                {remainingCalories.toLocaleString()}{" "}
                <span className="text-xs font-normal text-[#E8F1E8]">kcal</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Circular Macro Rings & Progress Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-2">
          <MacroRing
            value={consumed.calories}
            max={goals.caloriesTarget}
            label="Calories"
            unit="kcal"
            sublabel={`Goal: ${goals.caloriesTarget}`}
            color="#173F35"
            size={110}
            strokeWidth={9}
          />

          <MacroRing
            value={consumed.protein}
            max={goals.proteinTarget}
            label="Protein"
            unit="g"
            sublabel={`Goal: ${goals.proteinTarget}g`}
            color="#245B48"
            size={110}
            strokeWidth={9}
          />

          <MacroRing
            value={consumed.carbs}
            max={goals.carbsTarget}
            label="Carbs"
            unit="g"
            sublabel={`Goal: ${goals.carbsTarget}g`}
            color="#A8BFA5"
            size={110}
            strokeWidth={9}
          />

          <MacroRing
            value={consumed.fat}
            max={goals.fatTarget}
            label="Fat"
            unit="g"
            sublabel={`Goal: ${goals.fatTarget}g`}
            color="#D97706"
            size={110}
            strokeWidth={9}
          />
        </div>

        {/* Detailed Horizontal Breakdown */}
        <div className="mt-6 pt-5 border-t border-[#EDF2EC] grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#202B25] mb-1">
              <span>Protein Target</span>
              <span className="text-[#173F35]">
                {consumed.protein}g / {goals.proteinTarget}g
              </span>
            </div>
            <ProgressBar
              value={consumed.protein}
              max={goals.proteinTarget}
              color="#245B48"
              height="md"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-[#202B25] mb-1">
              <span>Carbohydrates</span>
              <span className="text-[#173F35]">
                {consumed.carbs}g / {goals.carbsTarget}g
              </span>
            </div>
            <ProgressBar
              value={consumed.carbs}
              max={goals.carbsTarget}
              color="#A8BFA5"
              height="md"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-[#202B25] mb-1">
              <span>Healthy Fats</span>
              <span className="text-[#173F35]">
                {consumed.fat}g / {goals.fatTarget}g
              </span>
            </div>
            <ProgressBar
              value={consumed.fat}
              max={goals.fatTarget}
              color="#D97706"
              height="md"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
