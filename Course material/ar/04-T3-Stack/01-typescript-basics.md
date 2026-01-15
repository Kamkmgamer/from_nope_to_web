# أساسيات TypeScript

في JavaScript، يمكنك فعل هذا:

```js
let name = "Alice";
name = 42; // JS تقول: "بالتأكيد، لم لا؟"
```

هذا يسبب أخطاء برمجية (Bugs). **TypeScript** تمنعك:

```ts
let name: string = "Alice";
name = 42; // خطأ: النوع 'number' غير قابل للتعيين للنوع 'string'.
```

## الإعداد

ملفات TypeScript تنتهي بـ `.ts` أو `.tsx` (لـ React).

## الأنواع الأساسية

```ts
let name: string = "أحمد";
let age: number = 25;
let isStudent: boolean = true;
let skills: string[] = ["HTML", "CSS"]; // مصفوفة من السلاسل النصية
```

## الواجهات (Interfaces) - الجزء الأهم

الواجهات تعرف "شكل" الكائن.

```ts
interface User {
  id: number;
  username: string;
  email?: string; // علامة '?' تعني أنه اختياري
}

const user1: User = {
  id: 1,
  username: "coder123",
  // البريد اختياري، لذا يمكننا تجاوزه
};
```

## الدوال (Functions)

يجب عليك تعريف ما يدخل (Input) وما يخرج (Output).

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10); // صحيح
add("5", 10); // خطأ!
```

## الأنواع العامة (Generics) - متقدم

أحياناً تريد دالة تعمل مع _أي_ نوع، ولكن تظل آمنة.

```ts
function wrapInArray<T>(item: T): T[] {
  return [item];
}

const stringArray = wrapInArray("مرحبا"); // النوع هو string[]
const numberArray = wrapInArray(100); // النوع هو number[]
```

## لماذا تحب T3 الـ TypeScript

في T3، **قاعدة البيانات** تولد الأنواع.
إذا كان لدى قاعدة بياناتك جدول `User`، ستحصل تلقائياً على نوع `User` في واجهتك الأمامية. لن تضطر أبداً لكتابة الأنواع لبياناتك يدوياً!
