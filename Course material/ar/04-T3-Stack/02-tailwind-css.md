# Tailwind CSS

CSS القياسي صعب الصيانة. عليك التفكير في أسماء الفئات (`.sidebar-wrapper-left`) والقفز بين الملفات.

**Tailwind** تعطيك فئات جاهزة مسبقاً. أنت تنسق مباشرة في الـ HTML الخاص بك.

## التركيب الأساسي

| CSS القياسي                | فئة Tailwind |
| :------------------------- | :----------- |
| `color: white;`            | `text-white` |
| `background-color: black;` | `bg-black`   |
| `padding: 1rem;`           | `p-4`        |
| `border-radius: 0.25rem;`  | `rounded`    |
| `font-weight: 700;`        | `font-bold`  |

## مثال

**الطريقة القديمة (CSS):**

```css
/* style.css */
.btn {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

```jsx
<button className="btn">اضغطني</button>
```

**طريقة Tailwind:**

```jsx
<button className="rounded bg-blue-500 px-5 py-2 text-white">اضغطني</button>
```

## التصميم المتجاوب

Tailwind تجعل التصميم "للجوال أولاً" سهلاً. استخدم بادئات مثل `md:` (للشاشات المتوسطة) أو `lg:` (للشاشات الكبيرة).

```jsx
<div className="bg-red-500 md:bg-blue-500 lg:bg-green-500">
  أنا أغير لوني بناءً على حجم الشاشة!
</div>
```

- **الافتراضي**: أحمر (جوال)
- **md**: أزرق (تابلت)
- **lg**: أخضر (لابتوب)

## حالات التحويم (Hover)

فقط استخدم البادئة `hover:`.

```jsx
<button className="bg-blue-500 text-white hover:bg-blue-700">حوم فوقي</button>
```

## لماذا هي ممتازة لـ T3

1. **السرعة**: لا حاجة لتبديل السياق بين الملفات.
2. **الاتساق**: لا يمكنك استخدام درجة أزرق "خاطئة قليلاً". لديك فقط `blue-500`, `blue-600`، إلخ.
3. **ملفات صغيرة**: Tailwind تحذف التنسيقات غير المستخدمة تلقائياً.
