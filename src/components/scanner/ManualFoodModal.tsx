"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { searchFoodDatabase, calculateNutritionFromGrams } from "@/lib/database/foodDatabase";
import { VerifiedFoodItem, MealType } from "@/types/nutrition";
import { createMeal } from "@/lib/services/mealService";
import { getCurrentUser } from "@/lib/services/authService";
import { Search, Plus, Check } from "lucide-react";

interface ManualFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFoodAdded?: () => void;
}

export function ManualFoodModal({ isOpen, onClose, onFoodAdded }: ManualFoodModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<VerifiedFoodItem | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const searchResults = searchFoodDatabase(searchQuery);

  const handleSelect = (food: VerifiedFoodItem) => {
    setSelectedFood(food);
    setGrams(food.gramsPerUnit || 100);
  };

  const calculatedNutrition = selectedFood
    ? calculateNutritionFromGrams(selectedFood, grams)
    : null;

  const handleSave = async () => {
    if (!selectedFood || !calculatedNutrition) return;
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";

      const today = new Date().toISOString().split("T")[0];

      await createMeal(userId, {
        mealName: selectedFood.name,
        mealType,
        mealDate: today,
        mealTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        totalCalories: calculatedNutrition.calories,
        totalProtein: calculatedNutrition.protein,
        totalCarbs: calculatedNutrition.carbs,
        totalFat: calculatedNutrition.fat,
        items: [
          {
            id: `item-${Date.now()}`,
            foodName: selectedFood.name,
            matchedFoodId: selectedFood.id,
            quantity: Math.max(1, Math.round((grams / selectedFood.gramsPerUnit) * 10) / 10),
            servingUnit: selectedFood.defaultUnit,
            weightGrams: grams,
            calories: calculatedNutrition.calories,
            protein: calculatedNutrition.protein,
            carbohydrates: calculatedNutrition.carbs,
            fat: calculatedNutrition.fat,
            fiber: calculatedNutrition.fiber,
            source: "verified_db",
          },
        ],
      });

      setSelectedFood(null);
      setSearchQuery("");
      if (onFoodAdded) onFoodAdded();
    } catch {
      setErrorMsg("Failed to add food. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Food Manually"
      description="Search verified nutritional records for Indian staples and healthy meals"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#78847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search e.g. Roti, Dal, Paneer, Rice, Egg, Apple..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#dbe2d8] text-sm text-[#202B25] focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/50"
          />
        </div>

        {/* Search results list */}
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border border-[#EDF2EC] rounded-xl p-1 bg-white">
          {searchResults.map((food) => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <button
                key={food.id}
                type="button"
                onClick={() => handleSelect(food)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#E8F1E8] text-[#173F35] font-semibold"
                    : "hover:bg-[#F8F7F1] text-[#202B25]"
                }`}
              >
                <div>
                  <span className="block font-medium">{food.name}</span>
                  <span className="text-[11px] text-[#78847C]">
                    {food.defaultUnit} (~{food.gramsPerUnit}g) • {food.caloriesPer100g} kcal / 100g
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#173F35]" />}
              </button>
            );
          })}
        </div>

        {/* Selected food configuration */}
        {selectedFood && calculatedNutrition && (
          <div className="p-4 bg-[#F8F7F1] rounded-xl border border-[#E2E8E2] space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-[#173F35]">{selectedFood.name}</h4>
                <p className="text-xs text-[#78847C]">Standard serving: {selectedFood.defaultUnit}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#173F35]">{calculatedNutrition.calories}</span>
                <span className="text-xs text-[#78847C] ml-1">kcal</span>
              </div>
            </div>

            {/* Weight in Grams input */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#78847C] mb-1">
                  Weight (grams)
                </label>
                <input
                  type="number"
                  min="5"
                  max="1500"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#dbe2d8] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#78847C] mb-1">Meal Time</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#dbe2d8] text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
            </div>

            {/* Calculated Macros Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="bg-white p-2 rounded-lg border border-[#EDF2EC]">
                <span className="block text-[10px] text-[#78847C] font-medium">Protein</span>
                <span className="text-xs font-bold text-[#202B25]">{calculatedNutrition.protein}g</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#EDF2EC]">
                <span className="block text-[10px] text-[#78847C] font-medium">Carbs</span>
                <span className="text-xs font-bold text-[#202B25]">{calculatedNutrition.carbs}g</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#EDF2EC]">
                <span className="block text-[10px] text-[#78847C] font-medium">Fat</span>
                <span className="text-xs font-bold text-[#202B25]">{calculatedNutrition.fat}g</span>
              </div>
            </div>
          </div>
        )}

        {errorMsg && <p className="text-xs text-[#D94841] font-medium">{errorMsg}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!selectedFood}
            isLoading={isSaving}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add to Diary
          </Button>
        </div>
      </div>
    </Modal>
  );
}
