import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E2E8E2] shadow-[0_2px_10px_rgba(23,63,53,0.04)] ${
        hoverable ? "hover:border-[#A8BFA5] hover:shadow-[0_4px_16px_rgba(23,63,53,0.08)] transition-all duration-200" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 pb-3 border-b border-[#EDF2EC] ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 pt-3 border-t border-[#EDF2EC] bg-[#FBFBF9] rounded-b-2xl ${className}`}>{children}</div>;
}
