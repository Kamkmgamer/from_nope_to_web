"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useLocale } from "next-intl";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const lessonData = useQuery(api.lessons.getWithNavigation, {
    slug: lessonSlug,
  }) as LessonData | null | undefined;

  // Track completion (placeholder mutation for now)
  // const completeLesson = useMutation(api.progress.completeLesson);

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
        <h2 className="text-2xl font-bold">Lesson not found</h2>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const { lesson, prevLesson, nextLesson } = lessonData;
  const title = locale === "ar" ? lesson.titleAr : lesson.titleEn;
  const content = locale === "ar" ? lesson.contentAr : lesson.contentEn;

  return (
    <div className="mx-auto max-w-3xl pb-20">
      {/* Lesson Header */}
      <div className="mb-8 border-b pb-8">
        <h1 className="font-display text-foreground mb-4 text-3xl font-bold lg:text-4xl">
          {title}
        </h1>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>{lesson.estimatedMinutes ?? 15} mins</span>
          <span>•</span>
          <span>
            Module:{" "}
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
              <Link href={`/learn/${courseSlug}/${prevLesson.slug}`}>
                <ChevronLeft className="size-4" />
                <div className="flex flex-col items-start gap-0.5 text-left">
                  <span className="text-muted-foreground text-xs">
                    Previous
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
        <Button size="lg" className="min-w-[160px] gap-2">
          <CheckCircle className="size-4" />
          Mark Complete
        </Button>

        <div>
          {nextLesson ? (
            <Button variant="ghost" asChild className="gap-2">
              <Link href={`/learn/${courseSlug}/${nextLesson.slug}`}>
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <span className="text-muted-foreground text-xs">Next</span>
                  <span className="max-w-[150px] truncate">
                    {locale === "ar" ? nextLesson.titleAr : nextLesson.titleEn}
                  </span>
                </div>
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href={`/learn/${courseSlug}`}>Course Complete!</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
