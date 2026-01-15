# المصادقة: BetterAuth & NextAuth

المصادقة (Authentication) هي التحقق من **من** هو المستخدم. التفويض (Authorization) هو التحقق من **ماذا** يمكنه أن يفعل.

في T3، لا نبني نماذج تسجيل الدخول من الصفر. نستخدم مكتبات.

## الخيار أ: Auth.js (NextAuth)

المعيار لتطبيقات Next.js.

### الميزات

- **OAuth**: تسجيل الدخول بـ Google, GitHub, Discord بسهولة.
- **إدارة الجلسات**: يدير ملفات الارتباط (Cookies) والأمان تلقائياً.

### الاستخدام

في `src/server/auth.ts`:

```ts
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};
```

في مكونك:

```tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>مرحباً، {session.user.name}</p>
        <button onClick={() => signOut()}>تسجيل خروج</button>
      </div>
    );
  }
  return <button onClick={() => signIn()}>تسجيل دخول</button>;
}
```

## الخيار ب: BetterAuth

بديل أحدث وأكثر مرونة.

### لماذا BetterAuth؟

- **تحكم أكثر**: أسهل لتخصيص مخطط قاعدة البيانات.
- **أمان النوع**: تكامل أفضل حتى مع TypeScript.
- **بريد/كلمة مرور**: أسهل لإعداد تدفقات البريد/كلمة المرور المخصصة (التي لا تشجع عليها NextAuth).

### التسلسل المفاهيمي

1. المستخدم يضغط "دخول باستخدام Google".
2. التطبيق يحولك إلى Google.
3. المستخدم يوافق.
4. Google ترسل كود سري لتطبيقك.
5. التطبيق يتحقق من الكود وينشئ **جلسة** (Session Cookie).
6. المستخدم يقدم هذا الـ Cookie في كل طلب ليثبت هويته.

## قاعدة أمنية

**لا** تخزن كلمات المرور كنص عادي أبداً. دع المكتبات تتعامل مع التشفير دائماً.
