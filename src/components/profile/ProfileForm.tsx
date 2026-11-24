"use client";

import React, { useState } from "react";
import { UserProfile, DietaryPreference, ActivityLevel, NutritionGoalType } from "@/types/nutrition";
import { updateUserProfile } from "@/lib/services/profileService";
import { AllergySelector } from "./AllergySelector";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Check, User, HeartPulse, ShieldAlert } from "lucide-react";

interface ProfileFormProps {
  initialProfile: UserProfile;
  onProfileUpdated?: (updated: UserProfile) => void;
}

export function ProfileForm({ initialProfile, onProfileUpdated }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute profile completion percentage
  let filledFields = 0;
  if (profile.fullName) filledFields++;
  if (profile.age) filledFields++;
  if (profile.heightCm) filledFields++;
  if (profile.weightKg) filledFields++;
  if (profile.dietaryPreference) filledFields++;
  if (profile.activityLevel) filledFields++;
  if (profile.nutritionGoal) filledFields++;
  const completionPercentage = Math.round((filledFields / 7) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const res = await updateUserProfile(profile.id, {
        fullName: profile.fullName,
        age: profile.age,
        gender: profile.gender,
        heightCm: profile.heightCm,
        weightKg: profile.weightKg,
        dietaryPreference: profile.dietaryPreference,
        allergies: profile.allergies,
        activityLevel: profile.activityLevel,
        nutritionGoal: profile.nutritionGoal,
        isOnboarded: true,
      });

      if (!res.success) {
        throw new Error(res.error || "Failed to update profile.");
      }

      setProfile(res.profile);
      setSaveSuccess(true);
      if (onProfileUpdated) onProfileUpdated(res.profile);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Completion Indicator */}
      <div className="p-4 bg-white rounded-2xl border border-[#E2E8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-xs font-bold text-[#173F35] block">
            Profile Completion Status
          </span>
          <p className="text-xs text-[#78847C]">
            Complete your profile to unlock calibrated TDEE calculations and allergy-safe recipes.
          </p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="w-32 bg-[#E8F1E8] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#173F35] h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#173F35]">{completionPercentage}%</span>
        </div>
      </div>

      <Card className="border border-[#E2E8E2]">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#173F35]" />
            <div>
              <h3 className="font-bold text-base text-[#173F35]">Personal Biometrics</h3>
              <p className="text-xs text-[#78847C]">Used to estimate calorie expenditure</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Gender</label>
              <select
                value={profile.gender || "prefer_not_to_say"}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    gender: e.target.value as "male" | "female" | "other" | "prefer_not_to_say",
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Age (Years)</label>
              <input
                type="number"
                min="14"
                max="120"
                value={profile.age || ""}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Height (cm)</label>
              <input
                type="number"
                min="50"
                max="250"
                value={profile.heightCm || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    heightCm: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">Weight (kg)</label>
              <input
                type="number"
                min="30"
                max="300"
                step="0.5"
                value={profile.weightKg || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    weightKg: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#E2E8E2]">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#173F35]" />
            <div>
              <h3 className="font-bold text-base text-[#173F35]">Dietary Lifestyle & Goals</h3>
              <p className="text-xs text-[#78847C]">Preferences to customize nutrition suggestions</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">
                Dietary Preference
              </label>
              <select
                value={profile.dietaryPreference}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    dietaryPreference: e.target.value as DietaryPreference,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              >
                <option value="omnivore">Omnivore (Everything)</option>
                <option value="vegetarian">Vegetarian (Plant-based + Dairy)</option>
                <option value="eggetarian">Eggetarian (Vegetarian + Eggs)</option>
                <option value="vegan">Vegan (Strictly plant-based)</option>
                <option value="pescatarian">Pescatarian (Vegetarian + Seafood)</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="keto">Ketogenic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">
                Primary Nutrition Goal
              </label>
              <select
                value={profile.nutritionGoal}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    nutritionGoal: e.target.value as NutritionGoalType,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
              >
                <option value="balanced_nutrition">General Balanced Nutrition</option>
                <option value="maintain_weight">Maintain Weight</option>
                <option value="build_muscle">Build Muscle</option>
                <option value="weight_management">Weight Management (Fat Loss)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202B25] mb-1">
              Daily Activity Level
            </label>
            <select
              value={profile.activityLevel}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  activityLevel: e.target.value as ActivityLevel,
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
            >
              <option value="sedentary">Sedentary (Little to no daily exercise, desk job)</option>
              <option value="light">Lightly Active (Light exercise or sports 1-3 days/week)</option>
              <option value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</option>
              <option value="active">Active (Hard exercise 6-7 days/week)</option>
              <option value="very_active">Very Active (Twice daily training or physical job)</option>
            </select>
          </div>

          {/* Allergy selector */}
          <div className="pt-2 border-t border-[#EDF2EC]">
            <AllergySelector
              selectedAllergies={profile.allergies || []}
              onChange={(allergies) => setProfile({ ...profile, allergies })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center py-4">
          {errorMessage ? (
            <span className="text-xs text-[#D94841] font-semibold">{errorMessage}</span>
          ) : (
            <span className="text-xs text-[#78847C]">
              Your health biometrics remain strictly private and encrypted
            </span>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={saveSuccess ? <Check className="w-4 h-4" /> : undefined}
          >
            {saveSuccess ? "Profile Updated!" : "Save Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
