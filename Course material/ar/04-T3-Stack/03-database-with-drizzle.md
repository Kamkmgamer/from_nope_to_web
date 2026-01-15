# قواعد البيانات مع Drizzle ORM

تحتاج التطبيقات لتخزين البيانات بشكل دائم. نستخدم **قاعدة بيانات** (مثل PostgreSQL أو SQLite) و **ORM** (مخطط الكائنات العلائقي) للتحدث إليها.

نوصي بـ **Drizzle ORM** لأنها سريعة، خفيفة، وآمنة برمجياً (Typesafe).

## 1. تعريف المخطط (Schema)

أنت تعرف جداول قاعدة بياناتك في TypeScript.

```ts
// src/db/schema.ts
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  isAdmin: boolean("is_admin").default(false),
});
```

## 2. استخدام قاعدة البيانات

الآن يمكنك قراءة وكتابة البيانات باستخدام كود TypeScript عادي.

### إدراج (Create/Insert)

```ts
await db.insert(users).values({
  name: "سارة",
  email: "sarah@example.com",
});
```

### تحديد (Read/Select)

```ts
const allUsers = await db.select().from(users);
// نوع النتيجة هو تلقائياً: { id: number, name: string... }[]
```

### شرط (Where)

```ts
import { eq } from "drizzle-orm";

const sarah = await db
  .select()
  .from(users)
  .where(eq(users.email, "sarah@example.com"));
```

## خطوات الإعداد داخل T3

1. **تثبيت**: `npm install drizzle-orm postgres`
2. **إعداد**: الاتصال برابط قاعدة البيانات (مقدم عادة من Neon أو Supabase).
3. **دفع**: شغل `npx drizzle-kit push` لإنشاء الجداول في قاعدة البيانات الحقيقية.

## لماذا Drizzle؟

- **إنها مجرد TypeScript**: إذا أخطأت في كتابة 'email' كـ 'emial'، لن يعمل الكود.
- **تشبه SQL**: تبدو مشابهة جداً لـ SQL الخام، لذا تتعلم مفاهيم قواعد البيانات أثناء استخدامها.
