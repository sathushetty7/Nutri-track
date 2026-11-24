"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { resetPasswordForEmail } from "@/lib/services/authService";
import { Leaf, ArrowLeft, Check, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await resetPasswordForEmail(email);
      if (!res.success) throw new Error(res.error || "Unable to send reset email.");
      setSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message);
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
            <h1 className="text-2xl font-bold text-[#173F35]">Reset Password</h1>
            <p className="text-xs text-[#78847C]">
              Enter the email associated with your account to receive recovery instructions
            </p>
          </div>

          <Card className="border border-[#E2E8E2] shadow-lg">
            <CardContent className="p-6 sm:p-8 space-y-4">
              {submitted ? (
                <div className="text-center space-y-3 py-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8F1E8] text-[#15803D] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#173F35]">Recovery Link Sent</h3>
                  <p className="text-xs text-[#78847C] leading-relaxed">
                    If an account matches <strong>{email}</strong>, we have dispatched a secure password reset link.
                  </p>
                  <div className="pt-3">
                    <Link href="/login">
                      <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                        Return to Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {errorMessage && (
                    <div className="p-3 bg-[#FDE8E7] text-[#D94841] rounded-xl flex items-center gap-2 text-xs font-medium">
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
                  >
                    Send Recovery Email
                  </Button>

                  <div className="pt-2 text-center text-xs text-[#78847C]">
                    Remembered password?{" "}
                    <Link href="/login" className="text-[#173F35] font-bold hover:underline">
                      Sign in
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
