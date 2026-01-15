"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, Bot, Globe2, Map } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";
import { useTranslations } from "next-intl";

export default function FeaturesPage() {
  const t = useTranslations("features");
  const tCta = useTranslations("cta");

  const features = [
    {
      key: "interactive",
      icon: Code2,
      title: t("items.interactive.title"),
      description: t("items.interactive.description"),
    },
    {
      key: "ai",
      icon: Bot,
      title: t("items.ai.title"),
      description: t("items.ai.description"),
    },
    {
      key: "bilingual",
      icon: Globe2,
      title: t("items.bilingual.title"),
      description: t("items.bilingual.description"),
    },
    {
      key: "structured",
      icon: Map,
      title: t("items.structured.title"),
      description: t("items.structured.description"),
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
                {t("backToHome")}
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
                highlight: (chunks) => (
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

        {/* Features Grid Section */}
        <section className="border-border bg-muted/30 border-t py-24">
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
                <h2 className="max-w-lg">
                  {t.rich("title", {
                    highlight: (chunks) => (
                      <span className="accent-underline">{chunks}</span>
                    ),
                  })}
                </h2>
              </motion.div>
            </div>

            {/* Features grid */}
            <div className="bg-border grid grid-cols-1 gap-px md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-8 lg:p-12"
                >
                  {/* Icon */}
                  <div className="bg-primary/10 mb-6 inline-flex size-14 items-center justify-center rounded-xl">
                    <feature.icon className="text-primary size-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Coding Feature Detail */}
        <section className="border-border border-t py-24">
          <div className="container-editorial">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Left column - label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="label-mono">
                  {t("items.interactive.label")}
                </span>
              </motion.div>

              {/* Right column - content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="container-prose pl-0">
                  <h2 className="mb-6">{t("items.interactive.title")}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.interactive.description")}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.interactive.detail1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("items.interactive.detail2")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Tutor Feature Detail */}
        <section className="border-border bg-muted/30 border-t py-24">
          <div className="container-editorial">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Left column - label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="label-mono">{t("items.ai.label")}</span>
              </motion.div>

              {/* Right column - content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="container-prose pl-0">
                  <h2 className="mb-6">{t("items.ai.title")}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.ai.description")}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.ai.detail1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("items.ai.detail2")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bilingual Platform Feature Detail */}
        <section className="border-border border-t py-24">
          <div className="container-editorial">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Left column - label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="label-mono">{t("items.bilingual.label")}</span>
              </motion.div>

              {/* Right column - content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="container-prose pl-0">
                  <h2 className="mb-6">{t("items.bilingual.title")}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.bilingual.description")}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.bilingual.detail1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("items.bilingual.detail2")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Structured Path Feature Detail */}
        <section className="border-border bg-muted/30 border-t py-24">
          <div className="container-editorial">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Left column - label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="label-mono">
                  {t("items.structured.label")}
                </span>
              </motion.div>

              {/* Right column - content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="container-prose pl-0">
                  <h2 className="mb-6">{t("items.structured.title")}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.structured.description")}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("items.structured.detail1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("items.structured.detail2")}
                  </p>
                </div>
              </motion.div>
            </div>
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
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
