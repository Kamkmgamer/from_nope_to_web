"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function CoursesSection() {
  const t = useTranslations("courses");

  const courses = [
    {
      number: "I",
      title: t("items.foundations.title"),
      description: t("items.foundations.description"),
      topics: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
      level: t("levels.beginner"),
    },
    {
      number: "II",
      title: t("items.react.title"),
      description: t("items.react.description"),
      topics: ["Components", "Hooks", "State", "Performance"],
      level: t("levels.intermediate"),
    },
    {
      number: "III",
      title: t("items.nextjs.title"),
      description: t("items.nextjs.description"),
      topics: ["App Router", "Server Components", "API Routes", "Deployment"],
      level: t("levels.advanced"),
    },
    {
      number: "IV",
      title: t("items.t3.title"),
      description: t("items.t3.description"),
      topics: ["tRPC", "Drizzle", "PostgreSQL", "TypeScript"],
      level: t("levels.advanced"),
    },
  ];

  return (
    <section id="roadmap" className="border-border border-t py-24">
      <div className="container-editorial">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label-mono">{t("label")}</span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-lg">
              {t.rich("title", {
                zero: (chunks) => (
                  <span className="accent-underline">{chunks}</span>
                ),
                production: (chunks) => (
                  <span className="accent-underline">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Courses list */}
        <div className="border-border space-y-0 border-t">
          {courses.map((course, index) => (
            <motion.div
              key={course.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-border border-b py-8 lg:py-12"
            >
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="font-display text-primary text-4xl opacity-60 lg:text-5xl">
                    {course.number}
                  </span>
                </div>

                {/* Main content */}
                <div className="lg:col-span-5">
                  <div className="mb-2 flex items-baseline gap-4">
                    <h3 className="text-xl lg:text-2xl">{course.title}</h3>
                    <span className="tag">{course.level}</span>
                  </div>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>

                {/* Topics */}
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span key={topic} className="tag">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-12 text-center">
          <span className="label-mono">{t("launchingSoon")}</span>
        </div>
      </div>
    </section>
  );
}
