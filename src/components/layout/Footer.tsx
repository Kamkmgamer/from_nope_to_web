"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");

  return (
    <footer className="border-border border-t py-16">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <Link href="/" className="mb-4 inline-block">
              <span className="font-mono text-sm tracking-wider uppercase">
                Nope<span className="text-primary">→</span>Web
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <span className="label-mono mb-4 block">{t("navigation")}</span>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {tNav("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {tNav("roadmap")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <span className="label-mono mb-4 block">{t("legal")}</span>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border mt-16 border-t pt-8">
          <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
