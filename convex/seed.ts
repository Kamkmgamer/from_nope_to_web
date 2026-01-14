import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingCourses = await ctx.db.query("courses").collect();
    if (existingCourses.length > 0) {
      console.log("Database already seeded");
      return "Database already seeded";
    }

    // 1. Create Foundational Course
    const courseId = await ctx.db.insert("courses", {
      slug: "web-development-foundations",
      titleEn: "Web Development Foundations",
      titleAr: "أساسيات تطوير الويب",
      descriptionEn:
        "Master the building blocks of the web: HTML, CSS, and JavaScript. The journey starts here.",
      descriptionAr:
        "أتقن اللبنات الأساسية للويب: HTML و CSS و JavaScript. الرحلة تبدأ هنا.",
      order: 1,
      isPublished: true,
      imageUrl: "/images/courses/foundations.jpg",
    });

    // Module 1: HTML
    const mod1Id = await ctx.db.insert("modules", {
      courseId,
      order: 1,
      titleEn: "HTML: The Skeleton",
      titleAr: "HTML: الهيكل العظمي",
      descriptionEn: "Learn how to structure content for the web.",
      descriptionAr: "تعلم كيفية هيكلة المحتوى للويب.",
    });

    await ctx.db.insert("lessons", {
      moduleId: mod1Id,
      slug: "intro-to-html",
      order: 1,
      titleEn: "Introduction to HTML",
      titleAr: "مقدمة في HTML",
      contentEn: `
# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.

## What you will learn
- The history of HTML
- Basic syntax and structure
- Common tags and elements
      `,
      contentAr: `
# مقدمة في HTML

HTML (لغة توصيف النص التشعبي) هي لغة التوصيف القياسية للمستندات المصممة للعرض في متصفح الويب.

## ما ستتعلمه
- تاريخ HTML
- البنية الأساسية والصياغة
- الوسوم والعناصر الشائعة
      `,
      estimatedMinutes: 15,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: mod1Id,
      slug: "semantic-html",
      order: 2,
      titleEn: "Semantic HTML",
      titleAr: "HTML الدلالي",
      contentEn: "Understanding why semantic tags matter for accessibility and SEO.",
      contentAr: "فهم أهمية الوسوم الدلالية لإمكانية الوصول وتحسين محركات البحث.",
      estimatedMinutes: 20,
      isPublished: true,
    });

    // Module 2: CSS
    const mod2Id = await ctx.db.insert("modules", {
      courseId,
      order: 2,
      titleEn: "CSS: The Style",
      titleAr: "CSS: التنسيق",
      descriptionEn: "Make it look beautiful.",
      descriptionAr: "اجعلها تبدو جميلة.",
    });

    await ctx.db.insert("lessons", {
      moduleId: mod2Id,
      slug: "intro-to-css",
      order: 1,
      titleEn: "Introduction to CSS",
      titleAr: "مقدمة في CSS",
      contentEn: "Cascading Style Sheets control the layout and appearance.",
      contentAr: "أوراق الأنماط المتتالية تتحكم في التخطيط والمظهر.",
      estimatedMinutes: 25,
      isPublished: true,
    });

    // 2. Create React Course
    const reactCourseId = await ctx.db.insert("courses", {
      slug: "react-mastery",
      titleEn: "React Mastery",
      titleAr: "إتقان React",
      descriptionEn:
        "Build dynamic, interactive user interfaces with the world's most popular library.",
      descriptionAr:
        "ابنِ واجهات مستخدم ديناميكية وتفاعلية باستخدام المكتبة الأكثر شعبية في العالم.",
      order: 2,
      isPublished: true,
      imageUrl: "/images/courses/react.jpg",
    });

    const reactMod1Id = await ctx.db.insert("modules", {
      courseId: reactCourseId,
      order: 1,
      titleEn: "Components & Props",
      titleAr: "المكونات والخصائص",
    });

    await ctx.db.insert("lessons", {
      moduleId: reactMod1Id,
      slug: "first-component",
      order: 1,
      titleEn: "Your First Component",
      titleAr: "مكونك الأول",
      contentEn: "Thinking in React means thinking in components.",
      contentAr: "التفكير بأسلوب React يعني التفكير بالمكونات.",
      estimatedMinutes: 30,
      isPublished: true,
    });

    return "Database seeded successfully!";
  },
});
