"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CURATED_RECIPES } from "@/lib/database/recipesCatalog";
import { NutritionGoal } from "@/types/nutrition";
import { Lightbulb, ArrowRight, ShieldCheck } from "lucide-react";

interface SmartSuggestionsProps {
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: NutritionGoal;
}

export function SmartSuggestions({ consumed, goals }: SmartSuggestionsProps) {
  // Determine if user has a nutrient gap (e.g. protein below target)
  const proteinGap = goals.proteinTarget - consumed.protein;
  const isLowProtein = proteinGap > 25;

  // Pick top recommendations matching needs
  const suggestedRecipes = isLowProtein
    ? CURATED_RECIPES.filter((r) => r.proteinPerServing >= 16).slice(0, 2)
    : CURATED_RECIPES.filter((r) => r.dietaryTags.includes("balanced")).slice(0, 2);

  return (
    <Card className="border border-[#E2E8E2]">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#173F35]" />
          <div>
            <h3 className="font-bold text-[#173F35] text-base">Smart Supportive Insights</h3>
            <p className="text-xs text-[#78847C]">Nutrient balancing and tailored culinary inspiration</p>
          </div>
        </div>

        <Link href="/dashboard/recipes">
          <Button size="sm" variant="ghost" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Explore All
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Gap highlight banner */}
        {isLowProtein ? (
          <div className="p-3.5 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-xl flex items-start gap-3 text-xs">
            <div className="w-6 h-6 rounded-md bg-[#173F35] text-white flex items-center justify-center shrink-0 font-bold text-xs">
              P
            </div>
            <div>
              <p className="font-bold text-[#173F35]">
                {Math.round(proteinGap)}g Protein Remaining for Target
              </p>
              <p className="text-[#78847C] mt-0.5">
                Consider pairing your next meal with protein-dense choices such as lentils, paneer, eggs, or Greek curd to reach your daily goal.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-xl flex items-start gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-[#173F35] shrink-0" />
            <div>
              <p className="font-bold text-[#173F35]">Balanced Macronutrient Distribution</p>
              <p className="text-[#78847C] mt-0.5">
                Your current meal intake maintains steady glucose release and steady satiety.
              </p>
            </div>
          </div>
        )}

        {/* Suggested Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href="/dashboard/recipes"
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E2E8E2] hover:border-[#A8BFA5] hover:shadow-xs transition-all group"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#EDF2EC]">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold text-[#173F35] uppercase tracking-wider block">
                  {recipe.cuisine} • {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
                <h4 className="text-sm font-bold text-[#202B25] truncate group-hover:text-[#173F35] transition-colors">
                  {recipe.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="mint" size="sm">
                    {recipe.caloriesPerServing} kcal
                  </Badge>
                  <Badge variant="verified" size="sm">
                    {recipe.proteinPerServing}g P
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
