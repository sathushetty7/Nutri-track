"use client";

import React from "react";
import { MealType } from "@/types/nutrition";
import { Search } from "lucide-react";

interface MealFilterBarProps {
  selectedType: MealType | "all";
  onSelectType: (type: MealType | "all") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function MealFilterBar({
  selectedType,
  onSelectType,
  searchQuery,
  onSearchChange,
}: MealFilterBarProps) {
  const types: { id: MealType | "all"; label: string }[] = [
    { id: "all", label: "All Meals" },
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snack", label: "Snacks" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Meal type pill buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {types.map((t) => {
          const isActive = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#173F35] text-white shadow-xs"
                  : "bg-white text-[#202B25] border border-[#dbe2d8] hover:bg-[#F8F7F1]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Search by food or meal name */}
      <div className="relative w-full sm:w-64">
        <Search className="w-3.5 h-3.5 text-[#78847C] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search foods, dishes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#dbe2d8] text-xs focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
        />
      </div>
    </div>
  );
}
