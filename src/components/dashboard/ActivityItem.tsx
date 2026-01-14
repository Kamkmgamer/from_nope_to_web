"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CirclePlay } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { RecentActivityItem } from "../../../convex/dashboard";
import { cn } from "~/lib/utils";

interface ActivityItemProps {
  activity: RecentActivityItem;
  className?: string;
}

export function ActivityItem({ activity, className }: ActivityItemProps) {
  const locale = useLocale();
  const tDashboard = useTranslations("dashboard");

  const isRTL = locale === "ar";
  const lessonTitle = isRTL ? activity.lessonTitleAr : activity.lessonTitleEn;
  const courseTitle = isRTL ? activity.courseTitleAr : activity.courseTitleEn;
  const moduleTitle = isRTL ? activity.moduleTitleAr : activity.moduleTitleEn;

  // Format timestamp
  const now = new Date();
  const activityDate = new Date(activity.timestamp);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const activityDay = new Date(
    activityDate.getFullYear(),
    activityDate.getMonth(),
    activityDate.getDate(),
  );

  let formattedTimestamp: string;
  if (activityDay.getTime() === today.getTime()) {
    formattedTimestamp = tDashboard("common.today");
  } else if (activityDay.getTime() === yesterday.getTime()) {
    formattedTimestamp = tDashboard("common.yesterday");
  } else {
    formattedTimestamp = activityDate.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border-border flex items-start gap-4 border-b py-4 last:border-0",
        className,
      )}
    >
      {/* Status Icon */}
      <div
        className={cn(
          "mt-0.5 flex size-8 items-center justify-center rounded-full",
          activity.status === "completed"
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-foreground",
        )}
      >
        {activity.status === "completed" ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <CirclePlay className="size-4" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4 className="text-foreground truncate font-medium">{lessonTitle}</h4>
        <p className="text-muted-foreground truncate text-sm">
          {moduleTitle} • {courseTitle}
        </p>
      </div>

      {/* Timestamp */}
      <span className="label-mono text-muted-foreground text-xs tracking-wider whitespace-nowrap uppercase ltr:mr-4 rtl:ml-4">
        {formattedTimestamp}
      </span>
    </motion.div>
  );
}
