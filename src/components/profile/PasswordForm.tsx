"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import { KeyRound, Check, AlertCircle } from "lucide-react";

export function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters long." });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsUpdating(true);
    setStatus(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      }

      setStatus({ type: "success", message: "Password updated successfully." });
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const error = err as Error;
      setStatus({ type: "error", message: error.message || "Failed to update password." });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="border border-[#E2E8E2]">
      <CardHeader className="py-4">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#173F35]" />
          <div>
            <h3 className="font-bold text-base text-[#173F35]">Security & Password</h3>
            <p className="text-xs text-[#78847C]">Update your account credentials</p>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleUpdate}>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202B25] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3 py-2 rounded-xl border border-[#dbe2d8] text-sm focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>
          </div>

          {status && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-[#E8F1E8] text-[#15803D]"
                  : "bg-[#FDE8E7] text-[#D94841]"
              }`}
            >
              {status.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{status.message}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end py-4">
          <Button
            type="submit"
            variant="outline"
            size="md"
            isLoading={isUpdating}
            disabled={!password || !confirmPassword}
          >
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
