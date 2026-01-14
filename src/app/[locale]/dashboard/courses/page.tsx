"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import { BookOpen, RefreshCw, GraduationCap, Play, Eye } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLocale, useTranslations } from "next-intl";
import { CourseCard } from "~/components/dashboard";
import type { CourseWithProgress } from "@convex/dashboard";

// Animation variants for staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as unknown as Easing },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Skeleton component for course cards loading state
function CoursesSkeleton({ count = 3 }: { count?: number }) {
  const arrayCount = count ?? 3;
  const skeletonArray = Array.from({ length: arrayCount }, (_, i) => i);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skeletonArray.map((i) => (
        <div
          key={i}
          className="bg-secondary/30 animate-pulse rounded-lg p-6 transition-all duration-300"
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="bg-secondary h-10 w-10 rounded" />
            <div className="bg-secondary h-5 w-16 rounded" />
          </div>
          <div className="space-y-3">
            <div className="bg-secondary h-6 w-3/4 rounded" />
            <div className="bg-secondary h-4 w-full rounded" />
            <div className="bg-secondary h-4 w-2/3 rounded" />
          </div>
          <div className="mt-6 space-y-2">
            <div className="bg-secondary h-2 w-full rounded" />
            <div className="bg-secondary h-3 w-1/3 rounded" />
          </div>
          <div className="mt-6">
            <div className="bg-secondary h-8 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function EmptyState({ locale }: { locale: string }) {
  const t = useTranslations("dashboard.courses");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-editorial p-12 text-center"
    >
      <div className="bg-secondary/50 mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
        <BookOpen className="text-muted-foreground size-8" />
      </div>
      <h3 className="font-display mb-3 text-xl">{t("title")}</h3>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <a
        href={`/${locale}/courses`}
        className="btn-primary inline-flex items-center gap-2"
      >
        <Play className="size-4" />
        {t("start")}
        <BookOpen className="size-4 rtl:rotate-180" />
      </a>
    </motion.div>
  );
}

// Section header component
function SectionHeader({
  icon: Icon,
  title,
  count,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-6 flex items-center gap-3"
    >
      <div className="bg-secondary text-foreground flex size-8 items-center justify-center rounded-sm">
        <Icon className="size-4" />
      </div>
      <h2 className="font-display text-xl">{title}</h2>
      <span className="bg-secondary text-muted-foreground rounded px-2 py-0.5 font-mono text-xs">
        {count}
      </span>
    </motion.div>
  );
}

// Group courses by status
function groupCoursesByStatus(courses: CourseWithProgress[]) {
  const inProgress: CourseWithProgress[] = [];
  const notStarted: CourseWithProgress[] = [];
  const completed: CourseWithProgress[] = [];

  for (const course of courses) {
    if (course.progressPercentage === 100) {
      completed.push(course);
    } else if (course.progressPercentage === 0) {
      notStarted.push(course);
    } else {
      inProgress.push(course);
    }
  }

  return { inProgress, notStarted, completed };
}

export default function CoursesPage() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const locale = useLocale();
  const t = useTranslations("dashboard.courses");
  const tCommon = useTranslations("dashboard.common");

  // State for error handling and retry
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  // Fetch Convex user data
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip",
  );

  // Fetch courses with progress
  const userId = convexUser?._id;

  const coursesResult = useQuery(
    api.dashboard.getUserCourses,
    userId ? { userId } : "skip",
  );

  // Cast the result to proper type
  const courses: CourseWithProgress[] | null | undefined = coursesResult;

  // Handle errors
  useEffect(() => {
    if (!isClerkLoaded) return;
    if (!clerkUser) return;
    if (convexUser === undefined || courses === undefined) return;

    // Check for errors
    if (convexUser !== null && courses === null) {
      setError(tCommon("error"));
    } else {
      setError(null);
    }
  }, [clerkUser, isClerkLoaded, convexUser, courses, tCommon]);

  // Determine loading state
  const isLoading =
    (!isClerkLoaded || (clerkUser && !convexUser)) ??
    (convexUser !== null && courses === undefined);

  // Handle retry
  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
    setError(null);
  };

  // Group courses by status
  const groupedCourses = courses
    ? groupCoursesByStatus(courses)
    : { inProgress: [], notStarted: [], completed: [] };

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-secondary/50 mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
            <RefreshCw className="text-muted-foreground size-8" />
          </div>
          <h2 className="font-display mb-2 text-2xl">{error}</h2>
          <p className="text-muted-foreground mb-6">{tCommon("retry")}</p>
          <button
            onClick={handleRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="size-4" />
            {tCommon("retry")}
          </button>
        </motion.div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Header Skeleton */}
        <div className="bg-secondary/30 animate-pulse rounded-lg p-6">
          <div className="bg-secondary mb-4 h-4 w-32 rounded" />
          <div className="bg-secondary mb-2 h-10 w-48 rounded" />
          <div className="bg-secondary h-4 w-64 rounded" />
        </div>

        {/* In Progress Section Skeleton */}
        <div className="space-y-4">
          <div className="bg-secondary h-8 w-40 rounded" />
          <CoursesSkeleton count={3} />
        </div>

        {/* Not Started Section Skeleton */}
        <div className="space-y-4">
          <div className="bg-secondary h-8 w-40 rounded" />
          <CoursesSkeleton count={3} />
        </div>

        {/* Completed Section Skeleton */}
        <div className="space-y-4">
          <div className="bg-secondary h-8 w-40 rounded" />
          <CoursesSkeleton count={3} />
        </div>
      </motion.div>
    );
  }

  // Show empty state if no courses available
  if (!courses || courses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
              <BookOpen className="size-5" />
            </div>
            <h1 className="font-display text-3xl">{t("title")}</h1>
          </div>
          <p className="text-muted-foreground text-lg rtl:me-13">
            {t("subtitle")}
          </p>
        </motion.div>

        <EmptyState locale={locale} />
      </motion.div>
    );
  }

  // Show courses grouped by status
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
            <BookOpen className="size-5" />
          </div>
          <h1 className="font-display text-3xl">{t("title")}</h1>
        </div>
        <p className="text-muted-foreground text-lg rtl:me-13">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Courses Grouped by Status */}
      <AnimatePresence mode="wait">
        <motion.div
          key={retryKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* In Progress Section */}
          {groupedCourses.inProgress.length > 0 && (
            <motion.section variants={sectionVariants}>
              <SectionHeader
                icon={Play}
                title={t("inProgress")}
                count={groupedCourses.inProgress.length}
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedCourses.inProgress.map((course, index) => (
                  <motion.div
                    key={course.courseId}
                    variants={itemVariants}
                    custom={index}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Not Started Section */}
          {groupedCourses.notStarted.length > 0 && (
            <motion.section variants={sectionVariants}>
              <SectionHeader
                icon={GraduationCap}
                title={t("notStarted")}
                count={groupedCourses.notStarted.length}
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedCourses.notStarted.map((course, index) => (
                  <motion.div
                    key={course.courseId}
                    variants={itemVariants}
                    custom={index}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Completed Section */}
          {groupedCourses.completed.length > 0 && (
            <motion.section variants={sectionVariants}>
              <SectionHeader
                icon={Eye}
                title={t("completed")}
                count={groupedCourses.completed.length}
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedCourses.completed.map((course, index) => (
                  <motion.div
                    key={course.courseId}
                    variants={itemVariants}
                    custom={index}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
