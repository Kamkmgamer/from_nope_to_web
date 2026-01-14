"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
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
  const t = useTranslations("dashboard.settings");
  const tCommon = useTranslations("dashboard.common");

  // Client-side hydration fix - only render date after mount
  const [isMounted, setIsMounted] = useState(false);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>("");

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [learningReminders, setLearningReminders] = useState(false);

  // Loading states
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string } | null>(null);

  // Mark as mounted and format dates only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format date only when user data is available and component is mounted
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

  // Show toast notification
  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  // Mock save handlers
  const handleSaveNotification = async (setting: string, _value: boolean) => {
    setIsSaving(setting);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(null);
    showToast(tCommon("save"));
  };

  // Handle sign out
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

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (window.confirm(t("deleteAccountWarning"))) {
      setIsDeleting(true);
      // Simulate deletion
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsDeleting(false);
      showToast("Account deleted");
    }
  };

  // Get current language name
  const getCurrentLanguageName = () => {
    return locale === "en" ? "English" : "العربية";
  };

  // Get available languages
  const getAvailableLanguages = () => {
    return locale === "en" ? ["English", "العربية"] : ["الإنجليزية", "العربية"];
  };

  // Loading state while user data loads
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

        {/* 2. Language Section */}
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
