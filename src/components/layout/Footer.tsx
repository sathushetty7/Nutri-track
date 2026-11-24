import React from "react";
import Link from "next/link";
import { Leaf, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8E2] pt-14 pb-10 text-xs text-[#78847C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#173F35] flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#173F35]">
                NutriTrack
              </span>
            </Link>
            <p className="max-w-md text-xs text-[#78847C] leading-relaxed">
              Advanced AI-powered nutrition tracking and intelligent ingredient-based meal planning.
              Engineered with modern full-stack software architecture, calibrated food databases, and
              guilt-free lifestyle analytics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#173F35] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Full-Stack Academic Mini-Project Demonstration</span>
            </div>
          </div>

          {/* Core capabilities */}
          <div>
            <h4 className="font-bold text-sm text-[#173F35] mb-3">Product Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard/scanner" className="hover:text-[#173F35] transition-colors">
                  AI Meal Photo Scanner
                </Link>
              </li>
              <li>
                <Link href="/dashboard/recipes" className="hover:text-[#173F35] transition-colors">
                  Ingredient Recipe Finder
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#173F35] transition-colors">
                  Daily Nutrition Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/goals" className="hover:text-[#173F35] transition-colors">
                  Macronutrient Targets
                </Link>
              </li>
              <li>
                <Link href="/dashboard/history" className="hover:text-[#173F35] transition-colors">
                  Complete Food Diary
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Medical */}
          <div>
            <h4 className="font-bold text-sm text-[#173F35] mb-3">Legal & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#173F35] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#173F35] transition-colors">
                  Terms & Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#173F35] transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#173F35] transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-[#F8F7F1] border border-[#E2E8E2] text-[11px] text-[#78847C] leading-relaxed">
          <strong className="text-[#202B25] font-semibold">Important Medical & Nutrition Disclaimer:</strong>{" "}
          NutriTrack is an informational technology tool designed for educational, academic, and general wellness purposes only. It is not medical software and does not provide clinical diagnosis, treatment, or prescriptive medical advice. Computer vision food recognition, portion size estimations, and nutritional values may contain inaccuracies and must be reviewed by the user. Individuals with medical conditions, eating disorders, pregnancy, or metabolic diseases should consult a licensed physician or registered dietitian before making dietary changes.
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#EDF2EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} NutriTrack. Designed with care for healthy living.</p>
          <div className="flex items-center gap-1 text-[#78847C]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#173F35] fill-current" />
            <span>for wellness technology.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
