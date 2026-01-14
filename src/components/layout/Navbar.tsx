"use client";

import { useState, useEffect } from "react";
import { Link } from "~/i18n/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#features", label: t("features") },
    { href: "/#roadmap", label: t("roadmap") },
    { href: "/about", label: t("about") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 border-border border-b backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="container-editorial flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-sm tracking-wider uppercase">
              Nope<span className="text-primary">→</span>Web
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/sign-up"
              className="hover:text-primary font-mono text-xs tracking-wider uppercase transition-colors"
            >
              {t("getStarted")} →
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background fixed inset-0 z-40 pt-16 md:hidden"
        >
          <nav className="container-editorial space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground block font-mono text-sm tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2">
              <LanguageSwitcher />
            </div>
            <div className="border-border border-t pt-6">
              <Link
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary inline-flex"
              >
                {t("getStarted")}
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
