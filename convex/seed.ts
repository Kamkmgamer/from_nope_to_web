import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. CLEANUP
    const allLessons = await ctx.db.query("lessons").collect();
    for (const l of allLessons) await ctx.db.delete(l._id);

    const allModules = await ctx.db.query("modules").collect();
    for (const m of allModules) await ctx.db.delete(m._id);

    const allCourses = await ctx.db.query("courses").collect();
    for (const c of allCourses) await ctx.db.delete(c._id);

    /* =========================================
       COURSE 1: WEB FOUNDATIONS
    ========================================= */
    const course1Id = await ctx.db.insert("courses", {
      slug: "web-foundations",
      titleEn: "Web Foundations: HTML & CSS",
      titleAr: "أساسيات الويب: HTML و CSS",
      descriptionEn: "Your first step into web development. Master the structure and style of the internet.",
      descriptionAr: "خطوتك الأولى في تطوير الويب. أتقن هيكل وتنسيق الإنترنت.",
      order: 1,
      isPublished: true,
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    });

    // --- C1 Module 1: HTML ---
    const c1m1Id = await ctx.db.insert("modules", {
      courseId: course1Id,
      order: 1,
      titleEn: "HTML: Structuring the Web",
      titleAr: "HTML: هيكلة الويب",
      descriptionEn: "Learn to speak the language of the browser.",
      descriptionAr: "تعلم التحدث بلغة المتصفح.",
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m1Id,
      slug: "how-web-works",
      order: 1,
      titleEn: "How the Web Works",
      titleAr: "كيف يعمل الويب",
      contentEn: `
# How the Web Works

Before writing code, we must understand the ecosystem.

## Client vs. Server
- **Client**: Your browser (Chrome, Firefox). It *requests* information.
- **Server**: A computer far away that *serves* the website files.

## The Request-Response Cycle
1. You type \`google.com\`.
2. Browser sends a **GET** request.
3. Server receives it and sends back HTML code.
4. Browser renders that code into pixels.

\`\`\`
Client -> Request -> Server
Client <- Response <- Server
\`\`\`
`,
      contentAr: `
# كيف يعمل الويب

قبل كتابة الكود، يجب أن نفهم النظام البيئي.

## العميل مقابل الخادم
- **العميل (Client)**: متصفحك (Chrome, Firefox). هو الذي *يطلب* المعلومات.
- **الخادم (Server)**: كمبيوتر بعيد *يخدم* ملفات الموقع.

## دورة الطلب والاستجابة
1. تكتب \`google.com\`.
2. يرسل المتصفح طلب **GET**.
3. يستقبل الخادم الطلب ويرسل كود HTML.
4. يقوم المتصفح بتحويل الكود إلى صورة مرئية.
`,
      estimatedMinutes: 10,
      isPublished: true,
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m1Id,
      slug: "html-syntax",
      order: 2,
      titleEn: "HTML Syntax & Tags",
      titleAr: "بناء جملة HTML والوسوم",
      contentEn: `
# HTML Syntax

HTML is made of **elements**. An element usually has an opening tag, content, and a closing tag.

\`\`\`html
<tagname>Content goes here...</tagname>
\`\`\`

## Common Tags
- \`<h1>\` to \`<h6>\`: Headings
- \`<p>\`: Paragraph
- \`<button>\`: Clickable button

## Attributes
Tags can have **attributes** to provide more info.

\`\`\`html
<a href="https://google.com">Click me</a>
\`\`\`
- \`href\` is the attribute name.
- \`"https://google.com"\` is the value.
`,
      contentAr: `
# بناء جملة HTML

يتكون HTML من **عناصر**. عادة ما يحتوي العنصر على وسم بداية، محتوى، ووسم نهاية.

\`\`\`html
<اسم_الوسم>المحتوى هنا...</اسم_الوسم>
\`\`\`

## وسوم شائعة
- \`<h1>\` إلى \`<h6>\`: تعني العناوين
- \`<p>\`: فقرة نصية
- \`<button>\`: زر قابل للنقر

## السمات (Attributes)
يمكن أن تحتوي الوسوم على **سمات** لتوفير معلومات إضافية.

\`\`\`html
<a href="https://google.com">اضغط هنا</a>
\`\`\`
- \`href\` هو اسم السمة.
`,
      estimatedMinutes: 20,
      isPublished: true,
    });

    // --- C1 Module 2: CSS ---
    const c1m2Id = await ctx.db.insert("modules", {
      courseId: course1Id,
      order: 2,
      titleEn: "CSS: Styling the Web",
      titleAr: "CSS: تنسيق الويب",
      descriptionEn: "Make it beautiful with colors, fonts, and layouts.",
      descriptionAr: "اجعلها جميلة بالألوان والخطوط والتخطيطات.",
    });

    await ctx.db.insert("lessons", {
      moduleId: c1m2Id,
      slug: "css-selectors",
      order: 1,
      titleEn: "CSS Selectors",
      titleAr: "محددات CSS",
      contentEn: `
# CSS Selectors

To style HTML, you must first **select** it.

## 1. Element Selector
Targets all elements of a type.
\`\`\`css
p {
  color: red;
}
\`\`\`

## 2. Class Selector (.)
Targets elements with a specific \`class\` attribute. **Reusable.**
\`\`\`html
<p class="error">Alert!</p>
\`\`\`
\`\`\`css
.error {
  color: red;
  font-weight: bold;
}
\`\`\`

## 3. ID Selector (#)
Targets a ONE specific element.
\`\`\`html
<div id="navbar">...</div>
\`\`\`
\`\`\`css
#navbar {
  background: black;
}
\`\`\`
`,
      contentAr: `
# محددات CSS (Selectors)

لتنسيق HTML، يجب أولاً **تحديده**.

## 1. محدد العنصر
يستهدف جميع العناصر من نوع معين.
\`\`\`css
p {
  color: red;
}
\`\`\`

## 2. محدد الفئة (Class Selector .)
يستهدف العناصر التي لها سمة \`class\` معينة. **قابل لإعادة الاستخدام.**

## 3. محدد المعرف (ID Selector #)
يستهدف عنصراً واحداً محدداً فقط.
`,
      estimatedMinutes: 25,
      isPublished: true,
    });

     await ctx.db.insert("lessons", {
      moduleId: c1m2Id,
      slug: "box-model",
      order: 2,
      titleEn: "The Box Model",
      titleAr: "نموذج الصندوق",
      contentEn: `
# The Box Model

Every element in HTML is a box.

![Box Model Diagram](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model/boxmodel-(1).png)

## Layers
1. **Content**: The text or image itself.
2. **Padding**: Space *inside* the border, around the content.
3. **Border**: The line around the padding.
4. **Margin**: Space *outside* the border, separating it from neighbors.

\`\`\`css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
}
\`\`\`
`,
      contentAr: `
# نموذج الصندوق (Box Model)

كل عنصر في HTML هو عبارة عن صندوق.

## الطبقات
1. **المحتوى (Content)**: النص أو الصورة نفسها.
2. **الحشو (Padding)**: المسافة *داخل* الحدود، حول المحتوى.
3. **الحدود (Border)**: الخط المحيط بالحشو.
4. **الهوامش (Margin)**: المسافة *خارج* الحدود.
`,
      estimatedMinutes: 30,
      isPublished: true,
    });


    /* =========================================
       COURSE 2: JAVASCRIPT MASTERY
    ========================================= */
    const course2Id = await ctx.db.insert("courses", {
      slug: "javascript-mastery",
      titleEn: "JavaScript: The Programming Language",
      titleAr: "JavaScript: لغة البرمجة",
      descriptionEn: "Learn the logic needed to build interactive applications.",
      descriptionAr: "تعلم المنطق اللازم لبناء تطبيقات تفاعلية.",
      order: 2,
      isPublished: true,
      imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
    });

    const c2m1Id = await ctx.db.insert("modules", {
      courseId: course2Id,
      order: 1,
      titleEn: "JS Primitives",
      titleAr: "أساسيات JS",
      descriptionEn: "Variables, Types, and Loops",
      descriptionAr: "المتغيرات والأنواع والحلقات",
    });

    await ctx.db.insert("lessons", {
      moduleId: c2m1Id,
      slug: "variables",
      order: 1,
      titleEn: "Variables: let vs const",
      titleAr: "المتغيرات: let مقابل const",
      contentEn: `
# Variables

Variables store data.

## \`let\`
Use when the value *will change*.
\`\`\`js
let score = 0;
score = 10; // OK
\`\`\`

## \`const\`
Use when the value *will not change*.
\`\`\`js
const pi = 3.14;
pi = 5; // ERROR!
\`\`\`

## Avoid \`var\`
Old JavaScript used \`var\`. It has confusing scoping rules. stick to \`let\` and \`const\`.
`,
      contentAr: `
# المتغيرات

المتغيرات تخزن البيانات.

## \`let\`
استخدمها عندما تكون القيمة *ستتغير*.

## \`const\`
استخدمها عندما تكون القيمة *لن تتغير*.

## تجنب \`var\`
JavaScript القديمة كانت تستخدم \`var\`. لها قواعد نطاق مربكة. التزم بـ \`let\` و \`const\`.
`,
      estimatedMinutes: 20,
      isPublished: true,
    });


    /* =========================================
       COURSE 3: REACT & NEXT.JS
    ========================================= */
    const course3Id = await ctx.db.insert("courses", {
      slug: "react-nextjs",
      titleEn: "Modern React & Next.js",
      titleAr: "React و Next.js الحديثة",
      descriptionEn: "Build full-stack applications with the world's most popular framework.",
      descriptionAr: "ابنِ تطبيقات متكاملة مع الإطار الأكثر شهرة في العالم.",
      order: 3,
      isPublished: true,
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    });

    const c3m1Id = await ctx.db.insert("modules", {
      courseId: course3Id,
      order: 1,
      titleEn: "React Core",
      titleAr: "جوهر React",
    });

    await ctx.db.insert("lessons", {
      moduleId: c3m1Id,
      slug: "components-props",
      order: 1,
      titleEn: "Components & Props",
      titleAr: "المكونات والخصائص",
      contentEn: `
# Components

React apps are made of small, reusable chunks called **Components**.

\`\`\`jsx
function Button() {
  return <button>Click me</button>;
}
\`\`\`

# Props

Pass data into components like function arguments.

\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Alice" />
\`\`\`
`,
      contentAr: `
# المكونات (Components)

تطبيقات React تتكون من أجزاء صغيرة قابلة لإعادة الاستخدام تسمى **المكونات**.

# الخصائص (Props)

تمرير البيانات إلى المكونات مثل وسائط الدوال.
`,
      estimatedMinutes: 30,
      isPublished: true,
    });

     await ctx.db.insert("lessons", {
      moduleId: c3m1Id,
      slug: "use-state",
      order: 2,
      titleEn: "State with useState",
      titleAr: "الحالة مع useState",
      contentEn: `
# Intepactivity with State

Standard variables don't update the screen when they change. **State** does.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

1. \`useState(0)\`: Initial value.
2. \`count\`: Current value.
3. \`setCount\`: Function to update value AND trigger re-render.
`,
      contentAr: `
# التفاعلية مع الحالة (State)

المتغيرات العادية لا تحدث الشاشة عند تغيرها. **State** تفعل ذلك.

1. \`useState(0)\`: القيمة المبدئية.
2. \`count\`: القيمة الحالية.
3. \`setCount\`: دالة لتحديث القيمة وإعادة رسم المكون.
`,
      estimatedMinutes: 35,
      isPublished: true,
    });

    return "Database seeded with RICH content successfully!";
  },
});
