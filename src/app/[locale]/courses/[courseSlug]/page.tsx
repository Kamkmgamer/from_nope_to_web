"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Navbar, Footer } from "~/components/layout";
import { useLocale } from "next-intl";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function CourseOverviewPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  const course = useQuery(api.courses.getWithContent, {
    slug: courseSlug,
  });

  const locale = useLocale();
  const isRTL = locale === "ar";

  if (course === undefined) {
    return (
      <>
        <Navbar />
        <main className="bg-background flex min-h-screen flex-col pt-24 pb-24 md:pt-32">
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin opacity-50" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (course === null) return notFound();

  const courseTitle = isRTL ? course.titleAr : course.titleEn;
  const courseDesc = isRTL ? course.descriptionAr : course.descriptionEn;

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-32 pb-24">
        <div className="container-editorial">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-9">
              <Link
                href={`/${locale}/courses`}
                className="label-mono text-muted-foreground hover:text-primary mb-8 block inline-flex items-center gap-2 transition-colors"
              >
                <span className={isRTL ? "rotate-180" : ""}>&larr;</span>{" "}
                {isRTL ? "عودة للدورات" : "Back to Courses"}
              </Link>
              <h1 className="font-display mb-8 text-6xl leading-[0.9] tracking-tight md:text-8xl">
                {courseTitle}
              </h1>
              <p className="text-muted-foreground max-w-4xl text-xl leading-relaxed md:text-2xl">
                {courseDesc}
              </p>
            </div>
          </motion.div>

          {/* Modules */}
          <div className="space-y-20">
            {course.modules.length === 0 && (
              <div className="border-border text-muted-foreground border-y border-dashed py-24 text-center font-mono">
                {isRTL ? "سيتم إضافة المحتوى قريباً" : "Content coming soon"}
              </div>
            )}
            {course.modules.map((module, mIndex) => {
              const moduleTitle = isRTL ? module.titleAr : module.titleEn;
              const moduleDesc = isRTL
                ? module.descriptionAr
                : module.descriptionEn;

              return (
                <motion.div
                  key={module._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: mIndex * 0.1 }}
                  className="border-border border-t pt-12"
                >
                  <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="h-fit lg:sticky lg:top-32 lg:col-span-4">
                      <span className="text-primary mb-4 block font-mono text-xs tracking-widest uppercase">
                        {isRTL
                          ? `الوحدة ${("0" + (mIndex + 1)).slice(-2)}`
                          : `Module ${("0" + (mIndex + 1)).slice(-2)}`}
                      </span>
                      <h3 className="font-display mb-4 text-4xl">
                        {moduleTitle}
                      </h3>
                      {moduleDesc && (
                        <p className="text-muted-foreground text-lg">
                          {moduleDesc}
                        </p>
                      )}
                    </div>
                    <div className="lg:col-span-8">
                      <div className="bg-border border-border grid grid-cols-1 gap-px overflow-hidden rounded-lg border">
                        {module.lessons.map((lesson, lIndex) => {
                          const lessonTitle = isRTL
                            ? lesson.titleAr
                            : lesson.titleEn;
                          return (
                            <Link
                              key={lesson._id}
                              href={`/${locale}/courses/${courseSlug}/${lesson.slug}`}
                              className="group bg-background hover:bg-muted/5 relative flex items-center justify-between overflow-hidden p-6 transition-all md:p-8"
                            >
                              <div className="bg-primary absolute top-0 bottom-0 left-0 w-1 origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

                              <div className="flex items-start gap-6 md:items-center">
                                <span className="border-border text-muted-foreground group-hover:border-primary group-hover:text-primary bg-background z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-colors">
                                  {lIndex + 1}
                                </span>
                                <div>
                                  <span className="group-hover:text-primary mb-1 block text-xl font-medium transition-colors">
                                    {lessonTitle}
                                  </span>
                                  {lesson.estimatedMinutes && (
                                    <span className="text-muted-foreground font-mono text-sm">
                                      {lesson.estimatedMinutes}{" "}
                                      {isRTL ? "دقيقة" : "min"}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span
                                className={`text-muted-foreground/50 group-hover:text-primary transform transition-colors ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                              >
                                &rarr;
                              </span>
                            </Link>
                          );
                        })}
                        {module.lessons.length === 0 && (
                          <div className="bg-background text-muted-foreground p-8 font-mono text-sm">
                            {isRTL ? "لا توجد دروس بعد" : "No lessons yet"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
