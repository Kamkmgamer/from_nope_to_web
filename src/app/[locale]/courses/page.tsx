"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Navbar, Footer } from "~/components/layout";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CoursesPage() {
  const courses = useQuery(api.courses.list);
  const locale = useLocale();
  const t = useTranslations("courses");
  const isRTL = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-32 pb-24">
        <div className="container-editorial">
          <div className="mb-20">
            <span className="label-mono text-primary mb-4 block">
              {t("label")}
            </span>
            <h1 className="font-display text-foreground mb-8 max-w-4xl text-5xl leading-[1.1] md:text-7xl">
              {t.rich("title", {
                zero: (chunks) => (
                  <span className="font-light italic opacity-80">{chunks}</span>
                ),
                production: (chunks) => (
                  <span className="text-primary italic">{chunks}</span>
                ),
              })}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed md:text-2xl">
              {t("subtitle")}
            </p>
          </div>

          <div className="border-border grid grid-cols-1 gap-0 border-t">
            {courses === undefined
              ? // Loading state
                [1, 2, 3].map((i) => (
                  <div key={i} className="border-border border-b py-12">
                    <div className="bg-muted/20 mb-4 h-8 w-1/3 rounded" />
                    <div className="bg-muted/20 h-4 w-2/3 rounded" />
                  </div>
                ))
              : courses.map((course, index) => {
                  const title = isRTL ? course.titleAr : course.titleEn;
                  const description = isRTL
                    ? course.descriptionAr
                    : course.descriptionEn;

                  return (
                    <Link
                      href={`/${locale}/courses/${course.slug}`}
                      key={course._id}
                      className="group block"
                    >
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="border-border group-hover:bg-muted/5 relative -mx-4 grid cursor-pointer grid-cols-1 gap-8 border-b px-4 py-16 transition-colors duration-500 ease-out lg:-mx-8 lg:grid-cols-12 lg:px-8"
                      >
                        {/* Hover Line */}
                        <div className="bg-primary absolute top-0 bottom-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

                        <div className="lg:col-span-1">
                          <span className="font-display text-muted-foreground/30 group-hover:text-primary text-4xl transition-colors duration-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="lg:col-span-8">
                          <h2 className="font-display group-hover:text-primary mb-6 text-4xl transition-colors duration-300 md:text-5xl">
                            {title}
                          </h2>
                          <p className="text-muted-foreground max-w-3xl text-xl leading-relaxed">
                            {description}
                          </p>
                        </div>
                        <div className="lg:col-span-3 lg:flex lg:items-center lg:justify-end">
                          <span className="label-mono text-foreground group-hover:text-primary inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-2">
                            {isRTL ? "استكشف الدورة" : "Explore Course"}
                            <span
                              className={`text-xl ${isRTL ? "rotate-180" : ""}`}
                            >
                              &rarr;
                            </span>
                          </span>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
