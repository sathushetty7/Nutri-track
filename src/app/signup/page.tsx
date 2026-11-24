"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { registerWithEmail } from "@/lib/services/authService";
import { Leaf, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await registerWithEmail(email, password, fullName);
      if (!res.success) {
        throw new Error(res.error || "Failed to create account.");
      }
      router.push("/onboarding");
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#173F35] text-white flex items-center justify-center mx-auto shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-[#173F35]">Create Your Account</h1>
            <p className="text-xs text-[#78847C]">
              Start tracking daily nutrition and discover recipes from ingredients you have
            </p>
          </div>

          <Card className="border border-[#E2E8E2] shadow-lg">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sathwik Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202B25] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/40"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-[#FDE8E7] border border-[#f5c6c4] text-[#D94841] rounded-xl flex items-center gap-2 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="text-[11px] text-[#78847C] leading-snug">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-[#173F35] underline">
                    Terms & Medical Disclaimer
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#173F35] underline">
                    Privacy Policy
                  </Link>
                  .
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full shadow-sm"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Account & Onboard
                </Button>
              </form>

              <div className="pt-2 text-center text-xs text-[#78847C]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#173F35] font-bold hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
