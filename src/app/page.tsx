import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Camera,
  UtensilsCrossed,
  Target,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  PieChart as PieIcon,
  Flame,
  Layers,
  Heart,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1]">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Messaging */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F1E8] border border-[#d6e5d6] text-xs font-bold text-[#173F35]">
                  <Sparkles className="w-3.5 h-3.5 text-[#173F35]" />
                  <span>Next-Generation Nutrition AI Platform</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#173F35] leading-[1.12]">
                  Understand what you eat. <br className="hidden sm:inline" />
                  <span className="text-[#245B48]">Transform how you live.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#78847C] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Track your nutrition, discover smarter meals, and make healthier food decisions with
                  NutriTrack. Powered by vision-capable AI, verified Indian nutritional databases, and
                  smart ingredient matching.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link href="/signup">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="shadow-md"
                    >
                      Get Started
                    </Button>
                  </Link>

                  <Link href="#features">
                    <Button variant="outline" size="lg">
                      Explore Features
                    </Button>
                  </Link>
                </div>

                {/* Proof badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-[#78847C] font-semibold border-t border-[#E2E8E2]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Photo Meal Recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Verified Indian Food Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Allergy-Safe Match</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Interactive Mockup Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md bg-white rounded-3xl border border-[#E2E8E2] shadow-2xl p-5 overflow-hidden">
                  <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
                      alt="Wholesome Meal Scanning"
                      fill
                      sizes="400px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-3 left-3 bg-[#173F35]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Camera className="w-3.5 h-3.5" />
                      <span>AI Vision Scan</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#173F35] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      680 kcal Estimated
                    </div>
                  </div>

                  {/* Detected items overlay mockup */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs p-2.5 bg-[#F8F7F1] rounded-xl border border-[#EDF2EC]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                        <span className="font-bold text-[#202B25]">Chapati / Roti</span>
                        <span className="text-[11px] text-[#78847C]">(2 pcs, 70g)</span>
                      </div>
                      <span className="font-bold text-[#173F35]">208 kcal</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-2.5 bg-[#F8F7F1] rounded-xl border border-[#EDF2EC]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                        <span className="font-bold text-[#202B25]">Palak Paneer</span>
                        <span className="text-[11px] text-[#78847C]">(1 bowl, 160g)</span>
                      </div>
                      <span className="font-bold text-[#173F35]">237 kcal</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-2.5 bg-[#F8F7F1] rounded-xl border border-[#EDF2EC]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                        <span className="font-bold text-[#202B25]">Yellow Dal Tadka</span>
                        <span className="text-[11px] text-[#78847C]">(1 bowl, 150g)</span>
                      </div>
                      <span className="font-bold text-[#173F35]">156 kcal</span>
                    </div>
                  </div>

                  {/* Quick macro bar */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#EDF2EC] text-center text-xs font-bold">
                    <div className="bg-[#E8F1E8] p-2 rounded-xl text-[#173F35]">
                      <span className="block text-[10px] text-[#78847C] font-semibold">Protein</span>
                      <span>34.5g</span>
                    </div>
                    <div className="bg-[#E8F1E8] p-2 rounded-xl text-[#173F35]">
                      <span className="block text-[10px] text-[#78847C] font-semibold">Carbs</span>
                      <span>88.0g</span>
                    </div>
                    <div className="bg-[#E8F1E8] p-2 rounded-xl text-[#173F35]">
                      <span className="block text-[10px] text-[#78847C] font-semibold">Fat</span>
                      <span>21.0g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT INTRODUCTION & 6 CORE PILLARS */}
        <section id="features" className="py-20 bg-white border-y border-[#E2E8E2]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                Core Product Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#173F35]">
                Engineered for Meaningful Daily Health
              </h2>
              <p className="text-sm text-[#78847C]">
                NutriTrack replaces tedious manual logging with computer vision, calibrated portioning,
                and personalized culinary intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#173F35] text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">1. AI Meal Photo Scanning</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Snap a photo of your plate or upload an image. Vision AI detects individual foods,
                  calibrates gram weights, and allows full user edits before saving.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#245B48] text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">2. Nutrition Dashboard & Analytics</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Live progress rings, 7-day calorie rhythm charts, macronutrient energy distribution,
                  and daily consistency scores powered by Recharts.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#A8BFA5] text-[#173F35] flex items-center justify-center shadow-xs">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">3. Ingredient-Based Recipe Finder</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Type what ingredients you have in your fridge or pantry. Get matched recipes with
                  ingredient availability scores and strict allergen exclusions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#173F35] text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">4. Personalized User Profiles</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Capture biometrics, dietary lifestyles (vegetarian, vegan, keto), and recorded
                  allergies to ensure safe, tailored recommendations.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">5. Calorie & Macro Target Engine</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Scientific Mifflin-St Jeor TDEE calculations with goal-oriented macro splits
                  (maintenance, muscle build, balanced nutrition, weight management).
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl border border-[#E2E8E2] bg-[#F8F7F1]/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#245B48] text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#173F35]">6. Complete Meal Diary & History</h3>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Calendar date navigation, meal slot filtering (breakfast, lunch, dinner, snack),
                  itemized macro breakdowns, and real-time deletion synchronization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-[#F8F7F1]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                Simple Daily Flow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#173F35]">
                How NutriTrack Works
              </h2>
              <p className="text-sm text-[#78847C]">
                From food photo to verified diary entry in under thirty seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8E2] shadow-xs text-center space-y-3">
                <span className="w-9 h-9 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-sm mx-auto">
                  1
                </span>
                <h4 className="font-bold text-base text-[#173F35]">Upload Meal</h4>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Take a quick snapshot of your plate using your device camera or upload an existing image.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2E8E2] shadow-xs text-center space-y-3">
                <span className="w-9 h-9 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-sm mx-auto">
                  2
                </span>
                <h4 className="font-bold text-base text-[#173F35]">Analyze & Match</h4>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Our server-side vision engine identifies foods and cross-references calibrated Indian & global reference records.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2E8E2] shadow-xs text-center space-y-3">
                <span className="w-9 h-9 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-sm mx-auto">
                  3
                </span>
                <h4 className="font-bold text-base text-[#173F35]">Review & Adjust</h4>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Easily edit food portions, change gram weights, add missing items, or remove misidentified foods.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2E8E2] shadow-xs text-center space-y-3">
                <span className="w-9 h-9 rounded-full bg-[#173F35] text-white flex items-center justify-center font-bold text-sm mx-auto">
                  4
                </span>
                <h4 className="font-bold text-base text-[#173F35]">Track Progress</h4>
                <p className="text-xs text-[#78847C] leading-relaxed">
                  Confirm to save. Your dashboard, remaining calorie budget, and weekly macro charts update automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI SCANNER & DATABASE SHOWCASE */}
        <section id="ai-scanner" className="py-20 bg-white border-t border-[#E2E8E2]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                  Precision Nutrition Engineering
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#173F35]">
                  Never Blindly Trust AI Nutrition Estimates.
                </h2>
                <p className="text-sm text-[#78847C] leading-relaxed">
                  Generic AI tools often hallucinate nutritional values. NutriTrack implements a rigorous multi-tier architecture:
                </p>

                <div className="space-y-3 text-xs text-[#202B25]">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F7F1] border border-[#EDF2EC]">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Separation of Vision from Calculation:</strong> Vision models recognize visual cues; calibrated databases compute exact macro formulas per 100g.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F7F1] border border-[#EDF2EC]">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Transparent Source Badges:</strong> Every detected item displays whether it is backed by our verified database or flagged as an AI estimate.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F7F1] border border-[#EDF2EC]">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Mandatory User Confirmation:</strong> We never save records to your diary without your manual review and approval.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/dashboard/scanner">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Try the AI Scanner
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#E2E8E2] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                    alt="Nutritious Dal Khichdi Bowl"
                    width={800}
                    height={500}
                    className="object-cover w-full h-[360px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                    <span className="text-xs uppercase font-bold text-[#A8BFA5] tracking-wider mb-1">
                      Verified Indian Food Dataset
                    </span>
                    <h4 className="text-xl font-bold">Moong Dal Khichdi with Desi Ghee</h4>
                    <p className="text-xs text-[#E8F1E8] mt-1 max-w-md">
                      Calibrated at 122 kcal, 4.2g protein, 18.5g carbs per 100g serving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INGREDIENT RECIPE SHOWCASE */}
        <section id="recipes" className="py-20 bg-[#F8F7F1] border-t border-[#E2E8E2]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                Smart Culinary Discovery
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#173F35]">
                Turn Available Ingredients Into Healthy Meals
              </h2>
              <p className="text-sm text-[#78847C]">
                Got tomatoes, paneer, and spinach? Our recipe matching algorithm ranks dishes by ingredient availability and filters out food allergies automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
                    alt="Palak Paneer"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#15803D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    90% Match
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#173F35]">Iron-Rich Palak Paneer</h4>
                  <p className="text-xs text-[#78847C] mt-1">
                    Paneer cubes simmered in vibrant spiced spinach puree.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="forest" size="sm">285 kcal</Badge>
                    <Badge variant="verified" size="sm">16.5g Protein</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
                    alt="Egg Bhurji"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#15803D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    85% Match
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#173F35]">Street-Style Egg Bhurji</h4>
                  <p className="text-xs text-[#78847C] mt-1">
                    Fluffy scrambled eggs with caramelized onions & fresh cilantro.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="forest" size="sm">220 kcal</Badge>
                    <Badge variant="verified" size="sm">17.5g Protein</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
                    alt="Amritsari Chana Masala"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#D97706] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    70% Match
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#173F35]">Amritsari Chana Masala</h4>
                  <p className="text-xs text-[#78847C] mt-1">
                    Protein-dense chickpeas in slow-cooked onion & cumin gravy.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="forest" size="sm">255 kcal</Badge>
                    <Badge variant="verified" size="sm">13.5g Protein</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link href="/dashboard/recipes">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Full Recipe Catalog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FINAL CALL TO ACTION */}
        <section className="py-20 bg-[#173F35] text-white text-center">
          <div className="mx-auto max-w-4xl px-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8BFA5] block">
              Start Your Nutrition Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Ready to understand what you eat?
            </h2>
            <p className="text-sm sm:text-base text-[#E8F1E8] max-w-xl mx-auto font-normal">
              Join NutriTrack today. Track meals in seconds, discover recipes tailored to your ingredients, and sustain healthy habits effortlessly.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-[#173F35] hover:bg-[#F8F7F1] shadow-lg font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Free Account
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Open Live Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
