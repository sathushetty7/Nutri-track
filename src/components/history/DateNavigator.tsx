"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface DateNavigatorProps {
  selectedDate: string; // YYYY-MM-DD
  onChange: (date: string) => void;
}

export function DateNavigator({ selectedDate, onChange }: DateNavigatorProps) {
  const currentDateObj = new Date(selectedDate + "T00:00:00");
  const todayStr = new Date().toISOString().split("T")[0];
  const isToday = selectedDate === todayStr;

  const handlePrevDay = () => {
    const prev = new Date(currentDateObj);
    prev.setDate(prev.getDate() - 1);
    onChange(prev.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const next = new Date(currentDateObj);
    next.setDate(next.getDate() + 1);
    onChange(next.toISOString().split("T")[0]);
  };

  const handleSetToday = () => {
    onChange(todayStr);
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDateObj);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8E2] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevDay}
          className="p-2 rounded-xl text-[#78847C] hover:text-[#173F35] hover:bg-[#E8F1E8] transition-colors"
          aria-label="Previous Day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-2">
          <CalendarIcon className="w-4 h-4 text-[#173F35]" />
          <div>
            <span className="font-bold text-sm text-[#173F35] block leading-tight">
              {formattedDate}
            </span>
            {isToday && (
              <span className="text-[10px] font-semibold text-[#15803D] uppercase tracking-wider">
                Today
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleNextDay}
          className="p-2 rounded-xl text-[#78847C] hover:text-[#173F35] hover:bg-[#E8F1E8] transition-colors"
          aria-label="Next Day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-[#dbe2d8] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]"
        />

        {!isToday && (
          <Button size="sm" variant="secondary" onClick={handleSetToday}>
            Today
          </Button>
        )}
      </div>
    </div>
  );
}
