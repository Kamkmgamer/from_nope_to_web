"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");
  const tCta = useTranslations("cta");

  const values = [
    {
      number: "01",
      title: t("values.items.clarity.title"),
      description: t("values.items.clarity.description"),
    },
    {
      number: "02",
      title: t("values.items.bilingual.title"),
      description: t("values.items.bilingual.description"),
    },
    {
      number: "03",
      title: t("values.items.practice.title"),
      description: t("values.items.practice.description"),
    },
    {
      number: "04",
      title: t("values.items.production.title"),
      description: t("values.items.production.description"),
    },
  ];

  const timeline = [
    {
      year: t("timeline.items.concept.year"),
      event: t("timeline.items.concept.event"),
      description: t("timeline.items.concept.description"),
    },
    {
      year: t("timeline.items.curriculum.year"),
      event: t("timeline.items.curriculum.event"),
      description: t("timeline.items.curriculum.description"),
    },
    {
      year: t("timeline.items.launch.year"),
      event: t("timeline.items.launch.event"),
      description: t("timeline.items.launch.description"),
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
              {t.rich("hero.title", {
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
              {t("hero.subtitle")}
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

        {/* Story Section */}
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
                <span className="label-mono">{t("story.label")}</span>
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
                  <p className="text-foreground mb-6 text-xl leading-relaxed">
                    {t("story.paragraph1")}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("story.paragraph2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("story.paragraph3")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-border bg-muted/30 border-t py-24">
          <div className="container-editorial">
            {/* Section header */}
            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="label-mono">{t("values.label")}</span>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-lg">
                  {t.rich("values.title", {
                    highlight: (chunks) => (
                      <span className="accent-underline">{chunks}</span>
                    ),
                  })}
                </h2>
              </div>
            </div>

            {/* Values grid */}
            <div className="bg-border grid grid-cols-1 gap-px md:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-8 lg:p-12"
                >
                  <span className="number-indicator">{value.number}</span>
                  <h3 className="mt-4 mb-3 text-xl">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-border border-t py-24">
          <div className="container-editorial">
            {/* Section header */}
            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="label-mono">{t("timeline.label")}</span>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-lg">
                  {t.rich("timeline.title", {
                    highlight: (chunks) => (
                      <span className="accent-underline">{chunks}</span>
                    ),
                  })}
                </h2>
              </div>
            </div>

            {/* Timeline items */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4" />
              <div className="lg:col-span-8">
                <div className="border-border relative border-l-2 pl-8 lg:pl-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative pb-12 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="bg-primary absolute top-0 -left-[calc(0.5rem+9px)] size-4 rounded-full lg:-left-[calc(0.75rem+9px)]" />

                      {/* Year badge */}
                      <span className="font-display text-primary text-3xl opacity-70">
                        {item.year}
                      </span>

                      {/* Event title */}
                      <h3 className="mt-2 mb-2 text-xl">{item.event}</h3>

                      {/* Description */}
                      <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
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
                <span className="label-mono">{t("creator.label")}</span>
              </motion.div>

              {/* Right column - content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="card-editorial p-8 lg:p-12">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    {/* Avatar placeholder */}
                    <div className="bg-muted flex size-24 shrink-0 items-center justify-center lg:size-32">
                      <span className="font-display text-primary text-4xl">
                        K
                      </span>
                    </div>

                    {/* Bio */}
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl lg:text-3xl">
                        {t("creator.name")}
                      </h3>
                      <p className="label-mono mb-4">{t("creator.role")}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {t("creator.bio")}
                      </p>

                      {/* Social links */}
                      <div className="flex gap-4">
                        <a
                          href="https://github.com/kamkmgamer"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="size-5" />
                        </a>
                        <a
                          href="https://twitter.com/kamkmgamer"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter className="size-5" />
                        </a>
                        <a
                          href="https://linkedin.com/in/kamkm-gamer"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="size-5" />
                        </a>
                      </div>
                    </div>
                  </div>
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
