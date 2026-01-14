"use client";

import { useState } from "react";
import Link from "next/link";
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

const sidebarLinks = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/dashboard/courses", icon: BookOpen, label: "Courses" },
  { href: "/dashboard/tutor", icon: MessageSquare, label: "AI Tutor" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="border-border bg-background fixed inset-y-0 start-0 hidden w-64 border-e lg:block">
        {/* Logo */}
        <div className="border-border flex h-16 items-center border-b px-6">
          <Link href="/" className="font-mono text-sm tracking-wider uppercase">
            Nope<span className="text-primary">→</span>Web
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 px-3 py-2.5 text-sm transition-colors"
            >
              <link.icon className="size-4" />
              <span className="font-mono text-xs tracking-wider uppercase">
                {link.label}
              </span>
            </Link>
          ))}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background fixed inset-0 z-30 pt-16 lg:hidden"
        >
          <nav className="space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground border-border flex items-center gap-3 border-b px-3 py-3 text-sm"
              >
                <link.icon className="size-4" />
                <span className="font-mono text-xs tracking-wider uppercase">
                  {link.label}
                </span>
                <ArrowRight className="ms-auto size-3" />
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-16 lg:ps-64 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
