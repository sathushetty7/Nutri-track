"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { WeeklyStatItem } from "@/lib/services/mealService";
import { TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";

interface NutritionChartsProps {
  weeklyData: WeeklyStatItem[];
  macroTotals: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export function NutritionCharts({ weeklyData, macroTotals }: NutritionChartsProps) {
  // Macronutrient distribution data for Donut Chart
  // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
  const proteinCals = macroTotals.protein * 4;
  const carbsCals = macroTotals.carbs * 4;
  const fatCals = macroTotals.fat * 9;
  const totalMacroCals = proteinCals + carbsCals + fatCals || 1;

  const pieData = [
    {
      name: "Protein",
      value: Math.round(proteinCals),
      percentage: Math.round((proteinCals / totalMacroCals) * 100),
      color: "#245B48",
    },
    {
      name: "Carbohydrates",
      value: Math.round(carbsCals),
      percentage: Math.round((carbsCals / totalMacroCals) * 100),
      color: "#A8BFA5",
    },
    {
      name: "Fats",
      value: Math.round(fatCals),
      percentage: Math.round((fatCals / totalMacroCals) * 100),
      color: "#D97706",
    },
  ];

  // Calculate consistency rating (days within +/- 15% of target)
  const targetDaysMet = weeklyData.filter((d) => {
    if (d.calories === 0) return false;
    const diff = Math.abs(d.calories - d.calorieTarget);
    return diff <= d.calorieTarget * 0.18;
  }).length;
  const consistencyPct = Math.round((targetDaysMet / 7) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Weekly Calorie Intake Chart */}
      <Card className="border border-[#E2E8E2]">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#173F35]" />
            <div>
              <h3 className="font-bold text-[#173F35] text-base">7-Day Calorie Rhythm</h3>
              <p className="text-xs text-[#78847C]">Daily calories consumed vs daily target</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#E8F1E8] text-[#173F35] rounded-full">
            {consistencyPct}% Consistency
          </span>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="dayName"
                  stroke="#78847C"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8E2" }}
                />
                <YAxis
                  stroke="#78847C"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8E2" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as WeeklyStatItem;
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-lg border border-[#E2E8E2] text-xs">
                          <p className="font-bold text-[#173F35] mb-1">
                            {data.dayName} ({data.date})
                          </p>
                          <p className="text-[#202B25]">
                            Consumed: <span className="font-bold">{data.calories} kcal</span>
                          </p>
                          <p className="text-[#78847C]">Target: {data.calorieTarget} kcal</p>
                          <p className="text-[11px] text-[#245B48] mt-1 font-semibold">
                            P: {data.protein}g | C: {data.carbs}g | F: {data.fat}g
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="calories"
                  fill="#173F35"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2. Macronutrient Distribution Donut Chart & Protein Trend */}
      <Card className="border border-[#E2E8E2]">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-[#173F35]" />
            <div>
              <h3 className="font-bold text-[#173F35] text-base">Macronutrient Energy Share</h3>
              <p className="text-xs text-[#78847C]">Caloric distribution across macros today</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: unknown) => [
                      `${Number(val || 0).toLocaleString()} kcal`,
                      "Energy",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-[#202B25]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#173F35]">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
