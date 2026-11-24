"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Meal } from "@/types/nutrition";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Trash2, Clock, ChevronDown, ChevronUp, ShieldCheck, Sparkles } from "lucide-react";

interface HistoryMealCardProps {
  meal: Meal;
  onDelete: (mealId: string) => void;
}

export function HistoryMealCard({ meal, onDelete }: HistoryMealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border border-[#E2E8E2] overflow-hidden transition-all">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {meal.mealImageUrl ? (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#EDF2EC]">
              <Image
                src={meal.mealImageUrl}
                alt={meal.mealName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-[#E8F1E8] border border-[#d6e5d6] flex items-center justify-center text-[#173F35] font-bold text-xs uppercase shrink-0">
              {meal.mealType.slice(0, 3)}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-md bg-[#F8F7F1] text-[#173F35] border border-[#E2E8E2]">
                {meal.mealType}
              </span>
              {meal.mealTime && (
                <span className="text-xs text-[#78847C] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {meal.mealTime}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-[#202B25] mt-1">{meal.mealName}</h4>

            {meal.items && meal.items.length > 0 && (
              <p className="text-xs text-[#78847C] mt-0.5 line-clamp-1">
                {meal.items.map((it) => `${it.foodName} (${it.weightGrams}g)`).join(", ")}
              </p>
            )}

            {/* Macro badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
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

        <div className="flex items-center justify-end gap-2 self-end sm:self-center">
          {meal.items && meal.items.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#173F35] bg-[#E8F1E8] hover:bg-[#dcebdd] transition-colors flex items-center gap-1"
            >
              <span>{isExpanded ? "Hide Items" : "View Breakdown"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={() => {
              if (confirm("Delete this saved meal record from your diary?")) {
                onDelete(meal.id);
              }
            }}
            className="p-1.5 rounded-lg text-[#78847C] hover:text-[#D94841] hover:bg-[#FDE8E7] transition-colors"
            title="Delete meal record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded itemized breakdown */}
      {isExpanded && meal.items && meal.items.length > 0 && (
        <div className="p-4 bg-[#FBFBF9] border-t border-[#EDF2EC] space-y-2">
          <span className="text-xs font-bold text-[#173F35] block mb-2">Itemized Breakdown</span>
          <div className="space-y-1.5">
            {meal.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-[#EDF2EC]"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#202B25]">{item.foodName}</span>
                  <span className="text-[11px] text-[#78847C]">
                    ({item.weightGrams}g, {item.servingUnit})
                  </span>
                  {item.source === "verified_db" ? (
                    <Badge variant="verified" size="sm">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="estimate" size="sm">
                      AI Estimate
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 font-semibold text-[#202B25]">
                  <span>{item.calories} kcal</span>
                  <span className="text-[#245B48]">{item.protein}g P</span>
                  <span className="text-[#78847C]">{item.carbohydrates}g C</span>
                  <span className="text-[#D97706]">{item.fat}g F</span>
                </div>
              </div>
            ))}
          </div>

          {meal.notes && (
            <p className="text-xs text-[#78847C] italic pt-2">Notes: &ldquo;{meal.notes}&rdquo;</p>
          )}
        </div>
      )}
    </Card>
  );
}
