"use client";

import React, { useState } from "react";
import { DetectedFoodItem, VerifiedFoodItem } from "@/types/nutrition";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { searchFoodDatabase, calculateNutritionFromGrams } from "@/lib/database/foodDatabase";
import { Trash2, Plus, Edit2, Check, Search, ShieldCheck, Sparkles } from "lucide-react";

interface DetectedFoodListProps {
  items: DetectedFoodItem[];
  onChange: (updatedItems: DetectedFoodItem[]) => void;
}

export function DetectedFoodList({ items, onChange }: DetectedFoodListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Manual Add Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<VerifiedFoodItem | null>(null);
  const [addGrams, setAddGrams] = useState(100);

  const searchResults = searchFoodDatabase(searchQuery);

  const handleUpdateItem = (id: string, updates: Partial<DetectedFoodItem>) => {
    const updated = items.map((item) => {
      if (item.id !== id) return item;

      const merged = { ...item, ...updates };

      // If weight changed and item has matched database record, recalculate proportionally
      if (updates.weightGrams && updates.weightGrams !== item.weightGrams) {
        const factor = updates.weightGrams / (item.weightGrams || 100);
        merged.calories = Math.round(item.calories * factor);
        merged.protein = Math.round(item.protein * factor * 10) / 10;
        merged.carbohydrates = Math.round(item.carbohydrates * factor * 10) / 10;
        merged.fat = Math.round(item.fat * factor * 10) / 10;
      }

      return merged;
    });

    onChange(updated);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleAddMissingFood = () => {
    if (!selectedFood) return;
    const nutrition = calculateNutritionFromGrams(selectedFood, addGrams);

    const newItem: DetectedFoodItem = {
      id: `item-${Date.now()}`,
      foodName: selectedFood.name,
      matchedFoodId: selectedFood.id,
      quantity: Math.max(1, Math.round((addGrams / selectedFood.gramsPerUnit) * 10) / 10),
      servingUnit: selectedFood.defaultUnit,
      weightGrams: addGrams,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbohydrates: nutrition.carbs,
      fat: nutrition.fat,
      fiber: nutrition.fiber,
      source: "verified_db",
    };

    onChange([...items, newItem]);
    setIsAddModalOpen(false);
    setSelectedFood(null);
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-[#173F35]">
            Detected Foods ({items.length})
          </h4>
          <p className="text-xs text-[#78847C]">
            Review portions and add missing items before saving
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[#dbe2d8] rounded-xl bg-[#FAFAF7]">
          <p className="text-xs text-[#78847C] mb-3">No food items listed for this meal.</p>
          <Button size="sm" variant="secondary" onClick={() => setIsAddModalOpen(true)}>
            Add Food Manually
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E2E8E2] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.foodName}
                        onChange={(e) => handleUpdateItem(item.id, { foodName: e.target.value })}
                        className="px-2 py-1 text-sm font-bold border border-[#173F35] rounded-lg focus:outline-none"
                      />
                    ) : (
                      <h5 className="font-bold text-sm text-[#202B25]">{item.foodName}</h5>
                    )}

                    {item.source === "verified_db" ? (
                      <Badge variant="verified" size="sm">
                        <ShieldCheck className="w-3 h-3" />
                        Verified DB
                      </Badge>
                    ) : (
                      <Badge variant="estimate" size="sm">
                        <Sparkles className="w-3 h-3" />
                        AI Estimate
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#78847C] mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">Portion:</span>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="5"
                            max="2000"
                            value={item.weightGrams}
                            onChange={(e) =>
                              handleUpdateItem(item.id, {
                                weightGrams: Math.max(1, Number(e.target.value)),
                              })
                            }
                            className="w-16 px-1.5 py-0.5 border border-[#dbe2d8] rounded text-xs font-semibold"
                          />
                          <span>g</span>
                        </div>
                      ) : (
                        <span className="font-semibold text-[#202B25]">
                          {item.weightGrams}g ({item.servingUnit})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-[#173F35]">{item.calories} kcal</span>
                      <span>•</span>
                      <span className="text-[#245B48]">{item.protein}g P</span>
                      <span>•</span>
                      <span className="text-[#78847C]">{item.carbohydrates}g C</span>
                      <span>•</span>
                      <span className="text-[#D97706]">{item.fat}g F</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setEditingId(isEditing ? null : item.id)}
                    className="p-1.5 rounded-lg text-[#78847C] hover:text-[#173F35] hover:bg-[#E8F1E8] transition-colors"
                    title={isEditing ? "Done editing" : "Edit food"}
                  >
                    {isEditing ? <Check className="w-4 h-4 text-[#15803D]" /> : <Edit2 className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-[#78847C] hover:text-[#D94841] hover:bg-[#FDE8E7] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Missing Food Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Missing Food Item"
        description="Select an item from the verified nutrition database to include in this meal"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#78847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search foods (e.g. Chapati, Dal, Rice, Egg, Curd)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
            />
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1 border border-[#EDF2EC] rounded-xl p-1 bg-white">
            {searchResults.map((f) => {
              const isSelected = selectedFood?.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setSelectedFood(f);
                    setAddGrams(f.gramsPerUnit || 100);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-[#E8F1E8] text-[#173F35] font-semibold"
                      : "hover:bg-[#F8F7F1] text-[#202B25]"
                  }`}
                >
                  <span>{f.name}</span>
                  <span className="text-[#78847C]">
                    ~{f.gramsPerUnit}g • {f.caloriesPer100g} kcal/100g
                  </span>
                </button>
              );
            })}
          </div>

          {selectedFood && (
            <div className="p-3 bg-[#F8F7F1] rounded-xl border border-[#E2E8E2] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#173F35]">{selectedFood.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <label className="text-xs text-[#78847C]">Weight:</label>
                  <input
                    type="number"
                    min="5"
                    max="1500"
                    value={addGrams}
                    onChange={(e) => setAddGrams(Math.max(1, Number(e.target.value)))}
                    className="w-16 px-1.5 py-0.5 border border-[#dbe2d8] rounded text-xs font-semibold"
                  />
                  <span className="text-xs text-[#78847C]">g</span>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-[#173F35]">
                  {calculateNutritionFromGrams(selectedFood, addGrams).calories} kcal
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedFood}
              onClick={handleAddMissingFood}
            >
              Add to Meal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
