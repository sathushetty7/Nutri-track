"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Meal, MealType } from "@/types/nutrition";
import { deleteMeal } from "@/lib/services/mealService";
import { getCurrentUser } from "@/lib/services/authService";
import {
  Utensils,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Trash2,
  Plus,
  Camera,
  ChevronRight,
} from "lucide-react";

interface MealTimelineProps {
  meals: Meal[];
  onMealDeleted?: () => void;
  onOpenQuickAdd?: () => void;
}

const MEAL_SLOTS: { type: MealType; title: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: "breakfast", title: "Breakfast", icon: Coffee },
  { type: "lunch", title: "Lunch", icon: Sun },
  { type: "dinner", title: "Dinner", icon: Moon },
  { type: "snack", title: "Snacks", icon: Cookie },
];

export function MealTimeline({ meals, onMealDeleted, onOpenQuickAdd }: MealTimelineProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (mealId: string) => {
    if (!confirm("Are you sure you want to delete this meal entry?")) return;
    setDeletingId(mealId);
    try {
      const session = await getCurrentUser();
      const userId = session.user?.id || "demo-user-101";
      await deleteMeal(userId, mealId);
      if (onMealDeleted) onMealDeleted();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="border border-[#E2E8E2]">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#173F35]" />
          <div>
            <h3 className="font-bold text-[#173F35] text-base">Today&apos;s Meals</h3>
            <p className="text-xs text-[#78847C]">Tracked meals and itemized nutritional breakdowns</p>
          </div>
        </div>

        <Link href="/dashboard/scanner">
          <Button size="sm" variant="outline" leftIcon={<Camera className="w-3.5 h-3.5" />}>
            Photo Scan
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {MEAL_SLOTS.map((slot) => {
          const SlotIcon = slot.icon;
          const slotMeals = meals.filter((m) => m.mealType === slot.type);
          const hasMeals = slotMeals.length > 0;

          const totalSlotCals = slotMeals.reduce((sum, m) => sum + m.totalCalories, 0);

          return (
            <div
              key={slot.type}
              className="rounded-xl border border-[#EDF2EC] bg-[#FAFAF7] p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F1E8] text-[#173F35] flex items-center justify-center">
                    <SlotIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#202B25]">{slot.title}</h4>
                    {hasMeals && (
                      <span className="text-[11px] text-[#78847C]">
                        {totalSlotCals} kcal total
                      </span>
                    )}
                  </div>
                </div>

                {!hasMeals && (
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    onClick={onOpenQuickAdd}
                    className="text-xs text-[#78847C] hover:text-[#173F35]"
                  >
                    Log Food
                  </Button>
                )}
              </div>

              {hasMeals ? (
                <div className="space-y-3">
                  {slotMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="bg-white rounded-xl border border-[#E2E8E2] p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        {meal.mealImageUrl ? (
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#EDF2EC]">
                            <Image
                              src={meal.mealImageUrl}
                              alt={meal.mealName}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#E8F1E8]/70 border border-[#d6e5d6] flex items-center justify-center text-[#173F35] shrink-0 font-bold text-xs">
                            {slot.title.slice(0, 3)}
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-[#173F35]">
                              {meal.mealName}
                            </h5>
                            {meal.mealTime && (
                              <span className="text-[10px] text-[#78847C]">
                                {meal.mealTime}
                              </span>
                            )}
                          </div>

                          {/* Items listed */}
                          {meal.items && meal.items.length > 0 && (
                            <p className="text-xs text-[#78847C] mt-0.5 line-clamp-1">
                              {meal.items.map((it) => it.foodName).join(", ")}
                            </p>
                          )}

                          {/* Macros pills */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <Badge variant="forest" size="sm">
                              {meal.totalCalories} kcal
                            </Badge>
                            <Badge variant="verified" size="sm">
                              {meal.totalProtein}g P
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {meal.totalCarbs}g C
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {meal.totalFat}g F
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleDelete(meal.id)}
                          disabled={deletingId === meal.id}
                          className="p-1.5 text-[#78847C] hover:text-[#D94841] hover:bg-[#FDE8E7] rounded-lg transition-colors"
                          title="Delete meal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 px-2 border border-dashed border-[#dbe2d8] rounded-lg bg-white/50">
                  <p className="text-xs text-[#78847C]">No {slot.title.toLowerCase()} recorded yet.</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Link href="/dashboard/scanner">
                      <span className="text-xs text-[#173F35] font-semibold hover:underline flex items-center gap-1">
                        Scan photo <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
