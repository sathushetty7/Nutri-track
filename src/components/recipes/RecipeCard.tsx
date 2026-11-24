"use client";

import React from "react";
import Image from "next/image";
import { RecipeMatchResult } from "@/types/nutrition";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Clock, ChefHat, CheckCircle2, AlertCircle } from "lucide-react";

interface RecipeCardProps {
  matchResult: RecipeMatchResult;
  onSelect: () => void;
}

export function RecipeCard({ matchResult, onSelect }: RecipeCardProps) {
  const { recipe, matchPercentage, matchedIngredients, missingIngredients } = matchResult;

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Card
      hoverable
      onClick={onSelect}
      className="cursor-pointer flex flex-col h-full overflow-hidden border border-[#E2E8E2] group transition-all"
    >
      {/* Image container with match badge */}
      <div className="relative w-full aspect-16/10 overflow-hidden bg-black/5">
        <Image
          src={recipe.imageUrl}
          alt={recipe.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Match score badge */}
        {matchPercentage > 0 && (
          <div className="absolute top-3 right-3 shadow-md">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                matchPercentage >= 70
                  ? "bg-[#15803D]"
                  : matchPercentage >= 40
                  ? "bg-[#D97706]"
                  : "bg-[#78847C]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {matchPercentage}% Match
            </span>
          </div>
        )}

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
            {recipe.cuisine}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#78847C] mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{totalTime} mins</span>
            <span>•</span>
            <ChefHat className="w-3.5 h-3.5" />
            <span>{recipe.servings} serving{recipe.servings > 1 ? "s" : ""}</span>
          </div>

          <h3 className="font-bold text-base text-[#173F35] group-hover:text-[#245B48] transition-colors line-clamp-1">
            {recipe.name}
          </h3>

          <p className="text-xs text-[#78847C] line-clamp-2 mt-1 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Ingredient match availability breakdown */}
        <div className="pt-2 border-t border-[#EDF2EC] space-y-2">
          {matchedIngredients.length > 0 ? (
            <div className="text-[11px] text-[#15803D] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>You have: {matchedIngredients.slice(0, 3).join(", ")}{matchedIngredients.length > 3 ? ` +${matchedIngredients.length - 3}` : ""}</span>
            </div>
          ) : null}

          {missingIngredients.length > 0 && matchPercentage > 0 && (
            <div className="text-[11px] text-[#78847C] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Missing {missingIngredients.length} item{missingIngredients.length > 1 ? "s" : ""}</span>
            </div>
          )}

          {/* Nutrition badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Badge variant="forest" size="sm">
              {recipe.caloriesPerServing} kcal
            </Badge>
            <Badge variant="verified" size="sm">
              {recipe.proteinPerServing}g P
            </Badge>
            <Badge variant="outline" size="sm">
              {recipe.carbsPerServing}g C
            </Badge>
            <Badge variant="outline" size="sm">
              {recipe.fatPerServing}g F
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
