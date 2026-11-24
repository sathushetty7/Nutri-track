"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { NutritionGoal } from "@/types/nutrition";
import { updateNutritionGoals } from "@/lib/services/profileService";
import { getCurrentUser } from "@/lib/services/authService";
import { Target, Calculator, Check, Sparkles, RefreshCw } from "lucide-react";
import { GoalCalculatorModal } from "./GoalCalculatorModal";

interface GoalSummaryCardProps {
  initialGoals: NutritionGoal;
  onGoalsUpdated?: (updated: NutritionGoal) => void;
  userProfile?: {
    age?: number;
    heightCm?: number;
    weightKg?: number;
    gender?: "male" | "female" | "other" | "prefer_not_to_say";
  };
}

export function GoalSummaryCard({
  initialGoals,
  onGoalsUpdated,
  userProfile,
}: GoalSummaryCardProps) {
  const [goals, setGoals] = useState<NutritionGoal>(initialGoals);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Compute total calories from macros
  const calculatedCalsFromMacros =
    goals.proteinTarget * 4 + goals.carbsTarget * 4 + goals.fatTarget * 9;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";

      const res = await updateNutritionGoals(userId, goals);
      if (res.success) {
        setSaveSuccess(true);
        if (onGoalsUpdated) onGoalsUpdated(res.goal);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyCalculated = (targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  }) => {
    const updated: NutritionGoal = {
      ...goals,
      caloriesTarget: targets.calories,
      proteinTarget: targets.protein,
      carbsTarget: targets.carbs,
      fatTarget: targets.fat,
      fiberTarget: targets.fiber,
    };
    setGoals(updated);
  };

  return (
    <Card className="border border-[#E2E8E2]">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#173F35]" />
          <div>
            <h3 className="font-bold text-base text-[#173F35]">Daily Nutritional Targets</h3>
            <p className="text-xs text-[#78847C]">Customize your daily energy and macronutrient allowances</p>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsCalculatorOpen(true)}
          leftIcon={<Calculator className="w-3.5 h-3.5" />}
        >
          Suggested Calculator
        </Button>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Calorie Target Card */}
        <div className="p-4 bg-[#F8F7F1] rounded-2xl border border-[#E2E8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#78847C] block">
              Total Daily Calorie Budget
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#173F35]">
                {goals.caloriesTarget.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-[#78847C]">kcal / day</span>
            </div>
            <p className="text-xs text-[#78847C] mt-1">
              Sum of macros equates to ~{Math.round(calculatedCalsFromMacros)} kcal
            </p>
          </div>

          <div className="w-full sm:w-48">
            <input
              type="range"
              min="1200"
              max="4500"
              step="50"
              value={goals.caloriesTarget}
              onChange={(e) =>
                setGoals({ ...goals, caloriesTarget: Number(e.target.value) })
              }
              className="w-full accent-[#173F35] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#78847C] mt-1">
              <span>1,200</span>
              <span>2,500</span>
              <span>4,500 kcal</span>
            </div>
          </div>
        </div>

        {/* Macronutrient Sliders & Number Controls */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#173F35]">Macronutrient Breakdown</h4>

          {/* Protein */}
          <div className="p-3.5 bg-white rounded-xl border border-[#EDF2EC] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#245B48]">Protein</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="20"
                  max="350"
                  value={goals.proteinTarget}
                  onChange={(e) =>
                    setGoals({ ...goals, proteinTarget: Math.max(0, Number(e.target.value)) })
                  }
                  className="w-16 px-2 py-1 text-right text-xs font-bold border border-[#dbe2d8] rounded-lg"
                />
                <span className="font-semibold text-[#78847C]">g ({goals.proteinTarget * 4} kcal)</span>
              </div>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              value={goals.proteinTarget}
              onChange={(e) => setGoals({ ...goals, proteinTarget: Number(e.target.value) })}
              className="w-full accent-[#245B48] cursor-pointer"
            />
          </div>

          {/* Carbohydrates */}
          <div className="p-3.5 bg-white rounded-xl border border-[#EDF2EC] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#173F35]">Carbohydrates</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="30"
                  max="600"
                  value={goals.carbsTarget}
                  onChange={(e) =>
                    setGoals({ ...goals, carbsTarget: Math.max(0, Number(e.target.value)) })
                  }
                  className="w-16 px-2 py-1 text-right text-xs font-bold border border-[#dbe2d8] rounded-lg"
                />
                <span className="font-semibold text-[#78847C]">g ({goals.carbsTarget * 4} kcal)</span>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              value={goals.carbsTarget}
              onChange={(e) => setGoals({ ...goals, carbsTarget: Number(e.target.value) })}
              className="w-full accent-[#A8BFA5] cursor-pointer"
            />
          </div>

          {/* Fat */}
          <div className="p-3.5 bg-white rounded-xl border border-[#EDF2EC] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#D97706]">Fats</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="15"
                  max="200"
                  value={goals.fatTarget}
                  onChange={(e) =>
                    setGoals({ ...goals, fatTarget: Math.max(0, Number(e.target.value)) })
                  }
                  className="w-16 px-2 py-1 text-right text-xs font-bold border border-[#dbe2d8] rounded-lg"
                />
                <span className="font-semibold text-[#78847C]">g ({goals.fatTarget * 9} kcal)</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              value={goals.fatTarget}
              onChange={(e) => setGoals({ ...goals, fatTarget: Number(e.target.value) })}
              className="w-full accent-[#D97706] cursor-pointer"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center py-4">
        <span className="text-xs text-[#78847C]">
          Updates reflect instantly on your daily dashboard
        </span>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          isLoading={isSaving}
          leftIcon={saveSuccess ? <Check className="w-4 h-4" /> : undefined}
        >
          {saveSuccess ? "Goals Saved!" : "Save Daily Targets"}
        </Button>
      </CardFooter>

      {/* Calculator modal */}
      <GoalCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyTargets={handleApplyCalculated}
        initialProfile={userProfile}
      />
    </Card>
  );
}
