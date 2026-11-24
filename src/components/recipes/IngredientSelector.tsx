"use client";

import React, { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Search, Plus, X, Sparkles } from "lucide-react";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onChange: (ingredients: string[]) => void;
}

const COMMON_PANTRY_SUGGESTIONS = [
  "Rice",
  "Onion",
  "Tomato",
  "Paneer",
  "Spinach",
  "Garlic",
  "Ginger",
  "Eggs",
  "Chickpeas",
  "Moong Dal",
  "Curd",
  "Chicken Breast",
  "Oats",
  "Cucumber",
];

export function IngredientSelector({
  selectedIngredients,
  onChange,
}: IngredientSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddIngredient = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      onChange([...selectedIngredients, clean]);
    }
    setInputValue("");
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    onChange(selectedIngredients.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#173F35]">
            What ingredients do you have right now?
          </h3>
          <p className="text-xs text-[#78847C]">
            Add items in your kitchen to discover healthy recipes you can cook today
          </p>
        </div>

        {selectedIngredients.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-[#D94841] hover:underline self-start sm:self-auto"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddIngredient(inputValue);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#78847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type ingredient (e.g. paneer, spinach, tomato, oats)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/50 text-[#202B25]"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!inputValue.trim()}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add
        </Button>
      </form>

      {/* Selected ingredients chips */}
      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {selectedIngredients.map((ing, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#173F35] text-white rounded-full text-xs font-semibold shadow-xs"
            >
              <span>{ing}</span>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(idx)}
                className="hover:text-red-300 p-0.5 rounded-full"
                aria-label={`Remove ${ing}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick pantry suggestion pills */}
      <div className="pt-2 border-t border-[#EDF2EC]">
        <div className="flex items-center gap-1.5 text-xs text-[#78847C] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#173F35]" />
          <span>Quick Pantry Staples:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_PANTRY_SUGGESTIONS.map((item) => {
            const isAlreadyAdded = selectedIngredients.some(
              (i) => i.toLowerCase() === item.toLowerCase()
            );

            return (
              <button
                key={item}
                type="button"
                disabled={isAlreadyAdded}
                onClick={() => handleAddIngredient(item)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isAlreadyAdded
                    ? "bg-[#E8F1E8] text-[#173F35] opacity-50 cursor-default"
                    : "bg-[#F8F7F1] text-[#202B25] hover:bg-[#E8F1E8] hover:text-[#173F35] border border-[#E2E8E2]"
                }`}
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
