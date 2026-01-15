"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("terms");
  const tCta = useTranslations("cta");

  const sections = [
    {
      id: "acceptance",
      title: t("sections.acceptance.title"),
      content: t("sections.acceptance.content"),
    },
    {
      id: "account-registration",
      title: t("sections.accountRegistration.title"),
      content: t("sections.accountRegistration.content"),
    },
    {
      id: "user-responsibilities",
      title: t("sections.userResponsibilities.title"),
      content: t("sections.userResponsibilities.content"),
    },
    {
      id: "intellectual-property",
      title: t("sections.intellectualProperty.title"),
      content: t("sections.intellectualProperty.content"),
    },
    {
      id: "user-generated-content",
      title: t("sections.userGeneratedContent.title"),
      content: t("sections.userGeneratedContent.content"),
    },
    {
      id: "prohibited-activities",
      title: t("sections.prohibitedActivities.title"),
      content: t("sections.prohibitedActivities.content"),
    },
    {
      id: "disclaimers",
      title: t("sections.disclaimers.title"),
      content: t("sections.disclaimers.content"),
    },
    {
      id: "limitation-of-liability",
      title: t("sections.limitationOfLiability.title"),
      content: t("sections.limitationOfLiability.content"),
    },
    {
      id: "termination",
      title: t("sections.termination.title"),
      content: t("sections.termination.content"),
    },
    {
      id: "governing-law",
      title: t("sections.governingLaw.title"),
      content: t("sections.governingLaw.content"),
    },
    {
      id: "changes-to-terms",
      title: t("sections.changesToTerms.title"),
      content: t("sections.changesToTerms.content"),
    },
    {
      id: "contact",
      title: t("sections.contact.title"),
      content: t("sections.contact.content"),
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

            {/* Last updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="label-mono">{t("lastUpdated")}</span>
              <span className="text-muted-foreground">
                {t("lastUpdatedDate")}
              </span>
            </motion.div>

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

        {/* Terms Sections */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="border-border border-t py-16"
          >
            <div className="container-editorial">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left column - label and title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="lg:col-span-4"
                >
                  <span className="label-mono mb-2 block">
                    {t("sectionLabel", { number: index + 1 })}
                  </span>
                  <h2 className="text-2xl lg:text-3xl">{section.title}</h2>
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
                    <div
                      className="text-muted-foreground space-y-4 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: section.content.replace(/\n/g, "<br />"),
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

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

        {/* Contact CTA for questions */}
        <section className="border-border border-t py-16">
          <div className="container-editorial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 rounded-lg p-8 text-center lg:p-12"
            >
              <h3 className="mb-4 text-xl lg:text-2xl">
                {t("questionsTitle")}
              </h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-lg">
                {t("questionsSubtitle")}
              </p>
              <a
                href={`mailto:${t("supportEmail")}`}
                className="text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors"
              >
                <Mail className="size-4" />
                {t("supportEmail")}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
