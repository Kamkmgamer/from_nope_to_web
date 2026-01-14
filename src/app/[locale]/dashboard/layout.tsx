"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  MessageSquare,
  Settings,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "~/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("dashboard.sidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const pathname = usePathname();

  // Create locale-prefixed links
  const sidebarLinks = [
    { href: `/${locale}/dashboard`, icon: Home, label: t("overview") },
    {
      href: `/${locale}/dashboard/courses`,
      icon: BookOpen,
      label: t("courses"),
    },
    {
      href: `/${locale}/dashboard/tutor`,
      icon: MessageSquare,
      label: t("tutor"),
    },
    {
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
      label: t("settings"),
    },
  ];

  // Check if a link is active
  const isLinkActive = (href: string) => {
    if (href === `/${locale}/dashboard`) {
      return pathname === `/${locale}/dashboard`;
    }
    return pathname?.startsWith(href);
  };

  // Close sidebar when clicking outside
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMobileOpen(false);
    }
  }, []);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  // Focus trap for mobile sidebar
  useEffect(() => {
    if (isMobileOpen && sidebarRef.current) {
      const currentSidebar = sidebarRef.current;
      const focusableElements = currentSidebar.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      currentSidebar.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => {
        currentSidebar?.removeEventListener("keydown", handleTab);
      };
    }
  }, [isMobileOpen]);

  return (
    <div className="min-h-screen">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="focus:bg-background focus:text-foreground focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:font-mono focus:text-sm focus:tracking-wider focus:uppercase focus:ring-2 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "border-border bg-background fixed inset-y-0 z-30 hidden w-64 border-e lg:block",
          isRTL ? "right-0 border-s border-e-0" : "left-0",
        )}
      >
        {/* Logo */}
        <div className="border-border flex h-16 items-center border-b px-6">
          <Link href="/" className="font-mono text-sm tracking-wider uppercase">
            Nope<span className="text-primary">→</span>Web
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {sidebarLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <link.icon className={cn("size-4", active && "text-primary")} />
                <span className="font-mono text-xs tracking-wider uppercase">
                  {link.label}
                </span>
                {active && (
                  <span className="bg-primary ml-auto size-1.5 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="border-border bg-background fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b px-4 lg:hidden">
        <Link href="/" className="font-mono text-sm tracking-wider uppercase">
          Nope<span className="text-primary">→</span>Web
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <motion.div
          ref={sidebarRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background fixed inset-0 z-30 pt-16 lg:hidden"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile sidebar navigation"
        >
          <nav className="space-y-1 p-4">
            {sidebarLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "border-border flex items-center gap-3 border-b px-3 py-3 text-sm transition-colors",
                    active
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <link.icon
                    className={cn("size-4", active && "text-primary")}
                  />
                  <span className="font-mono text-xs tracking-wider uppercase">
                    {link.label}
                  </span>
                  <ArrowRight
                    className={cn("ms-auto size-3", isRTL && "rotate-180")}
                  />
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main id="main-content" className="min-h-screen pt-16 lg:pt-0">
        <div
          className={cn(
            "dashboard-content p-6",
            isRTL ? "dashboard-content-rtl" : "dashboard-content-ltr",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
