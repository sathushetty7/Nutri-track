"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PasswordForm } from "@/components/profile/PasswordForm";
import { Button } from "@/components/ui/Button";
import { getCurrentUser, logoutUser } from "@/lib/services/authService";
import { getUserProfile } from "@/lib/services/profileService";
import { UserProfile } from "@/types/nutrition";
import { User, LogOut, ShieldCheck } from "lucide-react";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = await getCurrentUser();
        const userId = session.user?.id || "demo-user-101";
        const p = await getUserProfile(userId);
        setProfile(p);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  if (isLoading || !profile) {
    return (
      <AppShell title="Profile & Settings">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35]" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Profile & Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#173F35] uppercase tracking-wider mb-1">
              <User className="w-3.5 h-3.5" />
              <span>User Profile & Preferences</span>
            </div>
            <h2 className="text-xl font-bold text-[#173F35]">
              {profile.fullName || "Your Account"}
            </h2>
            <p className="text-xs text-[#78847C] mt-0.5">
              Manage your personal biometrics, dietary allergies, and security credentials.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut className="w-3.5 h-3.5 text-[#D94841]" />}
            className="text-[#D94841] hover:bg-[#FDE8E7] self-start sm:self-auto"
          >
            Sign Out
          </Button>
        </div>

        {/* Profile biometrics and lifestyle form */}
        <ProfileForm initialProfile={profile} onProfileUpdated={setProfile} />

        {/* Password and security credentials */}
        <PasswordForm />
      </div>
    </AppShell>
  );
}
