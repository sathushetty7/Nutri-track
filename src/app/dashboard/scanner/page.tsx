"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ImageUploader } from "@/components/scanner/ImageUploader";
import { DetectedFoodList } from "@/components/scanner/DetectedFoodList";
import { NutritionReviewCard } from "@/components/scanner/NutritionReviewCard";
import { DetectedFoodItem } from "@/types/nutrition";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

export default function MealScannerPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; type: string } | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedFoodItem[]>([]);
  const [analysisMeta, setAnalysisMeta] = useState<{ provider?: string; description?: string } | null>(
    null
  );

  const handleImageSelected = (base64: string, info?: { name: string; type: string }) => {
    setSelectedImage(base64);
    setFileInfo(info);
    setDetectedItems([]);
    setAnalysisError(null);
    setAnalysisMeta(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setFileInfo(undefined);
    setDetectedItems([]);
    setAnalysisError(null);
    setAnalysisMeta(null);
  };

  const handleAnalyzePhoto = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const res = await fetch("/api/analyze-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: fileInfo?.type || "image/jpeg",
          fileName: fileInfo?.name || "meal_photo.jpg",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze meal photo.");
      }

      setDetectedItems(data.items || []);
      setAnalysisMeta({
        provider: data.provider,
        description: data.description,
      });
    } catch (err: unknown) {
      const error = err as Error;
      setAnalysisError(error.message || "An error occurred during vision analysis. Please retry.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMealSaved = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("nutritrack_meal_updated"));
    }
    router.push("/dashboard");
  };

  return (
    <AppShell title="AI Meal Scanner">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Intro Banner */}
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#173F35] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Modal Vision Recognition</span>
              </div>
              <h2 className="text-xl font-bold text-[#173F35]">Snap or Upload Your Meal</h2>
              <p className="text-xs text-[#78847C] mt-0.5">
                Our vision engine identifies foods and cross-references calibrated nutritional records.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#15803D] bg-[#E8F1E8] px-3 py-1.5 rounded-full font-semibold shrink-0">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Indian & Global DB</span>
            </div>
          </div>
        </div>

        {/* Step 1 & 2: Image Uploader / Viewfinder */}
        <div className="bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs">
          <ImageUploader
            selectedImage={selectedImage}
            onImageSelected={handleImageSelected}
            onClear={handleClearImage}
            isAnalyzing={isAnalyzing}
          />

          {/* Action trigger when image is loaded but not yet analyzed */}
          {selectedImage && detectedItems.length === 0 && (
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[#F8F7F1] rounded-xl border border-[#E2E8E2]">
              <div className="text-xs text-[#78847C]">
                Ready to inspect plate components, portions, and estimate macronutrients.
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyzePhoto}
                isLoading={isAnalyzing}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Analyze Meal Photo
              </Button>
            </div>
          )}

          {/* Error Banner & Retry */}
          {analysisError && (
            <div className="mt-4 p-4 bg-[#FDE8E7] border border-[#f5c6c4] rounded-xl flex items-center justify-between gap-3 text-xs text-[#D94841]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{analysisError}</span>
              </div>
              <Button
                size="sm"
                variant="danger"
                onClick={handleAnalyzePhoto}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Retry
              </Button>
            </div>
          )}
        </div>

        {/* Step 3: Editable Detection Review Table & Nutrition Summary */}
        {detectedItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Editable Foods List */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8E2] p-5 shadow-xs space-y-4">
              {analysisMeta && (
                <div className="p-3 bg-[#E8F1E8]/70 border border-[#d6e5d6] rounded-xl text-xs text-[#173F35] flex items-center justify-between">
                  <span>
                    <strong>Detection Status:</strong> {analysisMeta.description}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#d6e5d6]">
                    {analysisMeta.provider === "gemini_vision" ? "Gemini 1.5 Flash" : "Calibrated Engine"}
                  </span>
                </div>
              )}

              <DetectedFoodList items={detectedItems} onChange={setDetectedItems} />
            </div>

            {/* Right Column: Nutrition Totals Card & Save to Diary */}
            <div className="lg:col-span-5 sticky top-20">
              <NutritionReviewCard
                items={detectedItems}
                imageUrl={selectedImage || undefined}
                onSaved={handleMealSaved}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
              />
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
