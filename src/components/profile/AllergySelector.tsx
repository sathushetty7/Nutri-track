"use client";

import React from "react";
import { Check } from "lucide-react";

interface AllergySelectorProps {
  selectedAllergies: string[];
  onChange: (allergies: string[]) => void;
}

const COMMON_ALLERGENS = [
  { id: "dairy", label: "Dairy & Milk Products" },
  { id: "eggs", label: "Eggs" },
  { id: "tree_nuts", label: "Tree Nuts (Almonds, Cashews, Walnuts)" },
  { id: "peanuts", label: "Peanuts" },
  { id: "gluten", label: "Gluten & Wheat" },
  { id: "soy", label: "Soy & Soybeans" },
  { id: "fish", label: "Fish" },
  { id: "shellfish", label: "Crustaceans & Shellfish" },
  { id: "sesame", label: "Sesame Seeds" },
  { id: "mustard", label: "Mustard" },
];

export function AllergySelector({ selectedAllergies, onChange }: AllergySelectorProps) {
  const toggleAllergy = (allergyId: string) => {
    if (selectedAllergies.includes(allergyId)) {
      onChange(selectedAllergies.filter((a) => a !== allergyId));
    } else {
      onChange([...selectedAllergies, allergyId]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#202B25]">
        Food Allergies & Intolerances
      </label>
      <p className="text-[11px] text-[#78847C]">
        NutriTrack will strictly exclude recipes and alert you when detected meals contain these ingredients.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {COMMON_ALLERGENS.map((item) => {
          const isSelected = selectedAllergies.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleAllergy(item.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                isSelected
                  ? "bg-[#E8F1E8] border-[#173F35] text-[#173F35] font-semibold"
                  : "bg-white border-[#dbe2d8] text-[#202B25] hover:bg-[#F8F7F1]"
              }`}
            >
              <span>{item.label}</span>
              {isSelected && <Check className="w-4 h-4 text-[#173F35]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
