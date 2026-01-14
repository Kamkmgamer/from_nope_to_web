"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    {
      number: "01",
      title: t("items.interactive.title"),
      description: t("items.interactive.description"),
    },
    {
      number: "02",
      title: t("items.ai.title"),
      description: t("items.ai.description"),
    },
    {
      number: "03",
      title: t("items.bilingual.title"),
      description: t("items.bilingual.description"),
    },
    {
      number: "04",
      title: t("items.structured.title"),
      description: t("items.structured.description"),
    },
  ];

  return (
    <section id="features" className="border-border border-t py-24">
      <div className="container-editorial">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label-mono">{t("label")}</span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-lg">
              {t.rich("title", {
                highlight: () => (
                  <span className="accent-underline">{t("highlight")}</span>
                ),
              })}
            </h2>
          </div>
        </div>

        {/* Features grid */}
        <div className="bg-border grid grid-cols-1 gap-px md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 lg:p-12"
            >
              <span className="number-indicator">{feature.number}</span>
              <h3 className="mt-4 mb-3 text-xl">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
