"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { loginWithEmail } from "@/lib/services/authService";
import { Leaf, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await loginWithEmail(email, password);
      if (!res.success) {
        throw new Error(res.error || "Invalid email or password.");
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to log in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithEmail("sathwik@nutritrack.io", "demo123456");
      router.push("/dashboard");
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
            <h1 className="text-2xl font-bold text-[#173F35]">Welcome Back</h1>
            <p className="text-xs text-[#78847C]">
              Sign in to access your daily nutrition diary and meal analytics
            </p>
          </div>

          <Card className="border border-[#E2E8E2] shadow-lg">
            <CardContent className="p-6 sm:p-8 space-y-5">
              {/* Quick One-Click Demo Access */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full p-3 bg-[#E8F1E8] border border-[#d6e5d6] text-[#173F35] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#dcebdd] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Demo Login (One-Click)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-[#EDF2EC]" />
                <span className="bg-white px-3 text-[11px] text-[#78847C] uppercase font-semibold tracking-wider relative">
                  Or with email
                </span>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-[#202B25]">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#173F35] hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35] bg-[#F8F7F1]/40"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-[#FDE8E7] border border-[#f5c6c4] text-[#D94841] rounded-xl flex items-center gap-2 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full shadow-sm"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In
                </Button>
              </form>

              <div className="pt-2 text-center text-xs text-[#78847C]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#173F35] font-bold hover:underline">
                  Sign up for free
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
