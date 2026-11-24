"use client";

import React from "react";
import { MatchFilters } from "@/lib/services/recipeMatcher";
import { ShieldCheck, Filter } from "lucide-react";

interface DietaryFilterBarProps {
  filters: MatchFilters;
  onChange: (updated: MatchFilters) => void;
  userAllergies?: string[];
}

export function DietaryFilterBar({
  filters,
  onChange,
  userAllergies = [],
}: DietaryFilterBarProps) {
  const toggleFilter = (key: keyof MatchFilters) => {
    onChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#78847C]">
          <Filter className="w-3.5 h-3.5 text-[#173F35]" />
          <span>Dietary Filters:</span>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFilter("highProteinOnly")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filters.highProteinOnly
                ? "bg-[#173F35] text-white shadow-xs"
                : "bg-white text-[#202B25] border border-[#dbe2d8] hover:bg-[#F8F7F1]"
            }`}
          >
            High Protein (&ge;16g)
          </button>

          <button
            type="button"
            onClick={() => toggleFilter("lowPrepTimeOnly")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filters.lowPrepTimeOnly
                ? "bg-[#173F35] text-white shadow-xs"
                : "bg-white text-[#202B25] border border-[#dbe2d8] hover:bg-[#F8F7F1]"
            }`}
          >
            Quick (&le;25 mins)
          </button>

          <button
            type="button"
            onClick={() => toggleFilter("vegetarianOnly")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filters.vegetarianOnly
                ? "bg-[#173F35] text-white shadow-xs"
                : "bg-white text-[#202B25] border border-[#dbe2d8] hover:bg-[#F8F7F1]"
            }`}
          >
            Vegetarian
          </button>

          <button
            type="button"
            onClick={() => toggleFilter("veganOnly")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filters.veganOnly
                ? "bg-[#173F35] text-white shadow-xs"
                : "bg-white text-[#202B25] border border-[#dbe2d8] hover:bg-[#F8F7F1]"
            }`}
          >
            Vegan
          </button>
        </div>
      </div>

      {/* Safety Allergy Filter Status */}
      {userAllergies.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-xl text-xs text-[#173F35]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#173F35]" />
          <span>
            <strong>Safety filter active:</strong> Auto-excluding recipes containing your recorded
            allergies (<em>{userAllergies.join(", ")}</em>).
          </span>
        </div>
      )}
    </div>
  );
}
