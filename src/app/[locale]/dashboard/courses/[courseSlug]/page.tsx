"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Circle,
  PlayCircle,
  Clock,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useLocale, useTranslations } from "next-intl";
import { ProgressBar } from "~/components/dashboard/ProgressBar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

// Animation variants for smooth interactions
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as unknown as Easing },
  },
};

const accordionVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

// Types for course data structure
interface LessonWithProgress {
  _id: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  estimatedMinutes: number | null;
  order: number;
  status: "completed" | "started" | null;
}

interface ModuleWithProgress {
  _id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  order: number;
  lessons: LessonWithProgress[];
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
}

interface CourseWithProgress {
  _id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string | null;
  modules: ModuleWithProgress[];
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  firstIncompleteLessonId?: string | null;
  firstIncompleteLessonSlug?: string | null;
  firstIncompleteModuleId?: string | null;
}

// Type guard functions for lesson status
function isCompleted(
  status: "completed" | "started" | null,
): status is "completed" {
  return status === "completed";
}

function isStarted(
  status: "completed" | "started" | null,
): status is "started" {
  return status === "started";
}

// Status icon component with animations
function StatusIcon({ status }: { status: "completed" | "started" | null }) {
  if (isCompleted(status)) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="shrink-0"
      >
        <CheckCircle2 className="text-primary size-5" />
      </motion.div>
    );
  }
  if (isStarted(status)) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="shrink-0"
      >
        <PlayCircle className="text-accent size-5" />
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="shrink-0"
    >
      <Circle className="text-muted-foreground size-5" />
    </motion.div>
  );
}

// Module accordion component
function ModuleAccordion({
  module,
  locale,
  isRTL,
  isOpen,
  onToggle,
  firstIncompleteLessonSlug,
  userId,
  courseSlug,
}: {
  module: ModuleWithProgress;
  locale: string;
  isRTL: boolean;
  isOpen: boolean;
  onToggle: () => void;
  firstIncompleteLessonSlug?: string | null;
  userId: Id<"users">;
  courseSlug: string;
}) {
  const t = useTranslations("dashboard.courseDetail");
  const router = useRouter();

  // Start lesson mutation
  const startLessonMutation = useMutation(api.progress.startLesson);

  // Handle lesson start
  const handleLessonStart = useCallback(
    async (lessonId: Id<"lessons">) => {
      try {
        await startLessonMutation({
          userId,
          lessonId,
        });
      } catch (error) {
        console.error("Failed to start lesson:", error);
      }
    },
    [startLessonMutation, userId],
  );

  // Get title and description based on locale
  const title = isRTL ? module.titleAr : module.titleEn;
  const description =
    (isRTL ? module.descriptionAr : module.descriptionEn) ?? "";

  // Check if this module has the first incomplete lesson
  const moduleHasNextLesson =
    firstIncompleteLessonSlug &&
    module.lessons.some((lesson) => lesson.slug === firstIncompleteLessonSlug);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "border-border/50 bg-card overflow-hidden rounded-lg border transition-all duration-200",
        moduleHasNextLesson && "ring-accent/20 ring-2",
      )}
    >
      {/* Module Header */}
      <button
        onClick={onToggle}
        className={cn(
          "hover:bg-accent/50 flex w-full items-center justify-between p-4 text-left transition-colors",
          isOpen && "border-border/50 border-b",
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              module.progressPercentage === 100
                ? "bg-primary/10 text-primary"
                : module.progressPercentage > 0
                  ? "bg-accent/10 text-accent"
                  : "bg-secondary text-muted-foreground",
            )}
          >
            {module.order + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium">{title}</h3>
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {description}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-muted-foreground text-xs">
                {module.completedLessons}/{module.totalLessons} {t("lessons")}
              </span>
              <ProgressBar
                value={module.progressPercentage}
                size="sm"
                className="w-20 flex-1"
              />
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 rtl:rotate-180"
        >
          <ChevronDown className="text-muted-foreground size-5" />
        </motion.div>
      </button>

      {/* Module Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-secondary/20"
          >
            <div className="divide-border/50 divide-y">
              {module.lessons.map((lesson, index) => {
                const lessonTitle = isRTL ? lesson.titleAr : lesson.titleEn;
                const estimatedTime = lesson.estimatedMinutes
                  ? t("estimatedTime", { minutes: lesson.estimatedMinutes })
                  : null;

                // Determine if this is the next lesson to take
                const isNextLesson = lesson.slug === firstIncompleteLessonSlug;

                return (
                  <motion.div
                    key={lesson._id}
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "hover:bg-accent/30 flex items-center justify-between p-4 transition-colors",
                      isNextLesson && "bg-accent/10",
                    )}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <StatusIcon status={lesson.status} />
                      <div className="min-w-0 flex-1">
                        <span className="block truncate font-medium">
                          {lessonTitle}
                        </span>
                        {estimatedTime && (
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Clock className="size-3 shrink-0" />
                            <span className="truncate">{estimatedTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {isNextLesson && (
                        <Button
                          size="sm"
                          variant={
                            isStarted(lesson.status) ? "default" : "default"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isCompleted(lesson.status)) {
                              void handleLessonStart(
                                lesson._id as unknown as Id<"lessons">,
                              );
                            }
                            // Navigate to lesson using slug
                            router.push(
                              `/${locale}/courses/${courseSlug}/${lesson.slug}`,
                            );
                          }}
                          className="shrink-0"
                        >
                          {isStarted(lesson.status)
                            ? t("continueLesson")
                            : t("startLesson")}
                        </Button>
                      )}
                      {!isNextLesson && !isCompleted(lesson.status) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isCompleted(lesson.status)) {
                              void handleLessonStart(
                                lesson._id as unknown as Id<"lessons">,
                              );
                            }
                            // Navigate to lesson using slug
                            router.push(
                              `/${locale}/courses/${courseSlug}/${lesson.slug}`,
                            );
                          }}
                          className="shrink-0"
                        >
                          {isCompleted(lesson.status)
                            ? t("review")
                            : isStarted(lesson.status)
                              ? t("continueLesson")
                              : t("startLesson")}
                        </Button>
                      )}
                      {isCompleted(lesson.status) && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to lesson using slug for review
                            router.push(
                              `/${locale}/courses/${courseSlug}/${lesson.slug}`,
                            );
                          }}
                          className="shrink-0"
                        >
                          {t("review")}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Chevron Right icon for RTL support
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Loading skeleton component
function CourseDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Back link skeleton */}
      <div className="bg-secondary h-6 w-32 rounded" />

      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="bg-secondary h-10 w-3/4 rounded" />
        <div className="bg-secondary h-4 w-full rounded" />
        <div className="bg-secondary h-4 w-2/3 rounded" />
      </div>

      {/* Progress skeleton */}
      <div className="space-y-2">
        <div className="bg-secondary h-4 w-32 rounded" />
        <div className="bg-secondary h-3 w-full rounded" />
      </div>

      {/* Modules skeleton */}
      <div className="space-y-4">
        <div className="bg-secondary h-8 w-40 rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-secondary/50 h-24 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  const t = useTranslations("dashboard.courseDetail");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-editorial p-12 text-center"
    >
      <div className="bg-secondary/50 mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
        <BookOpen className="text-muted-foreground size-8" />
      </div>
      <h3 className="font-display mb-3 text-xl">{t("noModules")}</h3>
      <p className="text-muted-foreground mb-6">{t("noModulesSubtitle")}</p>
    </motion.div>
  );
}

// Main course detail page component
export default function CourseDetailPage() {
  const params = useParams();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("dashboard.courseDetail");
  const tCommon = useTranslations("dashboard.common");

  const courseSlug = params?.courseSlug as string;

  // State management
  const [error, setError] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  // Fetch Convex user data
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip",
  );

  // Fetch course data with content
  const course = useQuery(
    api.courses.getWithContent,
    courseSlug ? { slug: courseSlug } : "skip",
  );

  // Get user ID
  const userId = convexUser?._id;

  // Fetch user progress for this course
  const courseProgress = useQuery(
    api.progress.getForCourse,
    userId && course?._id ? { userId, courseId: course._id } : "skip",
  );

  // Handle errors
  useEffect(() => {
    if (!isClerkLoaded) return;
    if (!clerkUser) return;
    if (
      convexUser === undefined ||
      course === undefined ||
      courseProgress === undefined
    )
      return;

    if (convexUser !== null && (course === null || courseProgress === null)) {
      setError(tCommon("error"));
    } else {
      setError(null);
    }
  }, [clerkUser, isClerkLoaded, convexUser, course, courseProgress, tCommon]);

  // Merge course data with progress
  const courseWithProgress: CourseWithProgress | null = (() => {
    if (!course || !courseProgress || !course.modules) return null;

    let firstIncompleteLessonId: string | null = null;
    let firstIncompleteLessonSlug: string | null = null;
    let firstIncompleteModuleId: string | null = null;

    const modulesWithProgress: ModuleWithProgress[] = course.modules.map(
      (module) => {
        const moduleLessons: LessonWithProgress[] = (module.lessons || []).map(
          (lesson: {
            _id: { toString: () => string };
            titleEn: string;
            titleAr: string;
            slug: string;
            estimatedMinutes?: number;
            order: number;
            status?: string;
          }) => {
            const progress = courseProgress.progressEntries?.find(
              (p: { lessonId: { toString: () => string }; status?: string }) =>
                p.lessonId.toString() === lesson._id.toString(),
            );

            const lessonStatus =
              (progress?.status as "completed" | "started" | null) ?? null;

            // Find first incomplete lesson
            if (
              firstIncompleteLessonId === null &&
              lessonStatus !== "completed"
            ) {
              firstIncompleteLessonId = lesson._id.toString();
              firstIncompleteLessonSlug = lesson.slug;
              firstIncompleteModuleId = module._id.toString();
            }

            return {
              _id: lesson._id.toString(),
              titleEn: lesson.titleEn,
              titleAr: lesson.titleAr,
              slug: lesson.slug,
              estimatedMinutes: lesson.estimatedMinutes ?? null,
              order: lesson.order,
              status: lessonStatus,
            };
          },
        );

        // Calculate module progress on frontend
        const completedInModule = moduleLessons.filter(
          (l) => l.status === "completed",
        ).length;
        const moduleProgressPercentage =
          moduleLessons.length > 0
            ? Math.round((completedInModule / moduleLessons.length) * 100)
            : 0;

        return {
          _id: module._id.toString(),
          titleEn: module.titleEn,
          titleAr: module.titleAr,
          descriptionEn: module.descriptionEn,
          descriptionAr: module.descriptionAr,
          order: module.order,
          lessons: moduleLessons,
          progressPercentage: moduleProgressPercentage,
          completedLessons: completedInModule,
          totalLessons: moduleLessons.length,
        };
      },
    );

    return {
      _id: course._id.toString(),
      slug: course.slug,
      titleEn: course.titleEn,
      titleAr: course.titleAr,
      descriptionEn: course.descriptionEn,
      descriptionAr: course.descriptionAr,
      imageUrl: course.imageUrl ?? null,
      modules: modulesWithProgress,
      totalLessons: courseProgress.totalLessons,
      completedLessons: courseProgress.completedLessons,
      progressPercentage: courseProgress.progressPercentage,
      firstIncompleteLessonId,
      firstIncompleteLessonSlug,
      firstIncompleteModuleId,
    };
  })();

  // Toggle module accordion
  const toggleModule = useCallback((moduleId: string) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }, []);

  // Auto-open first incomplete module and first incomplete lesson's module
  useEffect(() => {
    if (courseWithProgress) {
      // First, open the module containing the first incomplete lesson
      if (
        courseWithProgress.firstIncompleteModuleId &&
        openModules.size === 0
      ) {
        setOpenModules(new Set([courseWithProgress.firstIncompleteModuleId]));
      } else if (
        openModules.size === 0 &&
        courseWithProgress.modules.length > 0 &&
        courseWithProgress.modules[0]
      ) {
        // If no incomplete lessons, open first module
        const firstModuleId = courseWithProgress.modules[0]._id;
        if (firstModuleId) {
          setOpenModules(new Set([firstModuleId]));
        }
      }
    }
  }, [courseWithProgress, openModules]);

  // Determine loading state
  const isLoading =
    (!isClerkLoaded || (clerkUser && !convexUser)) ??
    (convexUser !== null &&
      (course === undefined || courseProgress === undefined));

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
    return <CourseDetailSkeleton />;
  }

  // Show not found state
  if (!courseWithProgress) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="font-display mb-2 text-2xl">{t("notFound")}</h2>
          <p className="text-muted-foreground mb-6">{t("notFoundSubtitle")}</p>
          <Link href={`/${locale}/dashboard/courses`}>
            <Button>{t("backToCourses")}</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get localized content
  const title = isRTL ? courseWithProgress.titleAr : courseWithProgress.titleEn;
  const description = isRTL
    ? courseWithProgress.descriptionAr
    : courseWithProgress.descriptionEn;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Back Link */}
      <motion.div variants={itemVariants}>
        <Link
          href={`/${locale}/dashboard/courses`}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
        >
          {isRTL ? (
            <ChevronRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
          <span>{t("backToCourses")}</span>
        </Link>
      </motion.div>

      {/* Course Header */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{description}</p>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="bg-secondary/30">
          <CardContent className="pt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium">{t("courseProgress")}</span>
              <span className="text-muted-foreground text-sm">
                {courseWithProgress.completedLessons} /{" "}
                {courseWithProgress.totalLessons} {t("lessons")}
              </span>
            </div>
            <ProgressBar
              value={courseWithProgress.progressPercentage}
              showLabel
              size="lg"
              label={`${courseWithProgress.progressPercentage}%`}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Modules Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-secondary text-foreground flex size-8 items-center justify-center rounded-sm">
            <BookOpen className="size-4" />
          </div>
          <h2 className="font-display text-xl">
            {t("modules")} ({courseWithProgress.modules.length})
          </h2>
        </div>

        {courseWithProgress.modules.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {courseWithProgress.modules.map((module) => (
              <ModuleAccordion
                key={module._id}
                module={module}
                locale={locale}
                isRTL={isRTL}
                isOpen={openModules.has(module._id)}
                onToggle={() => toggleModule(module._id)}
                firstIncompleteLessonSlug={
                  courseWithProgress.firstIncompleteLessonSlug
                }
                userId={userId!}
                courseSlug={courseSlug}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
