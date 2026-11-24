"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "../ui/Button";
import { Camera, RefreshCw, X, AlertCircle } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (base64Data: string) => void;
  onCancel: () => void;
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = useCallback(async () => {
    setIsInitializing(true);
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser environment.");
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.warn("Camera access error:", error);
      setCameraError(
        error.message || "Unable to access device camera. Please check camera permissions or upload an image file."
      );
    } finally {
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera, stream]);

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Data = canvas.toDataURL("image/jpeg", 0.85);

    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    onCapture(base64Data);
  };

  return (
    <div className="bg-black/90 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        aria-label="Close camera"
      >
        <X className="w-5 h-5" />
      </button>

      {cameraError ? (
        <div className="p-8 text-center max-w-sm text-white">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h4 className="font-bold text-base mb-1">Camera Unavailable</h4>
          <p className="text-xs text-gray-300 mb-5">{cameraError}</p>
          <div className="flex gap-2 justify-center">
            <Button size="sm" variant="outline" onClick={startCamera} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Retry
            </Button>
            <Button size="sm" variant="secondary" onClick={onCancel}>
              Upload File Instead
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-4/3 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/20">
            {isInitializing && (
              <p className="text-xs text-white animate-pulse">Initializing camera viewfinder...</p>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCapturePhoto}
              leftIcon={<Camera className="w-5 h-5" />}
              className="px-8 shadow-lg bg-[#245B48] hover:bg-[#173F35]"
            >
              Take Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
