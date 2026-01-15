"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CourseSidebar } from "~/components/features/course/CourseSidebar";
import { Button } from "~/components/ui/button";
import { Menu, X, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const t = useTranslations("common"); // I might need to add common translations
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const courseSlug = params.courseSlug as string;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="bg-background/80 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>

          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="inline sm:hidden">Back</span>
          </Link>

          <div className="bg-border/50 mx-2 hidden h-6 w-px sm:block" />

          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight"
          >
            NOPE<span className="text-primary">→</span>WEB
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* <LanguageSwitcher /> - TODO: Add if needed */}
          {/* <ThemeToggle /> */}
          {/* User Profile Button - Sync from clerk later */}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-80 shrink-0 border-r lg:block">
          <CourseSidebar courseSlug={courseSlug} />
        </aside>

        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="bg-background/80 fixed inset-0 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="bg-background relative w-80 max-w-[85vw] shadow-2xl">
              <div className="flex h-14 items-center justify-end border-b px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
                <CourseSidebar courseSlug={courseSlug} />
              </div>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <main className="bg-muted/10 flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="container-editorial mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
