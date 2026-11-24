import React from "react";

interface MacroRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  unit?: string;
  sublabel?: string;
}

export function MacroRing({
  value,
  max,
  size = 110,
  strokeWidth = 9,
  color = "#173F35",
  bgColor = "#E8F1E8",
  label,
  unit = "",
  sublabel,
}: MacroRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
          <span className="text-lg font-bold text-[#202B25] leading-none">
            {value.toLocaleString()}
          </span>
          {unit && <span className="text-[10px] text-[#78847C] font-medium mt-0.5">{unit}</span>}
        </div>
      </div>

      {label && <span className="text-xs font-semibold text-[#202B25] mt-2">{label}</span>}
      {sublabel && <span className="text-[11px] text-[#78847C]">{sublabel}</span>}
    </div>
  );
}
