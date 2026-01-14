"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  Settings,
  ArrowRight,
  RefreshCw,
  Play,
  Clock,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  WelcomeHeader,
  StatCard,
  ContinueCard,
  ActivityItem,
  CourseCard,
} from "~/components/dashboard";
import { cn } from "~/lib/utils";
import type {
  RecentActivityItem,
  CourseWithProgress,
} from "../../../../convex/dashboard";

// Animation variants for staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as unknown as Easing },
  },
};

// Skeleton components for loading states
function StatsSkeleton() {
  const arrayCount = 4;
  const skeletonArray = Array.from({ length: arrayCount }, (_, i) => i);
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {skeletonArray.map((i) => (
        <div key={i} className="bg-secondary/50 animate-pulse rounded-lg p-6">
          <div className="bg-secondary mb-3 h-3 w-20 rounded" />
          <div className="bg-secondary h-8 w-16 rounded" />
        </div>
      ))}
    </div>
  );
}

function ContinueSkeleton() {
  return (
    <div className="bg-secondary/50 animate-pulse rounded-lg p-6">
      <div className="bg-secondary mb-3 h-3 w-32 rounded" />
      <div className="bg-secondary mb-2 h-6 w-3/4 rounded" />
      <div className="bg-secondary h-4 w-1/2 rounded" />
    </div>
  );
}

function ActivitySkeleton() {
  const arrayCount = 3;
  const skeletonArray = Array.from({ length: arrayCount }, (_, i) => i);
  return (
    <div className="space-y-4">
      {skeletonArray.map((i) => (
        <div key={i} className="flex items-start gap-4 py-4">
          <div className="bg-secondary/50 size-8 animate-pulse rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="bg-secondary h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-secondary h-3 w-1/2 animate-pulse rounded" />
          </div>
          <div className="bg-secondary h-3 w-16 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  const arrayCount = 3;
  const skeletonArray = Array.from({ length: arrayCount }, (_, i) => i);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skeletonArray.map((i) => (
        <div key={i} className="bg-secondary/50 animate-pulse rounded-lg p-6">
          <div className="bg-secondary mb-4 h-10 w-10 rounded" />
          <div className="bg-secondary mb-3 h-6 w-3/4 rounded" />
          <div className="bg-secondary mb-4 h-4 w-full rounded" />
          <div className="bg-secondary h-2 w-full rounded" />
        </div>
      ))}
    </div>
  );
}

function formatLearningTime(minutes: number | null): string {
  if (!minutes) return "0h";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export default function DashboardPage() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("dashboard.home");
  const tCommon = useTranslations("dashboard.common");

  // State for error handling
  const [error, setError] = useState<string | null>(null);

  // Fetch Convex user data
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip",
  );

  // Fetch dashboard data when user is available
  const userId = convexUser?._id;

  // Import dashboard functions directly
  const stats = useQuery(
    api.dashboard.getUserStats,
    userId ? { userId } : "skip",
  );

  const continueLearning = useQuery(
    api.dashboard.getContinueLearning,
    userId ? { userId } : "skip",
  );

  const recentActivity = useQuery(
    api.dashboard.getRecentActivity,
    userId ? { userId } : "skip",
  );

  const courses = useQuery(
    api.dashboard.getUserCourses,
    userId ? { userId } : "skip",
  );

  // Handle errors
  useEffect(() => {
    if (!isClerkLoaded) return;
    if (!clerkUser) return;
    if (
      convexUser === undefined ||
      stats === undefined ||
      courses === undefined
    )
      return;
    if (convexUser === null) return;

    // Check for errors in any of the queries
    const hasError =
      (stats === null && convexUser !== null) ||
      (courses === null && convexUser !== null);

    if (hasError) {
      setError(tCommon("error"));
    } else {
      setError(null);
    }
  }, [clerkUser, isClerkLoaded, convexUser, stats, courses, tCommon]);

  // Determine loading state
  const isLoading =
    (!isClerkLoaded || (clerkUser && !convexUser)) ??
    (convexUser !== null && (stats === undefined || courses === undefined));

  // Get user name
  const userName =
    clerkUser?.fullName ??
    clerkUser?.firstName ??
    convexUser?.fullName ??
    t("title");

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
        {/* Welcome Header Skeleton */}
        <div className="bg-secondary/50 animate-pulse rounded-lg p-6">
          <div className="bg-secondary mb-4 h-4 w-32 rounded" />
          <div className="bg-secondary mb-2 h-10 w-64 rounded" />
          <div className="bg-secondary h-4 w-48 rounded" />
        </div>

        {/* Stats Skeleton */}
        <StatsSkeleton />

        {/* Continue Learning Skeleton */}
        <ContinueSkeleton />

        {/* Activity Skeleton */}
        <ActivitySkeleton />

        {/* Courses Skeleton */}
        <CoursesSkeleton />
      </motion.div>
    );
  }

  // New user with no progress
  const isNewUser =
    convexUser !== null &&
    stats != null &&
    (stats as { totalLessonsStarted?: number }).totalLessonsStarted === 0;

  // Show new user state
  if (isNewUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl"
      >
        <WelcomeHeader userName={userName} locale={locale} className="mb-12" />

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Quick Start CTA */}
          <motion.div variants={itemVariants} className="card-editorial p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 text-primary mb-6 flex size-16 items-center justify-center rounded-full">
                <Play className="size-8" />
              </div>
              <h2 className="font-display mb-3 text-2xl">
                {t("startLearning")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                {t("noProgress")}
              </p>
              <Link
                href={`/${locale}/dashboard/courses`}
                className="btn-primary inline-flex items-center gap-2"
              >
                {t("startLearning")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.section variants={itemVariants}>
            <h3 className="font-display mb-6 text-xl">{t("quickActions")}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href={`/${locale}/dashboard/courses`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-6 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <BookOpen className="size-5" />
                </div>
                <span className="font-mono text-sm tracking-wider uppercase">
                  {t("startLearning")}
                </span>
              </Link>

              <Link
                href={`/${locale}/dashboard/tutor`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-6 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <MessageSquare className="size-5" />
                </div>
                <span className="font-mono text-sm tracking-wider uppercase">
                  {t("openTutor")}
                </span>
              </Link>

              <Link
                href={`/${locale}/dashboard/settings`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-6 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <Settings className="size-5" />
                </div>
                <span className="font-mono text-sm tracking-wider uppercase">
                  {t("settings")}
                </span>
              </Link>
            </div>
          </motion.section>
        </motion.section>
      </motion.div>
    );
  }

  // Show regular dashboard for users with progress
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <WelcomeHeader
        userName={userName}
        locale={locale}
        stats={[
          {
            label: t("stats.lessonsCompleted"),
            value: stats?.totalLessonsCompleted ?? 0,
          },
          {
            label: t("stats.coursesInProgress"),
            value: stats?.coursesInProgress ?? 0,
          },
          {
            label: t("stats.currentStreak"),
            value: `${stats?.currentStreak ?? 0} ${t("stats.days")}`,
          },
          {
            label: t("stats.learningTime"),
            value: formatLearningTime(stats?.totalLearningTimeMinutes ?? null),
          },
        ]}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Grid */}
        <motion.section variants={itemVariants}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t("stats.lessonsCompleted")}
              value={stats?.totalLessonsCompleted ?? 0}
              icon={<CheckCircle2 className="size-5" />}
              className="hover:border-primary/50"
            />
            <StatCard
              title={t("stats.coursesInProgress")}
              value={stats?.coursesInProgress ?? 0}
              icon={<BookOpen className="size-5" />}
              className="hover:border-primary/50"
            />
            <StatCard
              title={t("stats.currentStreak")}
              value={`${stats?.currentStreak ?? 0} ${t("stats.days")}`}
              icon={<Flame className="size-5" />}
              className="hover:border-primary/50"
            />
            <StatCard
              title={t("stats.learningTime")}
              value={formatLearningTime(
                stats?.totalLearningTimeMinutes ?? null,
              )}
              icon={<Clock className="size-5" />}
              className="hover:border-primary/50"
            />
          </div>
        </motion.section>

        {/* Continue Learning Card */}
        {continueLearning && (
          <motion.section variants={itemVariants}>
            <ContinueCard nextLesson={continueLearning} />
          </motion.section>
        )}

        {/* Recent Activity & Quick Actions Grid */}
        <motion.section
          variants={itemVariants}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl">{t("recentActivity")}</h3>
              <Link
                href={`/${locale}/dashboard/activity`}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("viewAll")}
              </Link>
            </div>

            {recentActivity && recentActivity.length > 0 ? (
              <div className="card-editorial divide-y">
                {recentActivity
                  .slice(0, 5)
                  .map((activity: RecentActivityItem) => (
                    <ActivityItem key={activity.lessonId} activity={activity} />
                  ))}
              </div>
            ) : (
              <div className="card-editorial p-8 text-center">
                <p className="text-muted-foreground">{t("noProgress")}</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-display mb-6 text-xl">{t("quickActions")}</h3>
            <div className="space-y-4">
              <Link
                href={`/${locale}/dashboard/courses`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-4 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <BookOpen className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("startLearning")}</p>
                  <p className="text-muted-foreground text-sm">
                    {courses?.length ?? 0} {t("courses").toLowerCase()}
                  </p>
                </div>
                <ArrowRight
                  className={cn(
                    "text-muted-foreground size-4",
                    isRTL && "rotate-180",
                  )}
                />
              </Link>

              <Link
                href={`/${locale}/dashboard/tutor`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-4 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <MessageSquare className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("openTutor")}</p>
                  <p className="text-muted-foreground text-sm">
                    {t("needHelpSubtitle")}
                  </p>
                </div>
                <ArrowRight
                  className={cn(
                    "text-muted-foreground size-4",
                    isRTL && "rotate-180",
                  )}
                />
              </Link>

              <Link
                href={`/${locale}/dashboard/settings`}
                className="card-editorial hover:border-foreground/50 flex items-center gap-4 p-4 transition-all duration-300"
              >
                <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
                  <Settings className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("settings")}</p>
                  <p className="text-muted-foreground text-sm">
                    {t("settings").toLowerCase()}
                  </p>
                </div>
                <ArrowRight
                  className={cn(
                    "text-muted-foreground size-4",
                    isRTL && "rotate-180",
                  )}
                />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Courses Preview */}
        {courses && courses.length > 0 && (
          <motion.section variants={itemVariants}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl">{t("courses.title")}</h3>
              <Link
                href={`/${locale}/dashboard/courses`}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("viewAll")}
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course: CourseWithProgress) => (
                <CourseCard key={course.courseId} course={course} />
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </motion.div>
  );
}
