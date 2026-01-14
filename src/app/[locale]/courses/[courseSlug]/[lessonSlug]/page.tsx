"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Navbar, Footer } from "~/components/layout";
import { useLocale } from "next-intl";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { MarkdownRenderer } from "~/components/shared/MarkdownRenderer";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LessonPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const data = useQuery(api.lessons.getWithNavigation, {
    slug: lessonSlug,
  });

  const locale = useLocale();
  const isRTL = locale === "ar";

  if (data === undefined) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-20">
          <Loader2 className="text-primary h-8 w-8 animate-spin opacity-50" />
        </div>
        <Footer />
      </>
    );
  }

  if (data === null) return notFound();

  const { lesson, prevLesson, nextLesson } = data;

  const content = isRTL ? lesson.contentAr : lesson.contentEn;
  const title = isRTL ? lesson.titleAr : lesson.titleEn;

  return (
    <>
      <Navbar />
      <div className="bg-background flex min-h-screen pt-24">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-20 w-full max-w-4xl flex-1 p-6 md:p-12"
        >
          <div className="mb-12">
            <Link
              href={`/${locale}/courses/${courseSlug}`}
              className="label-mono text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-2 transition-colors"
            >
              <span className={isRTL ? "rotate-180" : ""}>&larr;</span>{" "}
              {isRTL ? "العودة للدورة" : "Back to Course"}
            </Link>

            <h1 className="font-display text-foreground mb-4 text-4xl leading-tight md:text-6xl">
              {title}
            </h1>

            {data.lesson.estimatedMinutes && (
              <span className="text-primary bg-primary/10 inline-block rounded px-2 py-1 font-mono text-sm">
                {data.lesson.estimatedMinutes} {isRTL ? "دقيقة" : "min"}
              </span>
            )}
          </div>

          <div className="bg-background rounded-xl">
            <MarkdownRenderer content={content} isRTL={isRTL} />
          </div>

          <div className="border-border mt-20 grid grid-cols-2 gap-4 border-t pt-12">
            {prevLesson ? (
              <Link
                href={`/${locale}/courses/${courseSlug}/${prevLesson.slug}`}
                className="group border-border hover:border-primary/50 hover:bg-muted/5 flex flex-col items-start gap-4 rounded-lg border p-6 text-left transition-all"
              >
                <span className="label-mono text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors">
                  <span className={isRTL ? "rotate-180" : ""}>&larr;</span>{" "}
                  {isRTL ? "السابق" : "Previous"}
                </span>
                <span className="font-display group-hover:text-primary text-xl transition-colors">
                  {isRTL ? prevLesson.titleAr : prevLesson.titleEn}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/${locale}/courses/${courseSlug}/${nextLesson.slug}`}
                className="group border-border hover:border-primary/50 hover:bg-muted/5 flex flex-col items-end gap-4 rounded-lg border p-6 text-right transition-all"
              >
                <span className="label-mono text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors">
                  {isRTL ? "التالي" : "Next"}{" "}
                  <span className={isRTL ? "rotate-180" : ""}>&rarr;</span>
                </span>
                <span className="font-display group-hover:text-primary text-xl transition-colors">
                  {isRTL ? nextLesson.titleAr : nextLesson.titleEn}
                </span>
              </Link>
            ) : (
              <Link
                href={`/${locale}/courses/${courseSlug}`}
                className="group border-border flex flex-col items-end gap-4 rounded-lg border p-6 text-right transition-all hover:border-green-500/50 hover:bg-green-500/5"
              >
                <span className="label-mono text-muted-foreground transition-colors group-hover:text-green-500">
                  {isRTL ? "إكمال" : "Complete"}
                </span>
                <span className="font-display text-xl transition-colors group-hover:text-green-500">
                  {isRTL ? "العودة للدورة" : "Back to Course"}
                </span>
              </Link>
            )}
          </div>
        </motion.main>
      </div>
      <Footer />
    </>
  );
}
