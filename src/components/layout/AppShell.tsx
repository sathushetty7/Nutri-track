"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";
import { getCurrentUser, AuthSession } from "@/lib/services/authService";
import { getUserProfile } from "@/lib/services/profileService";
import { UserProfile } from "@/types/nutrition";
import { ManualFoodModal } from "../scanner/ManualFoodModal";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const sess = await getCurrentUser();
      setSession(sess);
      if (sess.user) {
        const prof = await getUserProfile(sess.user.id);
        setProfile(prof);
      }
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F7F1]">
      {/* Desktop Sidebar */}
      <Sidebar
        userEmail={session?.user?.email || "user@nutritrack.io"}
        userName={profile?.fullName || session?.user?.fullName || "Healthy User"}
        isDemo={session?.isDemo ?? true}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <TopNav
          title={title}
          userName={profile?.fullName || session?.user?.fullName || "Healthy User"}
          onQuickAdd={() => setIsQuickAddOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Quick Add Food Modal accessible globally from TopNav */}
      <ManualFoodModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onFoodAdded={() => {
          setIsQuickAddOpen(false);
          // Reload or broadcast update
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("nutritrack_meal_updated"));
          }
        }}
      />
    </div>
  );
}
