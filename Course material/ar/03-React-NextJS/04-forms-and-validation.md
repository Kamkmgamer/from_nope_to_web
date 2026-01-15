# النماذج والتحقق (Forms & Validation)

التعامل مع مدخلات المستخدم هو جزء أساسي من تطبيقات الويب. في هذا الدرس، سنتعلم كيفية إدارة النماذج في React.

## المكونات المنضبطة (Controlled Components)

في HTML، تحافظ عناصر النموذج مثل `<input>` على حالتها الخاصة. في React، نريد الاحتفاظ بهذه الحالة في مكوننا باستخدام `useState`. يسمى هذا **مكوناً منضبطاً**.

```jsx
import { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>
        الاسم:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <p>مرحباً، {name}!</p>
    </form>
  );
}
```

### لماذا نفعل هذا؟

1. **التحقق الفوري**: يمكنك التحقق من المدخلات _أثناء كتابة المستخدم_.
2. **التنسيق الشرطي**: تعطيل زر الإرسال إذا كان الإدخال فارغاً.
3. **مصدر واحد للحقيقة**: الحالة (`name`) هي المكان الوحيد الذي توجد فيه البيانات.

## التعامل مع إرسال النموذج

لا تريد أن يقوم المتصفح بتحديث الصفحة عند إرسال نموذج (السلوك الافتراضي لـ HTML). تريد التعامل معه باستخدام JavaScript.

```jsx
function SubmitForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // إيقاف تحديث الصفحة
    alert(`جاري الإرسال: ${email}`);
    // هنا تقوم بإرسال البيانات إلى الخادم
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">تسجيل</button>
    </form>
  );
}
```

## التحقق الأساسي

لنظهر خطأ إذا كانت كلمة المرور قصيرة جداً.

```jsx
function PasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      return; // توقف هنا!
    }
    setError(""); // مسح الخطأ إذا كان صحيحاً
    alert("كلمة المرور صالحة!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">تعيين كلمة المرور</button>
    </form>
  );
}
```

## تمرين

1. قم بإنشاء نموذج تسجيل دخول بـ `email` و `password`.
2. قم بتعطيل زر "دخول" إذا كان أي حقل فارغاً.
3. أظهر خطأ إذا كان البريد الإلكتروني لا يحتوي على علامة "@".
