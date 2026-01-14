"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const labelSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function ProgressBar({
  value,
  showLabel = false,
  size = "md",
  className,
  label,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-muted-foreground font-mono",
              labelSizeStyles[size],
            )}
          >
            {label ?? `${clampedValue}%`}
          </span>
        </div>
      )}
      <div
        className={cn(
          "bg-secondary w-full overflow-hidden rounded-full",
          sizeStyles[size],
        )}
      >
        <motion.div
          className="bg-accent h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${clampedValue}% complete`}
          aria-label={label ?? "Progress"}
        />
      </div>
    </div>
  );
}
