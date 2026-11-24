"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { RecipeMatchResult, MealType } from "@/types/nutrition";
import { createMeal } from "@/lib/services/mealService";
import { getCurrentUser } from "@/lib/services/authService";
import {
  Clock,
  ChefHat,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  Check,
} from "lucide-react";

interface RecipeDetailModalProps {
  matchResult: RecipeMatchResult | null;
  onClose: () => void;
  onLogMealSuccess?: () => void;
}

export function RecipeDetailModal({
  matchResult,
  onClose,
  onLogMealSuccess,
}: RecipeDetailModalProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  if (!matchResult) return null;

  const { recipe, matchedIngredients, missingIngredients, matchPercentage } = matchResult;

  const handleLogMeal = async () => {
    setIsLogging(true);
    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";

      const today = new Date().toISOString().split("T")[0];

      await createMeal(userId, {
        mealName: recipe.name,
        mealType: "lunch" as MealType,
        mealImageUrl: recipe.imageUrl,
        mealDate: today,
        mealTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        totalCalories: recipe.caloriesPerServing,
        totalProtein: recipe.proteinPerServing,
        totalCarbs: recipe.carbsPerServing,
        totalFat: recipe.fatPerServing,
        notes: `Prepared from NutriTrack Recipe Catalog (${recipe.cuisine})`,
        items: recipe.ingredients.map((ing, idx) => ({
          id: `item-${Date.now()}-${idx}`,
          foodName: ing.name,
          quantity: typeof ing.quantity === "number" ? ing.quantity : 1,
          servingUnit: ing.unit,
          weightGrams: 100,
          calories: Math.round(recipe.caloriesPerServing / recipe.ingredients.length),
          protein: Math.round((recipe.proteinPerServing / recipe.ingredients.length) * 10) / 10,
          carbohydrates: Math.round((recipe.carbsPerServing / recipe.ingredients.length) * 10) / 10,
          fat: Math.round((recipe.fatPerServing / recipe.ingredients.length) * 10) / 10,
          source: "verified_db",
        })),
      });

      setLogSuccess(true);
      if (onLogMealSuccess) onLogMealSuccess();
      setTimeout(() => {
        setLogSuccess(false);
        onClose();
      }, 1200);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <Modal isOpen={Boolean(matchResult)} onClose={onClose} maxWidth="xl">
      <div className="space-y-6">
        {/* Hero image and title */}
        <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden bg-black/5 shadow-inner">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            sizes="768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A8BFA5] mb-1 block">
              {recipe.cuisine} Cuisine • {recipe.difficulty}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">{recipe.name}</h2>
          </div>
        </div>

        {/* Nutrition stats bar */}
        <div className="grid grid-cols-4 gap-2 text-center bg-[#F8F7F1] p-3.5 rounded-xl border border-[#EDF2EC]">
          <div>
            <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Calories</span>
            <span className="text-base font-bold text-[#173F35]">{recipe.caloriesPerServing}</span>
            <span className="text-[10px] text-[#78847C] block">kcal</span>
          </div>
          <div>
            <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Protein</span>
            <span className="text-base font-bold text-[#245B48]">{recipe.proteinPerServing}g</span>
          </div>
          <div>
            <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Carbs</span>
            <span className="text-base font-bold text-[#78847C]">{recipe.carbsPerServing}g</span>
          </div>
          <div>
            <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Fat</span>
            <span className="text-base font-bold text-[#D97706]">{recipe.fatPerServing}g</span>
          </div>
        </div>

        {/* Timings & Servings */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#78847C] border-y border-[#EDF2EC] py-2.5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#173F35]" />
            <span>Prep: <strong>{recipe.prepTimeMinutes} min</strong></span>
            <span>•</span>
            <span>Cook: <strong>{recipe.cookTimeMinutes} min</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-[#173F35]" />
            <span>Yields: <strong>{recipe.servings} Servings</strong></span>
          </div>
        </div>

        {/* Ingredients Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="font-bold text-sm text-[#173F35]">
              Ingredients Checklist ({recipe.ingredients.length})
            </h4>
            {matchPercentage > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E8F1E8] text-[#173F35]">
                {matchPercentage}% In Your Kitchen
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {recipe.ingredients.map((ing, idx) => {
              const isAvailable = matchedIngredients.some(
                (m) => m.toLowerCase() === ing.name.toLowerCase()
              );

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                    isAvailable
                      ? "bg-[#E8F1E8]/50 border-[#BBF7D0] text-[#15803D]"
                      : "bg-[#FAFAF7] border-[#EDF2EC] text-[#202B25]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isAvailable ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#dbe2d8] shrink-0" />
                    )}
                    <span className="font-medium capitalize">{ing.name}</span>
                  </div>
                  <span className="text-[#78847C] text-[11px]">
                    {ing.quantity} {ing.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div>
          <h4 className="font-bold text-sm text-[#173F35] mb-2.5">Preparation Steps</h4>
          <ol className="space-y-2.5 text-xs text-[#202B25] leading-relaxed">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAFAF7] border border-[#EDF2EC]">
                <span className="w-5 h-5 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Dietary tags & Allergens */}
        <div className="pt-2 border-t border-[#EDF2EC] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {recipe.dietaryTags.map((tag) => (
              <Badge key={tag} variant="mint" size="sm">
                {tag}
              </Badge>
            ))}
            {recipe.allergens.length > 0 && (
              <span className="text-[11px] text-[#78847C]">
                Contains: {recipe.allergens.join(", ")}
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleLogMeal}
            isLoading={isLogging}
            disabled={logSuccess}
            leftIcon={logSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          >
            {logSuccess ? "Logged to Diary!" : "Log as Meal"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
