import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    // CLEANUP Phase: Remove existing courses/modules/lessons to ensure fresh seed
    const allLessons = await ctx.db.query("lessons").collect();
    for (const l of allLessons) await ctx.db.delete(l._id);

    const allModules = await ctx.db.query("modules").collect();
    for (const m of allModules) await ctx.db.delete(m._id);

    const allCourses = await ctx.db.query("courses").collect();
    for (const c of allCourses) await ctx.db.delete(c._id);

    /* =========================================
       COURSE 1: Web Foundations (HTML, CSS, Git)
    ========================================= */
    const course1Id = await ctx.db.insert("courses", {
      slug: "web-foundations",
      titleEn: "Zero to Hero: Web Foundations",
      titleAr: "من الصفر إلى الاحتراف: أساسيات الويب",
      descriptionEn: "Master the bedrock of the internet: HTML, CSS, and Git. No prior experience needed.",
      descriptionAr: "أتقن أساسيات الإنترنت: HTML و CSS و Git. لا حاجة لخبرة سابقة.",
      order: 1,
      isPublished: true,
      imageUrl: "/images/courses/foundations.jpg",
    });

    // --- Module 1: HTML ---
    const c1m1Id = await ctx.db.insert("modules", {
      courseId: course1Id,
      order: 1,
      titleEn: "HTML: The Structure",
      titleAr: "HTML: الهيكل",
      descriptionEn: "Learn correct semantic structure for web documents.",
      descriptionAr: "تعلم الهيكل الدلالي الصحيح لمستندات الويب.",
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m1Id,
      slug: "html-basics",
      order: 1,
      titleEn: "HTML Basics & Tags",
      titleAr: "أساسيات ووسوم HTML",
      contentEn: `
# HTML Basics & Tags

HTML (HyperText Markup Language) is the code that organizes your web content.

## Key Concepts
- **Tags**: The instructions (e.g., \`<p>\`, \`<h1>\`).
- **Elements**: The start tag, content, and end tag.
- **Attributes**: Extra info about elements (e.g., \`class="btn"\`).

\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
\`\`\`
`,
      contentAr: `
# أساسيات ووسوم HTML

HTML (لغة توصيف النص التشعبي) هي الكود الذي ينظم محتوى الويب الخاص بك.

## مفاهيم رئيسية
- **الوسوم**: التعليمات (مثل \`<p>\`, \`<h1>\`).
- **العناصر**: وسم البداية، المحتوى، ووسم النهاية.
- **السمات**: معلومات إضافية حول العناصر (مثل \`class="btn"\`).
`,
      estimatedMinutes: 15,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m1Id,
      slug: "semantic-html",
      order: 2,
      titleEn: "Semantic HTML",
      titleAr: "HTML الدلالي",
      contentEn: "Why use `<article>` instead of `<div>`? Accessibility and SEO.",
      contentAr: "لماذا نستخدم `<article>` بدلاً من `<div>`؟ إمكانية الوصول و SEO.",
      estimatedMinutes: 20,
      isPublished: true,
    });

    // --- Module 2: CSS ---
    const c1m2Id = await ctx.db.insert("modules", {
      courseId: course1Id,
      order: 2,
      titleEn: "CSS: The Style",
      titleAr: "CSS: التنسيق",
      descriptionEn: "Colors, layouts, and responsive design.",
      descriptionAr: "الألوان، التخطيطات، والتصميم المتجاوب.",
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m2Id,
      slug: "css-box-model",
      order: 1,
      titleEn: "The Box Model",
      titleAr: "نموذج الصندوق",
      contentEn: "Understanding margin, border, padding, and content.",
      contentAr: "فهم الهوامش، الحدود، الحشو، والمحتوى.",
      estimatedMinutes: 25,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m2Id,
      slug: "flexbox",
      order: 2,
      titleEn: "Modern Layouts: Flexbox",
      titleAr: "التخطيطات الحديثة: Flexbox",
      contentEn: "Mastering `display: flex`, `justify-content`, and `align-items`.",
      contentAr: "إتقان `display: flex` و `justify-content` و `align-items`.",
      estimatedMinutes: 30,
      isPublished: true,
    });

    // --- Module 3: Git ---
    const c1m3Id = await ctx.db.insert("modules", {
      courseId: course1Id,
      order: 3,
      titleEn: "Git & Version Control",
      titleAr: "Git والتحكم في النسخ",
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m3Id,
      slug: "git-basics",
      order: 1,
      titleEn: "Git Basics",
      titleAr: "أساسيات Git",
      contentEn: "Init, add, commit, push. The daily workflow.",
      contentAr: "Init, add, commit, push. سير العمل اليومي.",
      estimatedMinutes: 20,
      isPublished: true,
    });

    /* =========================================
       COURSE 2: JavaScript & TypeScript
    ========================================= */
    const course2Id = await ctx.db.insert("courses", {
      slug: "js-ts-mastery",
      titleEn: "JavaScript & TypeScript Mastery",
      titleAr: "احتراف JavaScript و TypeScript",
      descriptionEn: "Deep dive into the logic that powers the modern web.",
      descriptionAr: "غوص عميق في المنطق الذي يشغل الويب الحديث.",
      order: 2,
      isPublished: true,
      imageUrl: "/images/courses/js-ts.jpg",
    });

    // --- Module 1: JS Basics ---
    const c2m1Id = await ctx.db.insert("modules", {
      courseId: course2Id,
      order: 1,
      titleEn: "JavaScript Fundamentals",
      titleAr: "أساسيات JavaScript",
    });

    await ctx.db.insert("lessons", {
      moduleId: c2m1Id,
      slug: "variables-types",
      order: 1,
      titleEn: "Variables & Data Types",
      titleAr: "المتغيرات وأنواع البيانات",
      contentEn: "Let, const, strings, numbers, and booleans.",
      contentAr: "Let, const, السلاسل النصية، الأرقام، والقيم المنطقية.",
      estimatedMinutes: 20,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c2m1Id,
      slug: "functions-scope",
      order: 2,
      titleEn: "Functions & Scope",
      titleAr: "الدوال والمدى",
      contentEn: "Arrow functions, closures, and `this`.",
      contentAr: "الدوال السهمية، الإغلاق (Closures)، و `this`.",
      estimatedMinutes: 30,
      isPublished: true,
    });

    // --- Module 2: TypeScript ---
    const c2m2Id = await ctx.db.insert("modules", {
      courseId: course2Id,
      order: 2,
      titleEn: "TypeScript Essentials",
      titleAr: "أساسيات TypeScript",
    });

    await ctx.db.insert("lessons", {
      moduleId: c2m2Id,
      slug: "why-typescript",
      order: 1,
      titleEn: "Why TypeScript?",
      titleAr: "لماذا TypeScript؟",
      contentEn: "Static typing vs dynamic typing. The benefits of safety.",
      contentAr: "الأنواع الثابتة مقابل الديناميكية. فوائد الأمان.",
      estimatedMinutes: 15,
      isPublished: true,
    });

    /* =========================================
       COURSE 3: Modern Fullstack (T3 Stack)
    ========================================= */
    const course3Id = await ctx.db.insert("courses", {
      slug: "t3-fullstack",
      titleEn: "Modern Fullstack with T3 Stack",
      titleAr: "التطوير المتكامل الحديث مع T3 Stack",
      descriptionEn: "Build production-ready apps with Next.js, tRPC, Prisma, and Tailwind CSS.",
      descriptionAr: "ابنِ تطبيقات جاهزة للإنتاج باستخدام Next.js و tRPC و Prisma و Tailwind CSS.",
      order: 3,
      isPublished: true,
      imageUrl: "/images/courses/t3.jpg",
    });

    // --- Module 1: React & Next.js ---
    const c3m1Id = await ctx.db.insert("modules", {
      courseId: course3Id,
      order: 1,
      titleEn: "React & Next.js 15",
      titleAr: "React و Next.js 15",
    });

    await ctx.db.insert("lessons", {
      moduleId: c3m1Id,
      slug: "react-hooks",
      order: 1,
      titleEn: "Essential React Hooks",
      titleAr: "خطافات React الأساسية",
      contentEn: "useState, useEffect, useMemo. Managing state and side effects.",
      contentAr: "useState, useEffect, useMemo. إدارة الحالة والآثار الجانبية.",
      estimatedMinutes: 30,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c3m1Id,
      slug: "server-components",
      order: 2,
      titleEn: "RSC & Server Actions",
      titleAr: "مكونات الخادم وإجراءات الخادم",
      contentEn: "The new paradigm of fetching data directly on the server.",
      contentAr: "النموذج الجديد لجلب البيانات مباشرة على الخادم.",
      estimatedMinutes: 40,
      isPublished: true,
    });

    // --- Module 2: The T3 Backend ---
    const c3m2Id = await ctx.db.insert("modules", {
      courseId: course3Id,
      order: 2,
      titleEn: "The T3 Backend",
      titleAr: "الخلفية البرمجية T3",
    });

    await ctx.db.insert("lessons", {
      moduleId: c3m2Id,
      slug: "trpc-setup",
      order: 1,
      titleEn: "End-to-end Typesafety with tRPC",
      titleAr: "أمان الأنواع الشامل مع tRPC",
      contentEn: "Calling backend functions like looking local.",
      contentAr: "استدعاء وظائف الخلفية كما لو كانت محلية.",
      estimatedMinutes: 35,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c3m2Id,
      slug: "prisma-db",
      order: 2,
      titleEn: "Database Access with Prisma",
      titleAr: "الوصول لقاعدة البيانات مع Prisma",
      contentEn: "Defining schema.prisma and querying your database.",
      contentAr: "تعريف schema.prisma والاستعلام في قاعدة بياناتك.",
      estimatedMinutes: 30,
      isPublished: true,
    });

    return "Database seeded successfully with full curriculum!";
  },
});
