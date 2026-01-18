"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { Id } from "~/../convex/_generated/dataModel";

interface Lesson {
  _id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  estimatedMinutes?: number;
  videoUrl?: string;
}

interface Module {
  _id: string;
  titleEn: string;
  titleAr: string;
}

interface Course {
  _id: string;
  slug: string;
}

interface LessonData {
  lesson: Lesson;
  module: Module;
  course: Course;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  totalLessonsInModule: number;
  currentLessonIndex: number;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = use(params);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard.courseDetail");
  const { user: clerkUser } = useUser();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const lessonData = useQuery(api.lessons.getWithNavigation, {
    slug: lessonSlug,
  }) as LessonData | null | undefined;

  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip",
  );

  const lessonProgress = useQuery(
    api.progress.getForLesson,
    convexUser?._id && lessonData?.lesson?._id
      ? {
          userId: convexUser._id,
          lessonId: lessonData.lesson._id as unknown as Id<"lessons">,
        }
      : "skip",
  );

  const completeLesson = useMutation(api.progress.completeLesson);
  const startLesson = useMutation(api.progress.startLesson);

  const shouldStartLesson =
    convexUser?._id && lessonData?.lesson?._id && lessonProgress === null;

  if (shouldStartLesson) {
    void startLesson({
      userId: convexUser._id,
      lessonId: lessonData.lesson._id as unknown as Id<"lessons">,
    });
  }

  const isCompleted = lessonProgress?.status === "completed";

  const handleMarkComplete = async () => {
    if (!convexUser?._id || !lessonData?.lesson?._id) return;

    setIsCompleting(true);
    try {
      await completeLesson({
        userId: convexUser._id,
        lessonId: lessonData.lesson._id as unknown as Id<"lessons">,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to complete lesson:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleNextLesson = async () => {
    if (!convexUser?._id || !lessonData?.lesson?._id) return;

    setIsNavigating(true);
    try {
      await completeLesson({
        userId: convexUser._id,
        lessonId: lessonData.lesson._id as unknown as Id<"lessons">,
      });
      if (lessonData.nextLesson) {
        router.push(
          `/${locale}/learn/${courseSlug}/${lessonData.nextLesson.slug}`,
        );
      }
    } catch (error) {
      console.error("Failed to complete lesson:", error);
      setIsNavigating(false);
    }
  };

  const handleCompleteCourse = async () => {
    if (!convexUser?._id || !lessonData?.lesson?._id) return;

    setIsNavigating(true);
    try {
      await completeLesson({
        userId: convexUser._id,
        lessonId: lessonData.lesson._id as unknown as Id<"lessons">,
      });
      router.push(`/${locale}/dashboard/courses`);
    } catch (error) {
      console.error("Failed to complete lesson:", error);
      setIsNavigating(false);
    }
  };

  if (lessonData === undefined) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="bg-muted h-10 w-2/3 rounded-md" />
        <div className="space-y-4">
          <div className="bg-muted h-4 w-full rounded-md" />
          <div className="bg-muted h-4 w-full rounded-md" />
          <div className="bg-muted h-4 w-5/6 rounded-md" />
        </div>
      </div>
    );
  }

  if (lessonData === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold">{t("notFound")}</h2>
        <Button asChild className="mt-4">
          <Link href={`/${locale}/dashboard`}>Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const { lesson, prevLesson, nextLesson } = lessonData;
  const title = locale === "ar" ? lesson.titleAr : lesson.titleEn;
  const content = locale === "ar" ? lesson.contentAr : lesson.contentEn;

  return (
    <div className="mx-auto max-w-3xl pb-20">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-lg border bg-emerald-500/10 px-4 py-3 text-emerald-600 shadow-lg rtl:right-auto rtl:left-6 dark:text-emerald-400">
          <CheckCircle className="size-5" />
          <span className="font-medium">{t("completed")}</span>
        </div>
      )}

      {/* Lesson Header */}
      <div className="mb-8 border-b pb-8">
        <div className="mb-4 flex items-center gap-3">
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="size-3.5" />
              {t("completed")}
            </span>
          )}
        </div>
        <h1 className="font-display text-foreground mb-4 text-3xl font-bold lg:text-4xl">
          {title}
        </h1>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>
            {lesson.estimatedMinutes ?? 15} {locale === "ar" ? "دقيقة" : "mins"}
          </span>
          <span>•</span>
          <span>
            {locale === "ar" ? "الوحدة" : "Module"}:{" "}
            {locale === "ar"
              ? lessonData.module.titleAr
              : lessonData.module.titleEn}
          </span>
        </div>
      </div>

      {/* Video Content (if any) */}
      {lesson.videoUrl && (
        <div className="border-border mb-10 aspect-video w-full overflow-hidden rounded-xl border bg-black shadow-lg">
          {/* Placeholder for video player */}
          <div className="flex h-full items-center justify-center text-white/50">
            [Video Player Placeholder: {lesson.videoUrl}]
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert mb-12 max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Navigation & Actions */}
      <div className="flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {prevLesson ? (
            <Button variant="ghost" asChild className="gap-2">
              <Link href={`/${locale}/learn/${courseSlug}/${prevLesson.slug}`}>
                <ChevronLeft className="size-4 rtl:rotate-180" />
                <div className="flex flex-col items-start gap-0.5 text-left rtl:items-end rtl:text-right">
                  <span className="text-muted-foreground text-xs">
                    {locale === "ar" ? "السابق" : "Previous"}
                  </span>
                  <span className="max-w-[150px] truncate">
                    {locale === "ar" ? prevLesson.titleAr : prevLesson.titleEn}
                  </span>
                </div>
              </Link>
            </Button>
          ) : (
            <div /> // Spacer
          )}
        </div>

        {/* Mark Complete Button */}
        <Button
          size="lg"
          className={`min-w-[160px] gap-2 ${isCompleted ? "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700" : ""}`}
          onClick={handleMarkComplete}
          disabled={isCompleting || isCompleted}
        >
          {isCompleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CheckCircle className="size-4" />
          )}
          {isCompleted ? t("completed") : t("markComplete")}
        </Button>

        <div>
          {nextLesson ? (
            <Button
              variant="ghost"
              className="gap-2"
              onClick={handleNextLesson}
              disabled={isNavigating}
            >
              <div className="flex flex-col items-end gap-0.5 text-right rtl:items-start rtl:text-left">
                <span className="text-muted-foreground text-xs">
                  {locale === "ar" ? "التالي" : "Next"}
                </span>
                <span className="max-w-[150px] truncate">
                  {locale === "ar" ? nextLesson.titleAr : nextLesson.titleEn}
                </span>
              </div>
              {isNavigating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ChevronRight className="size-4 rtl:rotate-180" />
              )}
            </Button>
          ) : (
            <Button
              variant="default"
              className="gap-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
              onClick={handleCompleteCourse}
              disabled={isNavigating}
            >
              {isNavigating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle className="size-4" />
              )}
              {locale === "ar" ? "إكمال الدورة" : "Complete Course"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
