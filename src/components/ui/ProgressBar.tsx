import React from "react";

interface ProgressBarProps {
  value: number; // Current value
  max: number; // Max/target value
  color?: string; // Hex or Tailwind class
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  unit?: string;
}

export function ProgressBar({
  value,
  max,
  color = "#173F35",
  height = "md",
  showLabel = false,
  unit = "g",
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium text-[#78847C]">
          <span>
            {value} / {max} {unit}
          </span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-[#E8F1E8] rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
