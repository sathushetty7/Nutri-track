"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F1]/90 backdrop-blur-md border-b border-[#E2E8E2]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#173F35] flex items-center justify-center text-white shadow-xs">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#173F35] block leading-none">
              NutriTrack
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8BFA5] block mt-0.5">
              Smart Nutrition AI
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#78847C]">
          <Link href="#features" className="hover:text-[#173F35] transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-[#173F35] transition-colors">
            How It Works
          </Link>
          <Link href="#ai-scanner" className="hover:text-[#173F35] transition-colors">
            AI Meal Scanner
          </Link>
          <Link href="#recipes" className="hover:text-[#173F35] transition-colors">
            Recipe Finder
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#78847C] hover:text-[#173F35] hover:bg-[#E8F1E8]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8E2] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-[#202B25]">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#173F35]"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#173F35]"
            >
              How It Works
            </Link>
            <Link
              href="#ai-scanner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#173F35]"
            >
              AI Meal Scanner
            </Link>
            <Link
              href="#recipes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#173F35]"
            >
              Recipe Finder
            </Link>
          </div>
          <div className="pt-4 border-t border-[#EDF2EC] flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
