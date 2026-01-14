"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard.home");
  const tCourses = useTranslations("courses");

  const courses = [
    {
      id: "foundations",
      number: "I",
      title: tCourses("items.foundations.title"),
      status: t("comingSoon"),
    },
    {
      id: "react",
      number: "II",
      title: tCourses("items.react.title"),
      status: t("comingSoon"),
    },
  ];

  return (
    <div className="max-w-3xl">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="label-mono">{t("label")}</span>
        <h1 className="mt-4 text-3xl lg:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </motion.div>

      {/* Getting Started */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="mb-6 text-xl">{t("startLearning")}</h2>
        <div className="border-border space-y-0 border-t">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border-border flex items-center justify-between border-b py-6"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-primary text-2xl opacity-60">
                  {course.number}
                </span>
                <span className="text-foreground">{course.title}</span>
              </div>
              <span className="tag">{course.status}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* AI Tutor */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card-editorial p-8">
          <h3 className="mb-2 text-lg">{t("needHelp")}</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            {t("needHelpSubtitle")}
          </p>
          <Link
            href="/dashboard/tutor"
            className="btn-secondary inline-flex items-center gap-2"
          >
            {t("openTutor")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
