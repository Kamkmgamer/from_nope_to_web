"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import {
  User,
  Mail,
  ExternalLink,
  Globe,
  Bell,
  Clock,
  LogOut,
  Trash2,
  Loader2,
  AlertTriangle,
  GraduationCap,
  Trophy,
  BookOpen,
  ArrowRight,
  Award,
  X,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  CircularProgress,
  ProgressBar,
  Certificate,
} from "~/components/dashboard";
import { cn } from "~/lib/utils";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as unknown as Easing },
  },
};

// Animated Toggle Switch Component
function AnimatedToggle({
  checked,
  onChange,
  disabled = false,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        dir="ltr"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "focus-visible:ring-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          checked ? "bg-primary" : "bg-secondary",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            // Toggle knob position - same in both LTR and RTL
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

// Toast Component (Mock)
function Toast({
  message,
  onClose: _onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      className="bg-card fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg rtl:left-6"
    >
      <div className="bg-primary size-2 rounded-full" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
}

// Loading Overlay Component
function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="text-primary size-6 animate-spin" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("dashboard.settings");
  const tCommon = useTranslations("dashboard.common");

  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip",
  );

  const overallProgress = useQuery(
    api.progress.getOverallProgress,
    convexUser?._id ? { userId: convexUser._id } : "skip",
  );

  const [isMounted, setIsMounted] = useState(false);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>("");
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setIsMounted(true);
    if (user?.createdAt) {
      setFormattedCreatedAt(user.createdAt.toLocaleDateString());
    }
  }, [user]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [learningReminders, setLearningReminders] = useState(false);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState<{ message: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user?.createdAt) {
      const formatted = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(user.createdAt);
      setFormattedCreatedAt(formatted);
    }
  }, [isMounted, user?.createdAt, locale]);

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };
  const handleSaveNotification = async (setting: string, _value: boolean) => {
    setIsSaving(setting);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(null);
    showToast(tCommon("save"));
  };
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await clerkSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t("deleteAccountWarning"))) {
      setIsDeleting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsDeleting(false);
      showToast("Account deleted");
    }
  };
  const getCurrentLanguageName = () => {
    return locale === "en" ? "English" : "العربية";
  };
  const getAvailableLanguages = () => {
    return locale === "en" ? ["English", "العربية"] : ["الإنجليزية", "العربية"];
  };

  if (!isUserLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-primary size-8 animate-spin" />
          <span className="font-mono text-sm tracking-wider uppercase">
            {tCommon("loading")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </motion.div>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} onClose={() => setToast(null)} />
      )}

      {/* Settings Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* 1. Profile Section */}
        <motion.section variants={itemVariants}>
          <Card className="relative overflow-hidden">
            {isSigningOut && <LoadingOverlay message={t("signOut")} />}
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="size-5" />
                {t("profile")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Avatar */}
                <div className="relative">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.fullName ?? "User"}
                      width={96}
                      height={96}
                      className="border-border size-24 rounded-full border-2 object-cover"
                    />
                  ) : (
                    <div className="bg-secondary flex size-24 items-center justify-center rounded-full">
                      <User className="text-muted-foreground size-10" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="user-name"
                      className="font-mono text-xs tracking-wider uppercase"
                    >
                      Name
                    </label>
                    <div className="flex items-center gap-3">
                      <div
                        id="user-name"
                        className="bg-secondary/50 flex-1 rounded-lg px-4 py-2.5"
                      >
                        {user?.fullName ?? user?.firstName ?? "—"}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="user-email"
                      className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
                    >
                      <Mail className="size-3" />
                      Email
                    </label>
                    <div className="flex items-center gap-3">
                      <div
                        id="user-email"
                        className="bg-secondary/50 flex-1 rounded-lg px-4 py-2.5"
                      >
                        {user?.primaryEmailAddress?.emailAddress ?? "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* View on Clerk Button */}
              <div className="border-t pt-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://clerk.com/docs/customization/overview",
                      "_blank",
                    )
                  }
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  {t("viewProfile")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 2. Learning Progress Section */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GraduationCap className="size-5" />
                {t("learningProgress")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {overallProgress ? (
                <>
                  {/* Overall Progress */}
                  <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    <CircularProgress
                      percentage={overallProgress.overallPercentage}
                      size="lg"
                      showIcon
                    />
                    <div className="flex-1 space-y-4 text-center sm:text-left rtl:sm:text-right">
                      <div>
                        <h3 className="font-display text-2xl">
                          {overallProgress.overallPercentage === 100 ? (
                            <span className="flex items-center justify-center gap-2 text-emerald-500 sm:justify-start rtl:sm:justify-end dark:text-emerald-400">
                              <Trophy className="size-6" />
                              {t("allCoursesCompleted")}
                            </span>
                          ) : (
                            t("overallProgress")
                          )}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {t("progressStats", {
                            completed: overallProgress.totalLessonsCompleted,
                            total: overallProgress.totalLessonsAvailable,
                          })}
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 sm:justify-start rtl:sm:justify-end">
                        <div className="bg-secondary/50 rounded-lg px-4 py-2">
                          <span className="font-display text-xl">
                            {overallProgress.coursesCompleted}
                          </span>
                          <span className="text-muted-foreground ml-1 text-sm rtl:mr-1 rtl:ml-0">
                            / {overallProgress.totalCourses}{" "}
                            {t("coursesCompleted")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Per-Course Progress */}
                  {overallProgress.courseProgress.length > 0 && (
                    <div className="border-t pt-6">
                      <h4 className="mb-4 font-mono text-xs tracking-wider uppercase">
                        {t("courseBreakdown")}
                      </h4>
                      <div className="space-y-4">
                        {overallProgress.courseProgress.map((course) => (
                          <Link
                            key={course.courseId}
                            href={`/${locale}/dashboard/courses/${course.slug}`}
                            className="group block"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                                  course.isCompleted
                                    ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                                    : "bg-secondary text-foreground",
                                )}
                              >
                                {course.isCompleted ? (
                                  <Trophy className="size-5" />
                                ) : (
                                  <BookOpen className="size-5" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={cn(
                                      "group-hover:text-primary truncate font-medium transition-colors",
                                      course.isCompleted &&
                                        "text-emerald-600 dark:text-emerald-400",
                                    )}
                                  >
                                    {isRTL ? course.titleAr : course.titleEn}
                                  </span>
                                  <span
                                    className={cn(
                                      "shrink-0 text-sm tabular-nums",
                                      course.isCompleted
                                        ? "font-medium text-emerald-600 dark:text-emerald-400"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    {course.progressPercentage}%
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <ProgressBar
                                    value={course.progressPercentage}
                                    size="sm"
                                    className={cn(
                                      course.isCompleted &&
                                        "[&_div]:bg-emerald-500 dark:[&_div]:bg-emerald-400",
                                    )}
                                  />
                                </div>
                                <span className="text-muted-foreground mt-1 block text-xs">
                                  {course.completedLessons} /{" "}
                                  {course.totalLessons}{" "}
                                  {isRTL ? "دروس" : "lessons"}
                                </span>
                              </div>
                              <ArrowRight
                                className={cn(
                                  "text-muted-foreground size-4 opacity-0 transition-opacity group-hover:opacity-100",
                                  isRTL && "rotate-180",
                                )}
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="bg-secondary/50 flex size-16 items-center justify-center rounded-full">
                    <BookOpen className="text-muted-foreground size-8" />
                  </div>
                  <div>
                    <p className="font-medium">{t("noProgressYet")}</p>
                    <p className="text-muted-foreground text-sm">
                      {t("startLearningPrompt")}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/${locale}/dashboard/courses`}>
                      {t("browseCourses")}
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* 3. Certificates Section */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="size-5" />
                {t("certificates")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overallProgress?.courseProgress.some((c) => c.isCompleted) ? (
                <div className="grid gap-6">
                  {overallProgress.courseProgress
                    .filter((c) => c.isCompleted)
                    .map((course) => (
                      <div
                        key={course.courseId}
                        className="bg-secondary/20 border-border overflow-hidden rounded-xl border"
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
                              <Trophy className="size-6" />
                            </div>
                            <div>
                              <h4 className="font-display font-medium">
                                {isRTL ? course.titleAr : course.titleEn}
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                {t("allCoursesCompleted")}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant={
                              viewingCertificate === course.slug
                                ? "secondary"
                                : "default"
                            }
                            onClick={() =>
                              setViewingCertificate(
                                viewingCertificate === course.slug
                                  ? null
                                  : course.slug,
                              )
                            }
                          >
                            {viewingCertificate === course.slug ? (
                              <X className="mr-2 size-4" />
                            ) : (
                              <Award className="mr-2 size-4" />
                            )}
                            {viewingCertificate === course.slug
                              ? t("close")
                              : t("viewCertificate")}
                          </Button>
                        </div>

                        {/* Certificate View */}
                        {viewingCertificate === course.slug && (
                          <div className="bg-secondary/10 animate-in fade-in slide-in-from-top-4 border-t p-6 duration-300 sm:p-8">
                            <Certificate
                              userName={user?.fullName ?? "Valued Student"}
                              courseTitleEn={course.titleEn}
                              courseTitleAr={course.titleAr}
                              completedAt={
                                course.completedAt
                                  ? new Date(course.completedAt)
                                  : new Date()
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="bg-secondary/50 flex size-16 items-center justify-center rounded-full">
                    <Award className="text-muted-foreground size-8" />
                  </div>
                  <div>
                    <p className="font-medium">{t("noCertificates")}</p>
                    <p className="text-muted-foreground text-sm">
                      {t("noCertificatesSubtitle")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* 4. Language Section */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="size-5" />
                {t("language")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Language */}
              <div className="space-y-1">
                <label
                  htmlFor="current-language"
                  className="font-mono text-xs tracking-wider uppercase"
                >
                  Current Language
                </label>
                <div className="flex items-center gap-3">
                  <div
                    id="current-language"
                    className="bg-secondary/50 flex-1 rounded-lg px-4 py-2.5 font-medium"
                  >
                    {getCurrentLanguageName()}
                  </div>
                </div>
              </div>

              {/* Language Note */}
              <div className="bg-accent/10 rounded-lg px-4 py-3">
                <p className="text-sm">
                  Language is set globally via the locale selector in the
                  navigation bar. Available languages:
                </p>
                <div className="mt-2 flex gap-2">
                  {getAvailableLanguages().map((lang, index) => (
                    <span
                      key={index}
                      className="bg-secondary inline-block rounded px-2 py-1 text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 3. Notifications Section */}
        <motion.section variants={itemVariants}>
          <Card className="relative">
            {isSaving && <LoadingOverlay message={tCommon("save")} />}
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="size-5" />
                {t("notifications")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications Toggle */}
              <div className="space-y-4">
                <AnimatedToggle
                  checked={emailNotifications}
                  onChange={(checked) => {
                    setEmailNotifications(checked);
                    void handleSaveNotification("emailNotifications", checked);
                  }}
                  label={t("emailNotifications")}
                  description="Receive email notifications about your account"
                />

                {/* Progress Updates Toggle */}
                <AnimatedToggle
                  checked={progressUpdates}
                  onChange={(checked) => {
                    setProgressUpdates(checked);
                    void handleSaveNotification("progressUpdates", checked);
                  }}
                  label={t("progressUpdates")}
                  description="Get updates on your learning progress"
                />

                {/* Learning Reminders Toggle */}
                <AnimatedToggle
                  checked={learningReminders}
                  onChange={(checked) => {
                    setLearningReminders(checked);
                    void handleSaveNotification("learningReminders", checked);
                  }}
                  label={t("learningReminders")}
                  description="Receive reminders to continue learning"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 4. Account Section */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="size-5" />
                {t("account")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Info */}
              <div className="space-y-1">
                <label
                  htmlFor="account-created"
                  className="font-mono text-xs tracking-wider uppercase"
                >
                  Account Created
                </label>
                <div className="flex items-center gap-3">
                  <div
                    id="account-created"
                    className="bg-secondary/50 flex-1 rounded-lg px-4 py-2.5"
                  >
                    {formattedCreatedAt ||
                      (isMounted ? "Unable to fetch" : "Loading...")}
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="inline-flex items-center gap-2"
                >
                  {isSigningOut ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  {t("signOut")}
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="border-t pt-6">
                <div className="mb-4">
                  <h3 className="text-destructive flex items-center gap-2 font-medium">
                    <AlertTriangle className="size-4" />
                    {t("dangerZone")}
                  </h3>
                </div>

                <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{t("deleteAccount")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("deleteAccountWarning")}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-2"
                    >
                      {isDeleting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                      {t("deleteAccount")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
