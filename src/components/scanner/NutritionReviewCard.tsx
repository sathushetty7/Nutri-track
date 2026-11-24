"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { DetectedFoodItem, MealType } from "@/types/nutrition";
import { createMeal } from "@/lib/services/mealService";
import { getCurrentUser } from "@/lib/services/authService";
import { Check, AlertTriangle, Sparkles, Clock, Calendar } from "lucide-react";

interface NutritionReviewCardProps {
  items: DetectedFoodItem[];
  imageUrl?: string;
  onSaved: () => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
}

export function NutritionReviewCard({
  items,
  imageUrl,
  onSaved,
  isSaving,
  setIsSaving,
}: NutritionReviewCardProps) {
  const [mealName, setMealName] = useState("Home-Cooked Meal");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [mealDate, setMealDate] = useState(new Date().toISOString().split("T")[0]);
  const [mealTime, setMealTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  );
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalCalories = items.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Math.round(items.reduce((acc, curr) => acc + curr.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(items.reduce((acc, curr) => acc + curr.carbohydrates, 0) * 10) / 10;
  const totalFat = Math.round(items.reduce((acc, curr) => acc + curr.fat, 0) * 10) / 10;

  const handleSaveMeal = async () => {
    if (items.length === 0) {
      setErrorMsg("Please add at least one food item before saving.");
      return;
    }
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";

      const result = await createMeal(userId, {
        mealName: mealName || "Scanned Meal",
        mealType,
        mealImageUrl: imageUrl,
        mealDate,
        mealTime,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        notes,
        items,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to save meal record.");
      }

      onSaved();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Failed to save meal. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border border-[#E2E8E2]">
      <CardHeader className="py-4">
        <h3 className="font-bold text-base text-[#173F35]">Meal Nutrition Summary</h3>
        <p className="text-xs text-[#78847C]">Calibrated totals from detected portions</p>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Macro Totals Highlight Grid */}
        <div className="grid grid-cols-4 gap-2 text-center bg-[#F8F7F1] p-3.5 rounded-xl border border-[#EDF2EC]">
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#78847C]">Calories</span>
            <span className="text-lg font-bold text-[#173F35]">{totalCalories}</span>
            <span className="text-[10px] text-[#78847C] block">kcal</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#78847C]">Protein</span>
            <span className="text-lg font-bold text-[#245B48]">{totalProtein}</span>
            <span className="text-[10px] text-[#78847C] block">g</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#78847C]">Carbs</span>
            <span className="text-lg font-bold text-[#78847C]">{totalCarbs}</span>
            <span className="text-[10px] text-[#78847C] block">g</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#78847C]">Fat</span>
            <span className="text-lg font-bold text-[#D97706]">{totalFat}</span>
            <span className="text-[10px] text-[#78847C] block">g</span>
          </div>
        </div>

        {/* Meal Details Form */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">Meal Title</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              placeholder="e.g. Lunch with Roti & Dal"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#78847C]" /> Date
              </label>
              <input
                type="date"
                value={mealDate}
                onChange={(e) => setMealDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#78847C]" /> Time
              </label>
              <input
                type="time"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">
              Personal Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Had after morning workout, felt great"
              className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            />
          </div>
        </div>

        {/* Mandatory Medical Disclaimer */}
        <div className="p-3 bg-[#FEF3C7]/60 border border-[#FDE68A] rounded-xl flex items-start gap-2.5 text-xs text-[#92400E]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
          <p className="leading-snug">
            <strong className="font-semibold">Medical & Nutritional Disclaimer:</strong> Nutrition
            estimates are calculated from reference databases and visual heuristics. They are not
            medical prescriptions and should be reviewed for personal accuracy before saving.
          </p>
        </div>

        {errorMsg && (
          <p className="text-xs text-[#D94841] font-semibold">{errorMsg}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center py-4">
        <span className="text-xs text-[#78847C]">
          {items.length} food item{items.length !== 1 ? "s" : ""} included
        </span>
        <Button
          variant="primary"
          size="md"
          onClick={handleSaveMeal}
          isLoading={isSaving}
          disabled={items.length === 0}
          leftIcon={<Check className="w-4 h-4" />}
        >
          Confirm & Save to Diary
        </Button>
      </CardFooter>
    </Card>
  );
}
