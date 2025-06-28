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
        "flex flex-col items-center gap-4 p-6 rounded-lg transition-all duration-300 group",
        "bg-white sophisticated-shadow hover:card-shadow-hover border border-spa-stone/10",
        "hover:scale-[1.02] active:scale-[0.98]",
        isActive && "bg-primary text-white border-primary",
        className,
      )}
    >
      <div
        className={cn(
          "p-3 rounded-full transition-all duration-300",
          isActive
            ? "bg-white/20 text-white"
            : "bg-spa-cream text-spa-charcoal group-hover:bg-primary group-hover:text-white",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "font-light text-sm",
          isActive
            ? "text-white"
            : "text-spa-charcoal group-hover:text-primary",
        )}
      >
        {label}
      </span>
    </button>
  );
}
