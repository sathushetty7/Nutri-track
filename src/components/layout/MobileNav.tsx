"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Camera,
  UtensilsCrossed,
  Target,
  History,
  User,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Scan", href: "/dashboard/scanner", icon: Camera },
    { label: "Recipes", href: "/dashboard/recipes", icon: UtensilsCrossed },
    { label: "Goals", href: "/dashboard/goals", icon: Target },
    { label: "Diary", href: "/dashboard/history", icon: History },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8E2] px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
                isActive ? "text-[#173F35] font-bold" : "text-[#78847C] font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? "bg-[#E8F1E8] text-[#173F35]" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
