# tRPC: واجهات برمجة آمنة النوع (Type-Safe APIs)

هذه هي "الخلطة السرية" لحزمة T3.

تقليدياً، واجهتك الأمامية تستدعي رابط API:
`fetch('/api/users/1')` -- لكن، هل تعيد الـ API `name` أم `fullName`؟ عليك التخمين أو قراءة التوثيق.

مع **tRPC**، خلفيتك هي مجرد دالة تقوم باستيرادها.

## 1. الخلفية (Router)

عرف وظائفك في الخلفية.

```ts
// src/server/api/routers/user.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  // تعريف إجراء يسمى "greeting"
  greeting: publicProcedure
    .input(z.object({ name: z.string() })) // التحقق من أنواع المدخلات
    .query(({ input }) => {
      return {
        text: `مرحباً ${input.name}`,
      };
    }),
});
```

## 2. الواجهة الأمامية (Client)

استدعِ الدالة وكأنها مكتبة محلية.

```tsx
// src/app/page.tsx
import { api } from "@/trpc/react";

export default function Home() {
  // انظر! الإكمال التلقائي يعمل هنا.
  // إذا أخطأت في كتابة "greeting"، ستظهر خطوط حمراء.
  const hello = api.user.greeting.useQuery({ name: "Client" });

  if (!hello.data) return <div>جاري التحميل...</div>;

  return <div>{hello.data.text}</div>;
}
```

## لماذا هذا ثوري؟

1. **لا توثيق للـ API**: الكود هو التوثيق.
2. **إعادة الهيكلة آمنة**: أعد تسمية `greeting` إلى `hello` في الخلفية -> الواجهة الأمامية تصبح حمراء -> أنت تصلحها -> انتهى.
3. **التحقق من المدخلات**: يستخدم مكتبة `Zod` للتأكد من صحة البيانات عند باب الخادم.

## ملخص

تزيل tRPC الجدار بين كود الواجهة الأمامية والخلفية. تسمح لك بالتحرك بسرعة فائقة مع الثقة بأنك لم تكسر شيئاً.
