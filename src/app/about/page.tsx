import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Leaf, ShieldCheck, Heart, Sparkles, Brain, Database } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1E8] text-[#173F35] text-xs font-bold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Academic Mini-Project Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173F35] tracking-tight">
            Nutrition Intelligence Without The Noise.
          </h1>
          <p className="text-sm text-[#78847C] leading-relaxed">
            NutriTrack is built to demonstrate real full-stack software engineering, practical
            multi-modal vision AI integration, database management, and thoughtful health UX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#E2E8E2]">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#173F35] text-white flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F35]">Practical Vision AI</h3>
              <p className="text-xs text-[#78847C] leading-relaxed">
                Computer vision plate recognition using structured JSON schemas and safe fallbacks.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#E2E8E2]">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#245B48] text-white flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F35]">Verified Food Data</h3>
              <p className="text-xs text-[#78847C] leading-relaxed">
                Separates image recognition from nutrition calculations with verified 100g database records.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#E2E8E2]">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8BFA5] text-[#173F35] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F35]">Guilt-Free Analytics</h3>
              <p className="text-xs text-[#78847C] leading-relaxed">
                Encouraging, neutral feedback that focuses on weekly rhythms and sustainable vitality.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
