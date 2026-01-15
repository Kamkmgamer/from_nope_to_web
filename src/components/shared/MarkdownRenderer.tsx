"use client";

import { useState, useEffect } from "react";

export function MarkdownRenderer({
  content,
  isRTL,
}: {
  content: string;
  isRTL?: boolean;
}) {
  const [MarkdownComponents, setMarkdownComponents] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactMarkdown: React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remarkGfm: any;
  } | null>(null);

  useEffect(() => {
    // Dynamic import both libraries to avoid SSR hydration issues
    void Promise.all([import("react-markdown"), import("remark-gfm")]).then(
      ([markdownMod, gfmMod]) => {
        setMarkdownComponents({
          ReactMarkdown: markdownMod.default as unknown as React.ComponentType,
          remarkGfm: gfmMod.default,
        });
      },
    );
  }, []);

  if (!MarkdownComponents) {
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { ReactMarkdown, remarkGfm } = MarkdownComponents;

  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none ${
        isRTL ? "text-right" : "text-left"
      } prose-headings:font-display prose-headings:font-normal prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-code:text-primary prose-code:bg-primary/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-6 prose-pre:text-foreground prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-th:border prose-th:border-border prose-th:bg-muted/30 prose-th:p-3 prose-th:text-left prose-th:font-display prose-th:text-lg prose-th:font-normal prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-muted-foreground prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:bg-muted/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-strong:text-foreground prose-strong:font-medium prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary prose-a:transition-colors`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
