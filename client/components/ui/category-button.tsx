import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CategoryButtonProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryButton({
  icon,
  label,
  isActive = false,
  onClick,
  className,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200 group",
        "bg-white/70 backdrop-blur-sm card-shadow hover:card-shadow-hover",
        "hover:scale-105 active:scale-95",
        isActive && "bg-gradient-primary text-white",
        className,
      )}
    >
      <div
        className={cn(
          "p-4 rounded-xl transition-colors",
          isActive
            ? "bg-white/20"
            : "bg-gradient-primary text-white group-hover:bg-gradient-secondary",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "font-medium text-sm",
          isActive ? "text-white" : "text-gray-700",
        )}
      >
        {label}
      </span>
    </button>
  );
}
