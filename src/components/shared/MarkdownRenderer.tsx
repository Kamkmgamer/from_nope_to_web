import ReactMarkdown from "react-markdown";

export function MarkdownRenderer({
  content,
  isRTL,
}: {
  content: string;
  isRTL?: boolean;
}) {
  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? "text-right" : "text-left"} prose-headings:font-display prose-headings:font-normal prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-code:text-primary prose-code:bg-secondary/20 prose-code:rounded prose-code:px-1 prose-code:font-mono prose-code:text-sm prose-pre:bg-secondary/10 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:text-foreground`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
