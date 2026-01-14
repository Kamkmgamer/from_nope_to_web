"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
}

interface WelcomeHeaderProps {
  userName: string;
  locale: string;
  stats?: StatItem[];
  className?: string;
}

function getTimeOfDayGreeting(locale: string): {
  greeting: string;
  icon: string;
} {
  const hour = new Date().getHours();
  const isArabic = locale === "ar";

  if (hour >= 5 && hour < 12) {
    return {
      greeting: isArabic ? "صباح الخير" : "Good morning",
      icon: "🌅",
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: isArabic ? "مساء الخير" : "Good afternoon",
      icon: "☀️",
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: isArabic ? "مساء الخير" : "Good evening",
      icon: "🌆",
    };
  } else {
    return {
      greeting: isArabic ? "مساء الخير" : "Good evening",
      icon: "🌙",
    };
  }
}

export function WelcomeHeader({
  userName,
  locale,
  stats = [],
  className,
}: WelcomeHeaderProps) {
  const t = useTranslations("dashboard.home");
  const isRTL = locale === "ar";

  const { greeting, icon } = getTimeOfDayGreeting(locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
    >
      {/* Main greeting */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="greeting">
            {icon}
          </span>
          <span className="label-mono text-muted-foreground text-sm tracking-wider uppercase">
            {greeting}
          </span>
        </div>
        <h1 className="font-display text-foreground mt-3 text-3xl leading-tight font-normal lg:text-4xl">
          {isRTL ? `${userName}، ${greeting}` : `${greeting}, ${userName}`}
        </h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </div>

      {/* Quick stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-secondary/50 rounded-lg p-4"
            >
              <p className="label-mono text-muted-foreground text-xs tracking-wider uppercase">
                {stat.label}
              </p>
              <p className="font-display text-foreground mt-1 text-2xl font-normal">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
