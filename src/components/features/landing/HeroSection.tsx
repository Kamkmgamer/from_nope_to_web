"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-screen flex-col justify-center py-24">
      <div className="container-editorial">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="label-mono">{t("label")}</span>
        </motion.div>

        {/* Main headline - Editorial style */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 max-w-4xl"
        >
          {t("titlePrefix")}{" "}
          <span className="line-through decoration-2 opacity-40">
            {t("titleNope")}
          </span>{" "}
          {t("titleMiddle")}{" "}
          <span className="accent-underline">{t("titleHighlight")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-xl text-lg"
        >
          {t.rich("subtitle", {
            english: () => (
              <span className="text-foreground">{t("english")}</span>
            ),
            arabic: () => (
              <span className="text-foreground">{t("arabic")}</span>
            ),
          })}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/sign-up" className="btn-primary">
            {t("ctaPrimary")}
            <ArrowRight className="size-4" />
          </Link>
          <Link href="#roadmap" className="btn-secondary">
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 origin-left rtl:origin-right"
        >
          <div className="divider-thick max-w-xs" />
        </motion.div>

        {/* Code snippet preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-2xl"
        >
          <div className="card-editorial p-6">
            <div className="label-mono mb-4">{t("codePreview.label")}</div>
            <pre className="overflow-x-auto text-sm leading-relaxed" dir="ltr">
              <code>
                <span className="text-muted-foreground">
                  {t("codePreview.comment")}
                </span>
                {"\n\n"}
                <span className="text-primary">export function</span>{" "}
                <span className="text-foreground">Welcome</span>
                <span className="text-muted-foreground">{"() {"}</span>
                {"\n"}
                {"  "}
                <span className="text-primary">return</span>{" "}
                <span className="text-muted-foreground">{"("}</span>
                {"\n"}
                {"    "}
                <span className="text-muted-foreground">{"<"}</span>
                <span className="text-foreground">div</span>
                <span className="text-muted-foreground">{">"}</span>
                {"\n"}
                {"      "}
                <span className="text-muted-foreground">{"<"}</span>
                <span className="text-foreground">h1</span>
                <span className="text-muted-foreground">{">"}</span>
                Hello, World!
                <span className="text-muted-foreground">{"</h1>"}</span>
                {"\n"}
                {"    "}
                <span className="text-muted-foreground">{"</div>"}</span>
                {"\n"}
                {"  "}
                <span className="text-muted-foreground">{");"}</span>
                {"\n"}
                <span className="text-muted-foreground">{"}"}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
