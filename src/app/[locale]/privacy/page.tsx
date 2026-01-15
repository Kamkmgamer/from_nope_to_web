"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Lock, Eye, User } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const tCta = useTranslations("cta");

  const sections = [
    {
      id: "introduction",
      title: t("sections.introduction.title"),
      content: t("sections.introduction.content"),
      icon: Shield,
    },
    {
      id: "information-collect",
      title: t("sections.informationCollect.title"),
      content: t("sections.informationCollect.content"),
      icon: Eye,
    },
    {
      id: "information-use",
      title: t("sections.informationUse.title"),
      content: t("sections.informationUse.content"),
      icon: User,
    },
    {
      id: "information-share",
      title: t("sections.informationShare.title"),
      content: t("sections.informationShare.content"),
      icon: User,
    },
    {
      id: "data-security",
      title: t("sections.dataSecurity.title"),
      content: t("sections.dataSecurity.content"),
      icon: Lock,
    },
    {
      id: "your-rights",
      title: t("sections.yourRights.title"),
      content: t("sections.yourRights.content"),
      icon: Shield,
    },
    {
      id: "children-privacy",
      title: t("sections.childrenPrivacy.title"),
      content: t("sections.childrenPrivacy.content"),
      icon: User,
    },
    {
      id: "changes",
      title: t("sections.changes.title"),
      content: t("sections.changes.content"),
      icon: Lock,
    },
    {
      id: "contact",
      title: t("sections.contact.title"),
      content: t("sections.contact.content"),
      icon: Eye,
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

        {/* Content Sections */}
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="border-border border-t py-16 first-of-type:border-t-0"
            >
              <div className="container-editorial">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  {/* Left column - icon and label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 flex size-12 flex-shrink-0 items-center justify-center rounded-lg">
                        <Icon className="text-primary size-6" />
                      </div>
                      <span className="label-mono">{section.title}</span>
                    </div>
                  </motion.div>

                  {/* Right column - content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="lg:col-span-8"
                  >
                    <div className="container-prose pl-0">
                      <div
                        className="text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: section.content,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          );
        })}

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
