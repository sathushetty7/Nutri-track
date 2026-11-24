"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { CameraCapture } from "./CameraCapture";
import { UploadCloud, Camera, RefreshCw, Trash2, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (base64: string, fileInfo?: { name: string; type: string }) => void;
  onClear: () => void;
  selectedImage: string | null;
  isAnalyzing: boolean;
}

export function ImageUploader({
  onImageSelected,
  onClear,
  selectedImage,
  isAnalyzing,
}: ImageUploaderProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setErrorMsg(null);

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 10MB. Please select a smaller photo.");
      return;
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg("Unsupported file format. Please upload a JPG, PNG, or WebP image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onImageSelected(base64, { name: file.name, type: file.type });
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  if (isCameraActive) {
    return (
      <CameraCapture
        onCapture={(base64) => {
          setIsCameraActive(false);
          onImageSelected(base64, { name: "captured_meal.jpg", type: "image/jpeg" });
        }}
        onCancel={() => setIsCameraActive(false)}
      />
    );
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {selectedImage ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#E2E8E2] bg-black/5 flex flex-col items-center p-4">
          <div className="relative w-full max-w-md aspect-4/3 rounded-xl overflow-hidden shadow-md">
            <Image
              src={selectedImage}
              alt="Meal to analyze"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={isAnalyzing}
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Replace Photo
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={isAnalyzing}
              onClick={onClear}
              className="text-[#D94841] hover:bg-[#FDE8E7]"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
            dragActive
              ? "border-[#173F35] bg-[#E8F1E8]/50"
              : "border-[#dbe2d8] hover:border-[#A8BFA5] bg-white"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#E8F1E8] text-[#173F35] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-[#173F35] mb-1">
            Upload or capture your meal photo
          </h3>
          <p className="text-xs text-[#78847C] max-w-sm mx-auto mb-6">
            Drag and drop an image of your breakfast, lunch, dinner, or snack, or use your camera to snap a photo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<UploadCloud className="w-4 h-4" />}
            >
              Browse Photo
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsCameraActive(true)}
              leftIcon={<Camera className="w-4 h-4" />}
            >
              Take Photo
            </Button>
          </div>

          <p className="text-[11px] text-[#78847C] mt-4">
            Supports JPG, PNG, WebP up to 10MB
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 p-3 bg-[#FDE8E7] border border-[#f5c6c4] text-[#D94841] rounded-xl flex items-center gap-2 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
