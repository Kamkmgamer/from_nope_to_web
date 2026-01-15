"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";
import { useTranslations } from "next-intl";

export default function RoadmapPage() {
  const t = useTranslations("courses");
  const tCta = useTranslations("cta");

  const courses = [
    {
      number: "I",
      level: t("levels.beginner"),
      title: t("items.foundations.title"),
      description: t("items.foundations.description"),
      extendedDescription:
        "Start your journey with the building blocks of the web. Learn how websites are structured and styled from scratch.",
      topics: [
        "HTML5 Semantic Structure",
        "CSS3 Styling & Layouts",
        "Flexbox & CSS Grid",
        "Responsive Design Principles",
        "Browser Developer Tools",
        "Web Accessibility Basics",
      ],
      project: "Build a responsive personal portfolio website",
    },
    {
      number: "II",
      level: t("levels.beginner"),
      title: t("items.js.title"),
      description: t("items.js.description"),
      extendedDescription:
        "Master the programming language that powers the web. From variables to async programming, build the logic behind interactive experiences.",
      topics: [
        "JavaScript ES6+ Syntax",
        "Functions & Scope",
        "Arrays & Object Manipulation",
        "DOM Manipulation",
        "Event Handling",
        "Async/Await & Promises",
        "Error Handling",
        "ES Modules",
      ],
      project: "Build an interactive task management application",
    },
    {
      number: "III",
      level: t("levels.intermediate"),
      title: t("items.react.title"),
      description: t("items.react.description"),
      extendedDescription:
        "Learn modern React with Next.js. Build performant, scalable applications using the latest patterns and best practices.",
      topics: [
        "React 19 Fundamentals",
        "React Hooks (useState, useEffect, useRef)",
        "Custom Hooks",
        "Next.js 15 App Router",
        "Server Components",
        "Client Components",
        "Data Fetching & Caching",
        "Routing & Navigation",
        "Tailwind CSS Integration",
        "Forms & Validation",
      ],
      project: "Build a full-featured blog platform with comments",
    },
    {
      number: "IV",
      level: t("levels.advanced"),
      title: t("items.t3.title"),
      description: t("items.t3.description"),
      extendedDescription:
        "Build production-ready applications with TypeScript, tRPC, and modern database patterns. Learn professional-grade tooling.",
      topics: [
        "TypeScript Deep Dive",
        "Type Safety & Generics",
        "tRPC API Development",
        "Drizzle ORM & Database Design",
        "Authentication & Authorization",
        "Environment Configuration",
        "Testing Strategies",
        "Deployment & CI/CD",
        "Performance Optimization",
        "Error Boundary Handling",
      ],
      project: "Build a SaaS application with user authentication and payments",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="flex min-h-[70vh] flex-col justify-center pt-24 pb-16">
          <div className="container-editorial">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link
                href="/"
                className="label-mono hover:text-foreground inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="size-3" />
                {t("backToHome") || "Back to Home"}
              </Link>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 max-w-3xl"
            >
              {t.rich("title", {
                zero: (chunks) => (
                  <span className="accent-underline">{chunks}</span>
                ),
                production: (chunks) => (
                  <span className="accent-underline">{chunks}</span>
                ),
              })}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground mb-12 max-w-xl text-lg"
            >
              {t("subtitle")}
            </motion.p>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left rtl:origin-right"
            >
              <div className="divider-thick max-w-xs" />
            </motion.div>
          </div>
        </section>

        {/* Course Modules Section */}
        <section className="border-border border-t py-24">
          <div className="container-editorial">
            {/* Section header */}
            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="label-mono">{t("label")}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="container-prose pl-0">
                  <p className="text-foreground mb-6 text-xl leading-relaxed">
                    {t("extendedDescription") ||
                      "This comprehensive curriculum is designed to take you from complete beginner to confident full-stack developer. Each module builds upon the previous one, ensuring you have a solid foundation before moving to more advanced topics."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("extendedSubtitle") ||
                      "You'll learn by building real projects, not just watching videos. Every module includes hands-on exercises, coding challenges, and a final project to showcase your skills."}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Course Modules List */}
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
                  <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Number Indicator */}
                    <div className="lg:col-span-1">
                      <span className="font-display text-primary text-4xl opacity-60 lg:text-5xl">
                        {course.number}
                      </span>
                    </div>

                    {/* Course Info */}
                    <div className="lg:col-span-5">
                      {/* Level Badge */}
                      <div className="mb-3 flex items-center gap-3">
                        <span className="tag">{course.level}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl lg:text-2xl">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {course.description}
                      </p>

                      {/* Extended Description */}
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {course.extendedDescription}
                      </p>
                    </div>

                    {/* Topics & Project */}
                    <div className="lg:col-span-6">
                      {/* Topics */}
                      <div className="mb-6">
                        <h4 className="label-mono text-muted-foreground mb-3 text-xs tracking-wider uppercase">
                          What you will learn
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {course.topics.map((topic) => (
                            <span key={topic} className="tag">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="label-mono text-muted-foreground mb-2 text-xs tracking-wider uppercase">
                          Final Project
                        </h4>
                        <p className="text-sm">{course.project}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coming soon note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <span className="label-mono">{t("launchingSoon")}</span>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-foreground text-background py-24">
          <div className="container-editorial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-background mx-auto mb-6 max-w-lg">
                {tCta("title")}
              </h2>
              <p className="text-background/70 mx-auto mb-8 max-w-md">
                {tCta("subtitle")}
              </p>
              <Link
                href="/sign-up"
                className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-3 px-8 py-4 font-mono text-sm tracking-wide uppercase transition-colors"
              >
                {tCta("button")}
                <ArrowRight className="size-4" />
              </Link>
              <p className="text-background/50 mt-4 text-sm">
                {tCta("freeToStart")}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
