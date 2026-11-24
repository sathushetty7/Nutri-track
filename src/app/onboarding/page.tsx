"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/services/authService";
import { getUserProfile, updateUserProfile } from "@/lib/services/profileService";
import { UserProfile, DietaryPreference, ActivityLevel, NutritionGoalType } from "@/types/nutrition";
import { AllergySelector } from "@/components/profile/AllergySelector";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Leaf, ArrowRight, Check, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const sess = await getCurrentUser();
      if (!sess.user) {
        router.push("/login");
        return;
      }
      const p = await getUserProfile(sess.user.id);
      setProfile(p);
    }
    load();
  }, [router]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F1]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35]" />
      </div>
    );
  }

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await updateUserProfile(profile.id, {
        ...profile,
        isOnboarded: true,
      });
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      await updateUserProfile(profile.id, { isOnboarded: true });
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Brand header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#173F35] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Leaf className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#173F35]">Welcome to NutriTrack</h1>
        <p className="text-xs text-[#78847C] mt-1">
          Let&apos;s personalize your nutrition goals and dietary preferences in 3 quick steps
        </p>

        {/* Steps progress indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-[#173F35]"
                  : s < step
                  ? "w-4 bg-[#A8BFA5]"
                  : "w-4 bg-[#dbe2d8]"
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="w-full max-w-xl border border-[#E2E8E2] shadow-lg">
        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Step 1: Biometrics */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#A8BFA5] uppercase tracking-wider block">
                  Step 1 of 3
                </span>
                <h2 className="text-lg font-bold text-[#173F35]">Basic Information & Biometrics</h2>
                <p className="text-xs text-[#78847C]">
                  Helps our nutrition engine compute your daily baseline energy expenditure
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202B25] mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="14"
                    max="110"
                    placeholder="e.g. 24"
                    value={profile.age || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, age: e.target.value ? Number(e.target.value) : undefined })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="60"
                    max="240"
                    placeholder="e.g. 175"
                    value={profile.heightCm || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        heightCm: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    placeholder="e.g. 70"
                    value={profile.weightKg || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        weightKg: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dietary Lifestyle & Allergies */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#A8BFA5] uppercase tracking-wider block">
                  Step 2 of 3
                </span>
                <h2 className="text-lg font-bold text-[#173F35]">Dietary Lifestyle & Food Allergies</h2>
                <p className="text-xs text-[#78847C]">
                  We will tailor recipes to your lifestyle and filter out recorded allergens
                </p>
              </div>

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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white capitalize"
                >
                  <option value="omnivore">Omnivore (Standard diet)</option>
                  <option value="vegetarian">Vegetarian (Plant-based + Dairy)</option>
                  <option value="eggetarian">Eggetarian (Vegetarian + Eggs)</option>
                  <option value="vegan">Vegan (Strictly plant-based)</option>
                  <option value="pescatarian">Pescatarian (Vegetarian + Fish)</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="keto">Keto</option>
                </select>
              </div>

              <div>
                <AllergySelector
                  selectedAllergies={profile.allergies || []}
                  onChange={(allergies) => setProfile({ ...profile, allergies })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Goals & Activity Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#A8BFA5] uppercase tracking-wider block">
                  Step 3 of 3
                </span>
                <h2 className="text-lg font-bold text-[#173F35]">Your Nutrition Goal & Activity</h2>
                <p className="text-xs text-[#78847C]">
                  Select the direction that aligns with your wellness journey
                </p>
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
                >
                  <option value="balanced_nutrition">General Balanced Nutrition & Sustained Energy</option>
                  <option value="maintain_weight">Maintain Current Weight</option>
                  <option value="build_muscle">Build Muscle / Strength</option>
                  <option value="weight_management">Weight Management (Healthy Fat Loss)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202B25] mb-1">
                  Typical Activity Level
                </label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      activityLevel: e.target.value as ActivityLevel,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-white"
                >
                  <option value="sedentary">Sedentary (Mostly desk work)</option>
                  <option value="light">Lightly Active (1-3 days exercise/week)</option>
                  <option value="moderate">Moderately Active (3-5 days workout/week)</option>
                  <option value="active">Active (6-7 days training/week)</option>
                  <option value="very_active">Very Active (Physical labor or intense sport)</option>
                </select>
              </div>

              <div className="p-3 bg-[#FEF3C7]/60 border border-[#FDE68A] rounded-xl flex items-start gap-2 text-xs text-[#92400E]">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
                <p>
                  NutriTrack calculates general nutritional estimates and does not prescribe medical
                  diets. You can modify your targets at any time in your Settings.
                </p>
              </div>
            </div>
          )}

          {/* Stepper buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDF2EC]">
            {step > 1 ? (
              <Button type="button" variant="outline" size="sm" onClick={handlePrev}>
                Back
              </Button>
            ) : (
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-[#78847C] hover:text-[#202B25] font-semibold"
              >
                Skip for now
              </button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleComplete}
                isLoading={isSubmitting}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Finish & Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
