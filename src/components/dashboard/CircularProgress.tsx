"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { Trophy, BookOpen } from "lucide-react";

interface CircularProgressProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { size: 80, fontSize: "text-lg", iconSize: 16 },
  md: { size: 120, fontSize: "text-2xl", iconSize: 20 },
  lg: { size: 160, fontSize: "text-4xl", iconSize: 28 },
};

export function CircularProgress({
  percentage,
  size = "md",
  strokeWidth = 8,
  showLabel = true,
  showIcon = true,
  className,
}: CircularProgressProps) {
  const config = sizeConfig[size];
  const radius = (config.size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const isComplete = percentage === 100;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: config.size, height: config.size }}
    >
      {/* Background circle */}
      <svg
        className="absolute inset-0"
        width={config.size}
        height={config.size}
        viewBox={`0 0 ${config.size} ${config.size}`}
      >
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-secondary"
        />
      </svg>

      {/* Progress circle */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={config.size}
        height={config.size}
        viewBox={`0 0 ${config.size} ${config.size}`}
      >
        <motion.circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn(
            "transition-colors duration-500",
            isComplete
              ? "stroke-emerald-500 dark:stroke-emerald-400"
              : "stroke-primary",
          )}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          strokeDasharray={circumference}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showIcon && isComplete ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="text-emerald-500 dark:text-emerald-400"
          >
            <Trophy
              style={{ width: config.iconSize, height: config.iconSize }}
            />
          </motion.div>
        ) : showIcon && percentage > 0 ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-primary mb-0.5"
          >
            <BookOpen
              style={{
                width: config.iconSize * 0.8,
                height: config.iconSize * 0.8,
              }}
            />
          </motion.div>
        ) : null}

        {showLabel && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className={cn(
              "font-display font-bold tabular-nums",
              config.fontSize,
              isComplete
                ? "text-emerald-500 dark:text-emerald-400"
                : "text-foreground",
            )}
          >
            {percentage}%
          </motion.span>
        )}
      </div>

      {/* Completion glow effect */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.4] }}
          transition={{
            delay: 1.2,
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute inset-0 rounded-full bg-emerald-500/30 dark:bg-emerald-400/20"
        />
      )}
    </div>
  );
}
