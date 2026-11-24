"use client";

import React from "react";
import Link from "next/link";
import { Camera, Plus, Calendar, Bell } from "lucide-react";
import { Button } from "../ui/Button";

interface TopNavProps {
  title?: string;
  userName?: string;
  onQuickAdd?: () => void;
}

export function TopNav({ title = "Dashboard", userName = "Healthy User", onQuickAdd }: TopNavProps) {
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="h-16 bg-white border-b border-[#E2E8E2] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#173F35] tracking-tight">{title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-[#78847C]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{todayFormatted}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <Link href="/dashboard/scanner">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Camera className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
          >
            Scan Meal
          </Button>
        </Link>

        {onQuickAdd && (
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={onQuickAdd}
          >
            Add Food
          </Button>
        )}

        <div className="h-5 w-px bg-[#E2E8E2] hidden sm:block" />

        {/* User Mini Avatar */}
        <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs font-semibold text-[#202B25] hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#E8F1E8] border border-[#d6e5d6] text-[#173F35] flex items-center justify-center font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
        </Link>
      </div>
    </header>
  );
}
