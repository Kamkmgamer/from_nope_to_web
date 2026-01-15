"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ContinueLearningItem } from "../../../convex/dashboard";
import { cn } from "~/lib/utils";

interface ContinueCardProps {
  nextLesson: ContinueLearningItem;
  className?: string;
}

export function ContinueCard({ nextLesson, className }: ContinueCardProps) {
  const locale = useLocale();
  const t = useTranslations("dashboard.home");
  const tCourseDetail = useTranslations("dashboard.courseDetail");

  const isRTL = locale === "ar";
  const lessonTitle = isRTL
    ? nextLesson.lessonTitleAr
    : nextLesson.lessonTitleEn;
  const courseTitle = isRTL
    ? nextLesson.courseTitleAr
    : nextLesson.courseTitleEn;
  const moduleTitle = isRTL
    ? nextLesson.moduleTitleAr
    : nextLesson.moduleTitleEn;

  const href = `/learn/${nextLesson.courseSlug}/${nextLesson.lessonSlug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("w-full", className)}
    >
      <Link
        href={href}
        className="card-editorial hover:border-foreground/50 block p-6 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Content */}
          <div className="min-w-0 flex-1">
            <span className="label-mono text-accent text-xs tracking-wider uppercase">
              {t("continueLearning")}
            </span>
            <h3 className="font-display text-foreground mt-2 truncate text-xl leading-tight font-normal">
              {lessonTitle}
            </h3>
            <p className="text-muted-foreground mt-1 truncate text-sm">
              {moduleTitle} • {courseTitle}
            </p>
            {nextLesson.estimatedMinutes && (
              <p className="text-muted-foreground mt-2 text-xs">
                {tCourseDetail("estimatedTime", {
                  minutes: nextLesson.estimatedMinutes,
                })}
              </p>
            )}
          </div>

          {/* Action */}
          <div className="shrink-0">
            <span className="btn-primary inline-flex items-center gap-2">
              <Play className="size-4" />
              {tCourseDetail("continueLesson")}
              <ArrowRight className={cn("size-4", isRTL && "rotate-180")} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
