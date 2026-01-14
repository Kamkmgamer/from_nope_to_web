"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-border bg-foreground text-background border-t py-24">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Left side */}
          <div className="lg:col-span-7">
            <h2 className="text-background mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-background/70 max-w-md">
              Join our mailing list to be notified when we launch. Free access
              for early subscribers.
            </p>
          </div>

          {/* Right side */}
          <div className="lg:col-span-5 lg:text-end">
            <Link
              href="/sign-up"
              className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-3 px-8 py-4 font-mono text-sm tracking-wide uppercase transition-colors"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        {/* Decorative */}
        <div className="border-background/20 mt-16 border-t pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <span className="text-background/50 font-mono text-xs tracking-wider uppercase">
              Free to start • No credit card required
            </span>
            <span className="text-background/50 font-mono text-xs tracking-wider uppercase">
              Arabic + English
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
