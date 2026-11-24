"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import {
  calculateSuggestedTargets,
  SuggestedTargets,
} from "@/lib/utils/nutritionCalculator";
import { ActivityLevel, NutritionGoalType } from "@/types/nutrition";
import { Calculator, Check, Sparkles, AlertCircle } from "lucide-react";

interface GoalCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTargets: (targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  }) => void;
  initialProfile?: {
    age?: number;
    heightCm?: number;
    weightKg?: number;
    gender?: "male" | "female" | "other" | "prefer_not_to_say";
    activityLevel?: ActivityLevel;
    nutritionGoal?: NutritionGoalType;
  };
}

export function GoalCalculatorModal({
  isOpen,
  onClose,
  onApplyTargets,
  initialProfile,
}: GoalCalculatorModalProps) {
  const [age, setAge] = useState(initialProfile?.age || 24);
  const [heightCm, setHeightCm] = useState(initialProfile?.heightCm || 172);
  const [weightKg, setWeightKg] = useState(initialProfile?.weightKg || 68);
  const [gender, setGender] = useState<"male" | "female" | "other" | "prefer_not_to_say">(
    initialProfile?.gender || "male"
  );
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    initialProfile?.activityLevel || "moderate"
  );
  const [goal, setGoal] = useState<NutritionGoalType>(
    initialProfile?.nutritionGoal || "balanced_nutrition"
  );

  const suggested: SuggestedTargets = calculateSuggestedTargets(
    { weightKg, heightCm, age, gender },
    activityLevel,
    goal
  );

  const handleApply = () => {
    onApplyTargets({
      calories: suggested.calories,
      protein: suggested.proteinGrams,
      carbs: suggested.carbsGrams,
      fat: suggested.fatGrams,
      fiber: suggested.fiberGrams,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Scientific Target Estimator"
      description="Calculate suggested energy and macro targets using the Mifflin-St Jeor formula"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Profile Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Age (years)</label>
            <input
              type="number"
              min="14"
              max="100"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Height (cm)</label>
            <input
              type="number"
              min="100"
              max="240"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Weight (kg)</label>
            <input
              type="number"
              min="30"
              max="250"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
            >
              <option value="sedentary">Sedentary (Desk job, minimal exercise)</option>
              <option value="light">Lightly Active (1-3 days/week)</option>
              <option value="moderate">Moderately Active (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very_active">Very Active (Twice daily training)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Primary Nutrition Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as NutritionGoalType)}
              className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
            >
              <option value="balanced_nutrition">Balanced Nutrition & Sustained Energy</option>
              <option value="maintain_weight">Maintain Current Weight</option>
              <option value="build_muscle">Build Muscle / Hypertrophy</option>
              <option value="weight_management">Weight Management (Fat Loss)</option>
            </select>
          </div>
        </div>

        {/* Calculated Results Banner */}
        <div className="p-4 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider block">
                Calculated Daily Energy Target
              </span>
              <p className="text-xs text-[#78847C]">{suggested.explanation}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#173F35]">
                {suggested.calories.toLocaleString()}
              </span>
              <span className="text-xs text-[#78847C] ml-1">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-[#d6e5d6]">
            <div className="bg-white p-2 rounded-xl">
              <span className="text-[10px] text-[#78847C] block font-semibold">Protein</span>
              <span className="text-sm font-bold text-[#245B48]">{suggested.proteinGrams}g</span>
            </div>
            <div className="bg-white p-2 rounded-xl">
              <span className="text-[10px] text-[#78847C] block font-semibold">Carbs</span>
              <span className="text-sm font-bold text-[#78847C]">{suggested.carbsGrams}g</span>
            </div>
            <div className="bg-white p-2 rounded-xl">
              <span className="text-[10px] text-[#78847C] block font-semibold">Fat</span>
              <span className="text-sm font-bold text-[#D97706]">{suggested.fatGrams}g</span>
            </div>
            <div className="bg-white p-2 rounded-xl">
              <span className="text-[10px] text-[#78847C] block font-semibold">Fiber</span>
              <span className="text-sm font-bold text-[#173F35]">{suggested.fiberGrams}g</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[#78847C] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            Suggested targets are general algorithmic estimates, not medical prescriptions. Always
            listen to your hunger and energy signals.
          </span>
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleApply}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Apply Suggested Targets
          </Button>
        </div>
      </div>
    </Modal>
  );
}
