"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Interactive Coding",
    description:
      "Write and execute code directly in your browser. Real-time feedback as you learn.",
  },
  {
    number: "02",
    title: "AI Tutor",
    description:
      "Context-aware assistance that understands your current lesson and code.",
  },
  {
    number: "03",
    title: "Bilingual",
    description:
      "Full Arabic and English support. RTL layouts, localized content.",
  },
  {
    number: "04",
    title: "Structured Path",
    description:
      "From HTML basics to advanced T3 stack. Clear progression, no guesswork.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-border border-t py-24">
      <div className="container-editorial">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label-mono">What you get</span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-lg">
              Tools for <span className="accent-underline">serious</span>{" "}
              learning
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
