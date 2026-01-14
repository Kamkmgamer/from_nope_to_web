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

// Mock AI response generator (simulates educational AI tutor)
function generateMockResponse(userMessage: string, locale: string): string {
  const isRTL = locale === "ar";

  const responses: Record<string, string> = {};

  // Initialize responses based on locale
  if (isRTL) {
    responses.greeting = `مرحباً! 👋 أنا المساعد الذكي الخاص بك في رحلة تعلم تطوير الويب.

يسعدني أن أساعدك في فهم المفاهيم البرمجية، حل التحديات، أو شرح أي جزء من الدروس.

كيف يمكنني مساعدتك اليوم؟`;

    responses.help = `بالتأكيد! يمكنني مساعدتك في عدة مجالات:

## 📚 ما يمكنني مساعدتك به:

### 1. **فهم المفاهيم**
- شرح أساسيات HTML, CSS, JavaScript
- فهم مفاهيم React و Next.js
- توضيح الأنماط والممارسات الجيدة

### 2. **حل التحديات**
- تحليل المشاكل البرمجية
- تقديم حلول عملية
- شرح الأخطاء الشائعة

### 3. **مراجعة الكود**
- تحسين الكود الخاص بك
- اقتراح تحسينات الأداء
- تطبيق أفضل الممارسات

### 4. **أسئلة عامة**
- نصائح حول التعلم
- موارد إضافية
- توجيه في مسارك التعليمي

ما الذي تريد استكشافه اليوم؟ 🚀`;

    responses.react = `## 🎯 مقدمة في React

React هي مكتبة JavaScript لبناء واجهات المستخدم. إليك المفاهيم الأساسية:

\`\`\`jsx
// مكون بسيط في React
function Welcome({ name }) {
  return <h1>مرحباً، {name}!</h1>;
}

// استخدام المكون
<Welcome name="أحمد" />
\`\`\`

### المفاهيم الأساسية:

1. **المكونات (Components)** - الوحدات القابلة لإعادة الاستخدام
2. **الخصائص (Props)** - البيانات الممررة للمكونات
3. **الحالة (State)** - البيانات المحلية للمكون

### لماذا React؟
- ✅ إعادة استخدام المكونات
- ✅ تدفق بيانات أحادي الاتجاه
- ✅ نظام إيكولوجي غني
- ✅ دعم قوي من المجتمع

هل تريد شرح أعمق لأي مفهوم؟ 😊`;

    responses.javascript = `## 📜 أساسيات JavaScript

JavaScript هي لغة البرمجة للويب. دعني أشرح لك المفاهيم الأساسية:

\`\`\`javascript
// المتغيرات
let name = "أحمد";
const age = 25;

// الدوال
function greet(message) {
  return \`مرحباً، \${message}\`;
}

// المصفوفات
const skills = ["HTML", "CSS", "JavaScript"];

// الكائنات
const developer = {
  name: name,
  skills: skills,
  code: () => console.log("كتابة كود جميل! 🚀")
};
\`\`\`

### المفاهيم المهمة:

1. **let vs const** - المتغيرات الثابتة والمتغيرة
2. **الدوال** - إعادة استخدام الكود
3. **المصفوفات** - تخزين مجموعات البيانات
4. **الكائنات** - تنظيم البيانات بشكل منطقي

هل تريد أمثلة أكثر تعمقاً؟ 🤔`;

    responses.default = `## 💡 سؤال رائع!

شكراً على سؤالك! دعني أساعدك في فهم هذا المفهوم بشكل أفضل.

### ما يمكنك فعله الآن:

1. **اطرح سؤالاً محدداً** - كلما كان سؤالك أكثر تحديداً، كان الجواب أفضل
2. **شارك كودك** - يمكنني مراجعته وتقديم اقتراحات للتحسين
3. **اطلب شرحاً أعمق** - إذا كان الشرح الأول غير كافٍ

### أمثلة على أسئلة جيدة:

- "كيف أستخدم useState في React؟"
- "ما الفرق بين let و const؟"
- "كيف أجعل هذا الكود أكثر كفاءة؟"
- "اشرح لي مفهوم الـ Closures"

كيف يمكنني مساعدتك بشكل أفضل؟ 😊`;
  } else {
    responses.greeting = `Hello! 👋 I'm your AI tutor assistant here to help you on your web development learning journey.

I'm happy to help you understand programming concepts, solve challenges, or explain any part of your lessons.

How can I help you today?`;

    responses.help = `Of course! I can help you in several areas:

## 📚 What I can help you with:

### 1. **Understanding Concepts**
- Explaining HTML, CSS, JavaScript basics
- Understanding React and Next.js concepts
- Clarifying best practices and patterns

### 2. **Solving Challenges**
- Analyzing programming problems
- Providing practical solutions
- Explaining common errors

### 3. **Code Review**
- Improving your code
- Suggesting performance optimizations
- Applying best practices

### 4. **General Questions**
- Learning tips
- Additional resources
- Guidance on your learning path

What would you like to explore today? 🚀`;

    responses.react = `## 🎯 Introduction to React

React is a JavaScript library for building user interfaces. Here are the core concepts:

\`\`\`jsx
// Simple component in React
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Using the component
<Welcome name="Ahmed" />
\`\`\`

### Core Concepts:

1. **Components** - Reusable building blocks
2. **Props** - Data passed to components
3. **State** - Local data within components

### Why React?
- ✅ Component reusability
- ✅ Unidirectional data flow
- ✅ Rich ecosystem
- ✅ Strong community support

Would you like a deeper explanation of any concept? 😊`;

    responses.javascript = `## 📜 JavaScript Basics

JavaScript is the programming language of the web. Let me explain the core concepts:

\`\`\`javascript
// Variables
let name = "Ahmed";
const age = 25;

// Functions
function greet(message) {
  return \`Hello, \${message}\`;
}

// Arrays
const skills = ["HTML", "CSS", "JavaScript"];

// Objects
const developer = {
  name: name,
  skills: skills,
  code: () => console.log("Writing beautiful code! 🚀")
};
\`\`\`

### Important Concepts:

1. **let vs const** - Mutable and immutable variables
2. **Functions** - Reusable code blocks
3. **Arrays** - Storing data collections
4. **Objects** - Organizing data logically

Would you like more in-depth examples? 🤔`;

    responses.default = `## 💡 Great question!

Thanks for asking! Let me help you understand this concept better.

### What you can do now:

1. **Ask a specific question** - The more specific, the better the answer
2. **Share your code** - I can review it and suggest improvements
3. **Request deeper explanation** - If the first explanation isn't enough

### Examples of good questions:

- "How do I use useState in React?"
- "What's the difference between let and const?"
- "How can I make this code more efficient?"
- "Explain the concept of Closures to me"

How can I help you better? 😊`;
  }

  // Simple keyword matching for mock responses
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("مرحبا") ||
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi")
  ) {
    return responses.greeting;
  }
  if (
    lowerMessage.includes("مساعد") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("what can")
  ) {
    return responses.help;
  }
  if (lowerMessage.includes("react") || lowerMessage.includes("رياكت")) {
    return responses.react;
  }
  if (
    lowerMessage.includes("javascript") ||
    lowerMessage.includes("جافا") ||
    lowerMessage.includes("js")
  ) {
    return responses.javascript;
  }

  return responses.default;
}

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
            className="prose prose-invert max-w-none"
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

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsWelcomeVisible(false);
    setIsLoading(true);

    // Simulate AI thinking delay
    const thinkingDelay = 1500 + Math.random() * 1000;

    setTimeout(() => {
      const aiResponse = generateMockResponse(userMessage.content, locale);

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, thinkingDelay);
  }, [inputValue, isLoading, locale]);

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
