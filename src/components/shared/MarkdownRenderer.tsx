"use client";

import { useState, useEffect } from "react";

export function MarkdownRenderer({
  content,
  isRTL,
}: {
  content: string;
  isRTL?: boolean;
}) {
  const [ReactMarkdown, setReactMarkdown] = useState<React.ComponentType<{
    children: string;
  }> | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR hydration issues
    void import("react-markdown").then((mod) => {
      setReactMarkdown(() => mod.default);
    });
  }, []);

  if (!ReactMarkdown) {
    // Simple fallback while loading
    return (
      <div
        className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="animate-pulse space-y-4">
          <div className="bg-muted/20 h-8 w-3/4 rounded"></div>
          <div className="bg-muted/20 h-4 w-full rounded"></div>
          <div className="bg-muted/20 h-4 w-5/6 rounded"></div>
          <div className="bg-muted/20 h-4 w-4/6 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? "text-right" : "text-left"} prose-headings:font-display prose-headings:font-normal prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-code:text-primary prose-code:bg-secondary/20 prose-code:rounded prose-code:px-1 prose-code:font-mono prose-code:text-sm prose-pre:bg-secondary/10 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:text-foreground`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
