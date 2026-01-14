"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ProgressBar } from "./ProgressBar";
import type { CourseWithProgress } from "../../../convex/dashboard";
import { cn } from "~/lib/utils";

interface CourseCardProps {
  course: CourseWithProgress;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const locale = useLocale();
  const t = useTranslations("dashboard.courses");

  const isRTL = locale === "ar";
  const title = isRTL ? course.titleAr : course.titleEn;
  const description = isRTL ? course.descriptionAr : course.descriptionEn;
  const isCompleted = course.progressPercentage === 100;
  const isStarted = course.progressPercentage > 0 && !isCompleted;
  const hasStarted = course.progressPercentage > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/courses/${course.slug}`}
        className={cn(
          "card-editorial hover:border-foreground/50 block h-full p-6 transition-all duration-300",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="bg-secondary flex size-10 items-center justify-center rounded-sm">
              <BookOpen className="text-foreground size-5" />
            </div>
            <span
              className={cn(
                "tag",
                isCompleted && "border-primary text-primary",
                isStarted && "border-accent text-accent",
              )}
            >
              {isCompleted
                ? t("completed")
                : isStarted
                  ? t("inProgress")
                  : t("notStarted")}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <h3 className="font-display text-foreground text-xl leading-tight font-normal">
              {title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {description}
            </p>
          </div>

          {/* Progress */}
          <div className="mt-6 space-y-2">
            <ProgressBar
              value={course.progressPercentage}
              showLabel
              size="sm"
              label={t("progressLabel", {
                progress: course.progressPercentage,
              })}
            />
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted-foreground text-xs tracking-wider uppercase">
                {course.completedLessons} / {course.totalLessons} {t("lessons")}
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="mt-6 flex items-center justify-between">
            <span
              className={cn(
                "btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs",
                isCompleted && "btn-secondary",
              )}
            >
              {isCompleted
                ? t("review")
                : hasStarted
                  ? t("continue")
                  : t("start")}
              <ArrowRight className={cn("size-4", isRTL && "rotate-180")} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
