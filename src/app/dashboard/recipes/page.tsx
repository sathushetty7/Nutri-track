"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { IngredientSelector } from "@/components/recipes/IngredientSelector";
import { DietaryFilterBar } from "@/components/recipes/DietaryFilterBar";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { RecipeDetailModal } from "@/components/recipes/RecipeDetailModal";
import { matchRecipesWithIngredients, MatchFilters } from "@/lib/services/recipeMatcher";
import { CURATED_RECIPES } from "@/lib/database/recipesCatalog";
import { RecipeMatchResult, UserProfile } from "@/types/nutrition";
import { getCurrentUser } from "@/lib/services/authService";
import { getUserProfile } from "@/lib/services/profileService";
import { UtensilsCrossed, Sparkles } from "lucide-react";

export default function RecipeFinderPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "paneer",
    "spinach",
    "tomato",
    "onion",
  ]);
  const [filters, setFilters] = useState<MatchFilters>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedRecipeMatch, setSelectedRecipeMatch] = useState<RecipeMatchResult | null>(null);

  useEffect(() => {
    async function load() {
      const session = await getCurrentUser();
      if (session.user) {
        const prof = await getUserProfile(session.user.id);
        setUserProfile(prof);
        // Pre-apply user allergies and dietary preferences to filters
        setFilters((prev) => ({
          ...prev,
          userAllergies: prof.allergies || [],
          dietaryPreference: prof.dietaryPreference,
        }));
      }
    }
    load();
  }, []);

  // Compute matched recipes using our smart matching algorithm
  const recipeMatches = matchRecipesWithIngredients(
    selectedIngredients,
    filters,
    CURATED_RECIPES
  );

  return (
    <AppShell title="Smart Recipe Finder">
      <div className="space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#173F35] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ingredient-Based Culinary AI</span>
          </div>
          <h2 className="text-xl font-bold text-[#173F35]">
            Discover What You Can Cook Right Now
          </h2>
          <p className="text-xs text-[#78847C] mt-0.5 max-w-2xl">
            Input the fresh produce, grains, and pantry items you have at home. NutriTrack computes
            match percentages, flags missing ingredients, and automatically protects you against your
            recorded food allergies.
          </p>
        </div>

        {/* 1. Interactive Ingredient Selector */}
        <IngredientSelector
          selectedIngredients={selectedIngredients}
          onChange={setSelectedIngredients}
        />

        {/* 2. Dietary & Safety Filter Bar */}
        <DietaryFilterBar
          filters={filters}
          onChange={setFilters}
          userAllergies={userProfile?.allergies || []}
        />

        {/* 3. Matched Recipes Catalog Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#173F35]">
              Matching Recipes ({recipeMatches.length})
            </h3>
            <span className="text-xs text-[#78847C]">
              Sorted by highest ingredient availability
            </span>
          </div>

          {recipeMatches.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#dbe2d8] p-12 text-center">
              <UtensilsCrossed className="w-10 h-10 text-[#A8BFA5] mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#173F35] mb-1">
                No recipes match all current criteria
              </h4>
              <p className="text-xs text-[#78847C] max-w-md mx-auto">
                Try toggling off strict filters or adding more staple ingredients like onion, tomato,
                rice, or eggs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recipeMatches.map((match) => (
                <RecipeCard
                  key={match.recipe.id}
                  matchResult={match}
                  onSelect={() => setSelectedRecipeMatch(match)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recipe Detail Modal */}
        <RecipeDetailModal
          matchResult={selectedRecipeMatch}
          onClose={() => setSelectedRecipeMatch(null)}
          onLogMealSuccess={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("nutritrack_meal_updated"));
            }
          }}
        />
      </div>
    </AppShell>
  );
}
