"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Camera,
  UtensilsCrossed,
  Target,
  History,
  User,
  LogOut,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { logoutUser } from "@/lib/services/authService";

interface SidebarProps {
  userEmail?: string;
  userName?: string;
  isDemo?: boolean;
}

export function Sidebar({ userEmail = "user@nutritrack.io", userName = "Healthy User", isDemo = true }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "AI Meal Scanner", href: "/dashboard/scanner", icon: Camera },
    { label: "Recipe Finder", href: "/dashboard/recipes", icon: UtensilsCrossed },
    { label: "Nutrition Goals", href: "/dashboard/goals", icon: Target },
    { label: "Meal Diary", href: "/dashboard/history", icon: History },
    { label: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ];

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-[#E2E8E2] min-h-screen p-5 shrink-0 select-none">
      {/* Brand Header */}
      <Link href="/dashboard" className="flex items-center gap-2.5 px-2 py-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#173F35] flex items-center justify-center text-white shadow-sm">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-[#173F35] block leading-none">
            NutriTrack
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#A8BFA5] mt-1 block">
            AI Nutrition Platform
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#173F35] text-white shadow-xs"
                  : "text-[#78847C] hover:text-[#202B25] hover:bg-[#F8F7F1]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#78847C]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Demo / Verified Status Banner */}
      <div className="my-4 p-3 bg-[#E8F1E8]/60 border border-[#d6e5d6] rounded-xl text-xs">
        <div className="flex items-center gap-1.5 text-[#173F35] font-semibold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>{isDemo ? "Live Academic Mode" : "Supabase Cloud"}</span>
        </div>
        <p className="text-[11px] text-[#78847C] leading-snug">
          Verified Indian & Global Food Database with Calibrated Portioning.
        </p>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="pt-4 border-t border-[#EDF2EC] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#202B25] truncate">{userName}</p>
            <p className="text-[10px] text-[#78847C] truncate">{userEmail}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-1.5 rounded-lg text-[#78847C] hover:text-[#D94841] hover:bg-[#FDE8E7] transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
