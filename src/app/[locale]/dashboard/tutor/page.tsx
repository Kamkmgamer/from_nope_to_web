"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  Copy,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "~/lib/utils";
import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";

// Types for chat messages
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Animation variants for messages
const messageVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as unknown as Easing },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Animation variants for container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Generate unique ID for messages
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format timestamp for display
function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

// System prompts
const SYSTEM_PROMPT_AR = `أنت مساعد تعليمي ذكي ومتخصص في تعليم برمجة الويب (Web Development).
دورك هو مساعدة الطالب في رحلة تعلمه، شرح المفاهيم بوضوح، حل المشكلات البرمجية، وتوفير أمثلة عملية.
يجب أن تكون إجاباتك مشجعة، دقيقة، ومناسبة للمبتدئين والمستوى المتوسط.
استخدم اللغة العربية في الشرح، ويمكنك استخدام المصطلحات الإنجليزية عند الضرورة مع توضيحها.
أنت خبير في: HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS.`;

const SYSTEM_PROMPT_EN = `You are an intelligent educational assistant specialized in teaching Web Development.
Your role is to help the student in their learning journey, explain concepts clearly, solve programming problems, and provide practical examples.
Your answers should be encouraging, accurate, and suitable for beginner to intermediate levels.
You are an expert in: HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS.`;

// Simple markdown parser for code blocks (simplified version for demo)
function MarkdownRenderer({ content }: { content: string }) {
  // Split content by code blocks
  const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        // Check if this is a code block
        if (part.startsWith("```") && part.endsWith("```")) {
          const codeContent = part.slice(3, -3);
          const lines = codeContent.split("\n");
          const language = lines[0]?.trim() ?? "";
          const code = lines.slice(1).join("\n");

          return (
            <div key={index} className="group relative">
              <div className="bg-secondary/80 border-foreground/10 overflow-hidden rounded-lg border backdrop-blur">
                {language && (
                  <div className="bg-secondary/50 text-muted-foreground border-foreground/10 border-b px-4 py-2 font-mono text-xs">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto p-4">
                  <code className="text-foreground font-mono text-sm">
                    {code}
                  </code>
                </pre>
              </div>
              <button
                className="bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-md p-2 opacity-0 transition-opacity group-hover:opacity-100 rtl:left-2"
                onClick={() => navigator.clipboard.writeText(code)}
                title="Copy code"
              >
                <Copy className="size-4" />
              </button>
            </div>
          );
        }

        // Regular text with simple formatting
        return (
          <div
            key={index}
            className="prose dark:prose-invert text-foreground max-w-none"
            dangerouslySetInnerHTML={{
              __html: part
                .replace(
                  /## (.*)/g,
                  '<h2 class="text-lg font-display font-semibold mt-4 mb-2">$1</h2>',
                )
                .replace(
                  /### (.*)/g,
                  '<h3 class="text-base font-medium mt-3 mb-1">$1</h3>',
                )
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-semibold">$1</strong>',
                )
                .replace(
                  /`([^`]+)`/g,
                  '<code class="bg-secondary/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>',
                )
                .replace(/(\d+\. )/g, '<span class="font-medium">$1</span>')
                .replace(/- (.*)/g, "• $1")
                .replace(/\n/g, "<br/>"),
            }}
          />
        );
      })}
    </div>
  );
}

// Message bubble component
function MessageBubble({
  message,
  isRTL,
}: {
  message: Message;
  isRTL: boolean;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "flex w-full gap-3",
        isRTL ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-8 flex-shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "max-w-[75%] sm:max-w-[70%]",
          isUser ? "items-end" : "items-start",
          isRTL && isUser && "items-start",
        )}
      >
        <div
          className={cn(
            "group relative",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground",
          )}
        >
          <div
            className={cn(
              "rounded-2xl px-4 py-3",
              isUser ? "rounded-br-md" : "rounded-bl-md",
            )}
          >
            {isUser ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            ) : (
              <MarkdownRenderer content={message.content} />
            )}
          </div>

          {/* Copy button for AI messages */}
          {!isUser && (
            <button
              className="bg-background border-foreground/20 text-muted-foreground hover:text-foreground absolute -top-2 -right-2 rounded-md border p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 rtl:-left-2"
              onClick={handleCopy}
              title="Copy message"
            >
              {copied ? (
                <Check className="size-3.5 text-green-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            "text-muted-foreground mt-1 text-xs",
            isUser ? "text-right" : "text-left",
            isRTL && isUser && "text-left",
          )}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
}

// Loading indicator component
function LoadingIndicator({ isRTL }: { isRTL: boolean }) {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex w-full gap-3",
        isRTL ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div className="bg-secondary text-foreground flex size-8 flex-shrink-0 items-center justify-center rounded-full">
        <Bot className="size-4" />
      </div>

      {/* Loading bubbles */}
      <div
        className={cn(
          "bg-secondary text-foreground rounded-2xl rounded-bl-md px-4 py-3",
          isRTL && "rounded-br-md",
        )}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="bg-muted-foreground h-2 w-2 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Empty state component
function EmptyState({ locale }: { locale: string }) {
  const t = useTranslations("dashboard.tutor");
  const isRTL = locale === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-[400px] flex-col items-center justify-center px-6 text-center"
    >
      <div className="bg-secondary/50 mb-6 flex size-20 items-center justify-center rounded-full">
        <Sparkles className="text-muted-foreground size-10" />
      </div>
      <h3 className="font-display mb-3 text-xl">{t("title")}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{t("emptyChat")}</p>

      {/* Suggested questions */}
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {[
          isRTL ? "كيف أبدأ مع React؟" : "How do I get started with React?",
          isRTL
            ? "ما الفرق بين let و const؟"
            : "What's the difference between let and const?",
          isRTL
            ? "كيف أحسّن أداء الكود؟"
            : "How can I improve code performance?",
          isRTL ? "اشرح لي مفهوم المكونات" : "Explain components to me",
        ].map((question, index) => (
          <button
            key={index}
            className="card-editorial hover:border-foreground/50 group p-4 text-left transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-secondary/50 text-foreground group-hover:bg-primary/10 group-hover:text-primary flex size-8 items-center justify-center rounded-sm transition-colors">
                <Sparkles className="size-4" />
              </div>
              <span className="group-hover:text-primary text-sm font-medium transition-colors">
                {question}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function TutorPage() {
  const { isLoaded: isClerkLoaded } = useUser();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("dashboard.tutor") || ((key: string) => key);
  const tCommon = useTranslations("dashboard.common") || ((key: string) => key);
  const chat = useAction(api.tutor.chat);

  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  // Refs for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const content = inputValue.trim();
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsWelcomeVisible(false);
    setIsLoading(true);

    try {
      // Prepare conversation history for the API
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Add current message
      history.push({ role: "user", content });

      // Add system prompt
      const systemMessage = {
        role: "system" as const,
        content: isRTL ? SYSTEM_PROMPT_AR : SYSTEM_PROMPT_EN,
      };

      const responseContent = await chat({
        messages: [systemMessage, ...history],
      });

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: isRTL
          ? "عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى لاحقاً."
          : "Sorry, an error occurred while connecting to the AI assistant. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, chat, isRTL]);

  // Handle new chat
  const handleNewChat = useCallback(() => {
    setMessages([]);
    setInputValue("");
    setIsWelcomeVisible(true);
  }, []);

  // Handle keyboard submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  // Show loading state while Clerk is loading
  if (!isClerkLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 size-8 animate-spin" />
          <p className="text-muted-foreground">{tCommon("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[calc(100vh-8rem)] flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-foreground/10 flex-shrink-0 border-b px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="font-display text-xl">{t("title")}</h1>
              <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Plus className="size-4" />
            {t("newChat")}
          </button>
        </div>
      </motion.div>

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto px-6 py-4"
      >
        {/* Context note */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/30 text-muted-foreground rounded-lg px-4 py-2 text-center text-sm backdrop-blur"
        >
          {t("contextNote")}
        </motion.div>

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {isWelcomeVisible ? (
            <EmptyState locale={locale} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isRTL={isRTL}
                />
              ))}

              {isLoading && <LoadingIndicator isRTL={isRTL} />}

              {/* Invisible element for auto-scroll */}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-foreground/10 flex-shrink-0 border-t px-6 py-4"
      >
        <div className="mx-auto flex max-w-4xl gap-3">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              disabled={isLoading}
              rows={1}
              className="bg-secondary/50 border-foreground/20 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground w-full resize-none rounded-lg border px-4 py-3 pr-12 text-sm focus:ring-2 focus:outline-none disabled:opacity-50"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
              }}
            />

            {/* Character count indicator (optional) */}
            {inputValue.length > 0 && (
              <div className="text-muted-absolute right-3 bottom-2 text-xs rtl:left-3">
                {inputValue.length}
              </div>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              "flex size-12 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300",
              inputValue.trim() && !isLoading
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-muted-foreground cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
