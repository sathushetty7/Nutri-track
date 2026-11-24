import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { ShieldCheck, Lock, EyeOff, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider block">
            Data Governance & Confidentiality
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173F35] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#78847C]">
            Last updated: November 2026 • NutriTrack Academic Demonstration Platform
          </p>
        </div>

        <Card className="border border-[#E2E8E2]">
          <CardContent className="p-6 sm:p-8 space-y-6 text-xs text-[#202B25] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#173F35]">1. Overview and Commitment</h2>
              <p className="text-[#78847C]">
                At NutriTrack, we treat your nutritional logs, personal biometrics (age, weight, height),
                and dietary preferences as sensitive personal data. We implement industry-standard
                protections, Row Level Security (RLS) on PostgreSQL, and strict access controls.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#173F35]">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-[#78847C]">
                <li><strong>Account Credentials:</strong> Email address and authentication tokens via Supabase Auth.</li>
                <li><strong>Biometric Data:</strong> Self-reported height, weight, age, and activity level used solely for metabolic expenditure estimation.</li>
                <li><strong>Dietary Information:</strong> Food allergies, dietary preferences (vegetarian, vegan, keto), and logged meals.</li>
                <li><strong>Meal Photos:</strong> Uploaded images processed through server-side vision endpoints for plate food recognition.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#173F35]">3. How Data is Used & Protected</h2>
              <p className="text-[#78847C]">
                Your meal images and nutritional records are never sold, rented, or used for third-party
                advertising. All data queries are protected by Row Level Security policies where users can
                only inspect and mutate their own authenticated records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#173F35]">4. Data Retention & Deletion</h2>
              <p className="text-[#78847C]">
                Users have the right at any time to delete individual meals, clear daily diary records, or
                request total account purge through our Settings panel.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
