import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "mint" | "verified" | "estimate" | "outline" | "warning" | "danger";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "mint", size = "sm", className = "" }: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold",
  };

  const variantStyles = {
    forest: "bg-[#173F35] text-white",
    mint: "bg-[#E8F1E8] text-[#173F35] border border-[#d6e5d6]",
    verified: "bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]",
    estimate: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    outline: "border border-[#dbe2d8] text-[#78847C] bg-white",
    warning: "bg-[#FEF3C7] text-[#D97706]",
    danger: "bg-[#FDE8E7] text-[#D94841]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full tracking-tight transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {variant === "verified" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] inline-block shrink-0" />
      )}
      {variant === "estimate" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] inline-block shrink-0" />
      )}
      {children}
    </span>
  );
}
