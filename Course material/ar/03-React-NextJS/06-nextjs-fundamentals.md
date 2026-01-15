# أساسيات Next.js

React هي مكتبة لبناء واجهات المستخدم. **Next.js** هو **إطار عمل** مبني فوق React. يضيف قوى خارقة تحتاجها لموقع حقيقي، مثل التوجيه (Routing)، وتحسين محركات البحث (SEO)، والتحميل السريع.

## 1. التوجيه المستند إلى الملفات (File-Based Routing)

في React القياسية، تحتاج لتثبيت مكتبة توجيه. في Next.js، **نظام الملفات هو الموجه**.

إذا أنشأت ملفاً في `src/app/about/page.tsx`، فإن الرابط هو `your-site.com/about`.

- `src/app/page.tsx` -> `/` (الرئيسية)
- `src/app/contact/page.tsx` -> `/contact`
- `src/app/blog/first-post/page.tsx` -> `/blog/first-post`

## 2. مكونات الخادم مقابل العميل (Server vs Client)

هذا هو التغيير الأكبر في Next.js الحديث.

### مكونات الخادم (الافتراضي)

- يتم رسمها (Render) على **الخادم**.
- ترسل HTML عادي للمتصفح.
- **الميزات**: سريعة، ممتازة لـ SEO، آمنة (يمكنها قراءة قاعدة البيانات مباشرة!).
- **العيوب**: لا يمكن استخدام `useState` أو `useEffect` أو `onClick`.

```tsx
// هذا مكون خادم. يمكنه الوصول لقاعدة البيانات!
export default async function Page() {
  const data = await db.query("SELECT * FROM users");
  return <div>{data.name}</div>;
}
```

### مكونات العميل (Client Components)

- يتم رسمها في المتصفح (مثل React العادية).
- يجب عليك إضافة `'use client'` في أعلى الملف تماماً.
- **الميزات**: تفاعلية! يمكن استخدام الحالة والتأثيرات.
- **العيوب**: تحميل أولي أبطأ.

```tsx
"use client"; // هذا السطر السحري يجعله مكون عميل

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 3. مكون Link

لا تستخدم أبداً وسوم `<a>` للروابط الداخلية! فهي تسبب تحديثاً كاملاً للصفحة. استخدم `<Link>` بدلاً من ذلك.

```tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">الرئيسية</Link>
      <Link href="/about">عنا</Link>
    </nav>
  );
}
```

## 4. التخطيطات (Layouts)

ملف `layout.tsx` يعرف واجهة المستخدم المشتركة عبر صفحات متعددة (مثل شريط تنقل أو تذييل). هو يغلف الصفحات بداخله.

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        {children} {/* هنا يذهب محتوى الصفحة */}
        <Footer />
      </body>
    </html>
  );
}
```

## تمرين

1. أنشئ هيكل تطبيق Next.js مبسط على حاسوبك (مجلدات فقط).
2. أنشئ صفحة "عنا".
3. قرر أي المكونات ستحتاج `'use client'` (مثلاً، زر إعجاب مقابل قارئ مقال مدونة).
