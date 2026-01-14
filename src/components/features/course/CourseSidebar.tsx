"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "~/lib/utils";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { useLocale } from "next-intl";

interface CourseSidebarProps {
  courseSlug: string;
}

interface Lesson {
  _id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  videoUrl?: string;
}

interface Module {
  _id: string;
  titleEn: string;
  titleAr: string;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  titleEn: string;
  titleAr: string;
  modules: Module[];
}

export function CourseSidebar({ courseSlug }: CourseSidebarProps) {
  const params = useParams();
  const locale = useLocale();
  const currentLessonSlug = params.lessonSlug as string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const course = useQuery(api.courses.getWithContent, {
    slug: courseSlug,
  }) as Course | null | undefined;

  if (course === undefined) {
    return (
      <div className="w-full space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="bg-muted h-6 w-3/4 rounded-md" />
            <div className="bg-muted h-4 w-1/2 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (course === null) {
    return <div className="p-4">Course not found</div>;
  }

  return (
    <div className="bg-background/95 h-full w-full overflow-y-auto border-r p-4 backdrop-blur-md">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">
          {locale === "ar" ? course.titleAr : course.titleEn}
        </h2>
        <div className="bg-secondary mt-2 h-1 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[0%]" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">0% Complete</p>
      </div>

      <div className="space-y-6">
        {course.modules.map((module) => (
          <div key={module._id}>
            <h3 className="label-mono mb-3 text-xs opacity-70">
              {locale === "ar" ? module.titleAr : module.titleEn}
            </h3>
            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isActive = lesson.slug === currentLessonSlug;
                const isCompleted = false; // TODO: Hook up to user progress

                return (
                  <Link
                    key={lesson._id}
                    href={`/learn/${courseSlug}/${lesson.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : isActive ? (
                      <PlayCircle className="size-4 shrink-0" />
                    ) : (
                      <Circle className="size-4 shrink-0 opacity-40 group-hover:opacity-100" />
                    )}
                    <span className="line-clamp-1">
                      {locale === "ar" ? lesson.titleAr : lesson.titleEn}
                    </span>
                    {lesson.videoUrl && (
                      <PlayCircle className="ml-auto size-3 opacity-30" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
