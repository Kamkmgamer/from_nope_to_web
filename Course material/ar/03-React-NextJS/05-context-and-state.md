# السياق والحالة العالمية (Context & Global State)

حتى الآن، قمنا بتمرير البيانات من الأب إلى الابن باستخدام **props**. ولكن ماذا لو كنت بحاجة لتمرير بيانات إلى مكون بعمق 10 مستويات؟ أو ماذا لو كان _كل_ مكون يحتاج لمعرفة ما إذا كان المستخدم قد سجل دخوله؟

تمرير الخصائص طبقة تلو الأخرى يسمى **حفر الخصائص (Prop Drilling)**، ويصبح مزعجاً بسرعة.

الحل هو **السياق (Context)**.

## ما هو Context؟

فكر في Context مثل "دائرة الانتقال الآني". تضع البيانات في قمة تطبيقك، ويمكن لأي مكون بداخلها الحصول عليها دون تمريرها عبر الآباء.

## الخطوة 1: إنشاء السياق

```jsx
import { createContext } from "react";

// إنشاء السياق
export const ThemeContext = createContext("light"); // 'light' هو الافتراضي
```

## الخطوة 2: توفير البيانات

قم بتغليف تطبيقك (أو جزء منه) بداخل الـ Provider.

```jsx
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // نحن "نوفر" (Providing) قيمة السمة لكل شخص بداخلها
    <ThemeContext.Provider value={theme}>
      <Navbar />
      <MainContent />
    </ThemeContext.Provider>
  );
}
```

## الخطوة 3: استهلاك البيانات

يمكن لأي مكون داخل Provider الآن "الارتباط" بالبيانات.

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  // احصل على البيانات مباشرة!
  const theme = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === "dark" ? "black" : "white" }}>
      أنا شريط تنقل {theme}
    </nav>
  );
}
```

## متى تستخدم Context؟

- **مصادقة المستخدم**: هل المستخدم مسجل دخوله؟ من هم؟
- **السمة (Theme)**: الوضع المظلم أو الفاتح؟
- **اللغة**: الإنجليزية أم العربية؟
- **الإعدادات العامة**: الصوت، الإشعارات، إلخ.

**لا تفرط في استخدامه!** للتواصل البسيط بين الأب والابن، لا تزال Props أفضل لأنها تجعل المكونات أسهل في إعادة الاستخدام.

## تمرين

1. أنشئ `UserContext` يحمل اسم مستخدم.
2. غلف تطبيقك بـ Provider.
3. أنشئ مكون `Profile` عميقاً في شجرتك يعرض "مرحباً، [اسم المستخدم]".
