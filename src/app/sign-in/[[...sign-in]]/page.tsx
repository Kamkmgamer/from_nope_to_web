"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/20 absolute start-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br to-transparent blur-[100px]" />
        <div className="from-accent/15 absolute end-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br to-transparent blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8"
      >
        {/* Back link */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        {/* Card */}
        <div className="border-border bg-card/80 rounded-2xl border p-8 backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <div className="from-primary to-accent flex size-10 items-center justify-center rounded-lg bg-gradient-to-br">
              <span className="text-lg font-bold text-white">N</span>
            </div>
            <span className="text-xl font-semibold">
              <span className="text-foreground">Nope</span>
              <span className="gradient-text">ToWeb</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to continue your learning journey
          </p>

          {/* Notice */}
          <div className="border-primary/30 bg-primary/5 mb-6 rounded-xl border p-4">
            <div className="flex items-start gap-3">
              <LogIn className="text-primary mt-0.5 size-5" />
              <div>
                <h3 className="mb-1 text-sm font-medium">
                  Authentication Setup Required
                </h3>
                <p className="text-muted-foreground text-sm">
                  This page will display the Clerk sign-in component once you
                  configure your Clerk API keys in the{" "}
                  <code className="bg-muted rounded px-1 py-0.5 text-xs">
                    .env
                  </code>{" "}
                  file.
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder buttons */}
          <div className="space-y-3">
            <Button className="w-full" disabled>
              Sign in with Email
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign in with GitHub
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
