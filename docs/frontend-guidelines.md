# Frontend Guidelines

## 1. Aesthetics & Design Philosophy

We are aiming for a **Productivity Premium** look. Think Linear, Vercel, or Raycast.

- **Colors:** Deep slates, vibrant accents (blue/purple gradients), and crisp whites/grays.
- **Borders:** Subtle, 1px borders with low opacity.
- **Shadows:** Soft, diffused shadows for depth; sharp shadows for popups.
- **Motion:** Everything should feel "alive". Use `framer-motion` for page transitions and micro-interactions.

## 2. Typography

- **English:** `Inter` (Variable). High legibility setup.
- **Arabic:** `IBM Plex Sans Arabic` or `Noto Sans Arabic`.
- **Scaling:** Use `rem` for font sizes.
- **Hierarchy:** H1 for main page titles, H2 for section headers. Ensure high contrast.

## 3. Component Architecture (Atomic)

Place components in `src/components`:

- `ui/`: Initialized shadcn/ui components (buttons, inputs).
- `shared/`: Reusable specific components (e.g., `LanguageSwitcher`, `ThemeToggle`).
- `features/[feature-name]/`: complex components tied to specific business logic (e.g. `features/dashboard/StatsCard.tsx`).
- `layout/`: `Header`, `Footer`, `Sidebar`.

## 4. Internationalization (RTL)

- **NEVER** use `left-...` or `right-...` (unless strictly visual and non-directional).
- **ALWAYS** use Logical Properties:
  - `ml-4` -> `ms-4` (margin-start).
  - `pr-2` -> `pe-2` (padding-end).
  - `text-left` -> `text-start`.
- Test every component in RTL mode immediately after creation.

## 5. State Management

- **URL State:** If it changes what the user _sees_ (filters, tabs), put it in the URL using `nuqs`.
- **Server State:** Use Convex's `useQuery` and `useMutation` hooks (real-time by default).
- **Client State:** React `useState` for transient UI states (is modal open?). Avoid global client stores (Zustand/Redux) unless absolutely necessary.

## 6. CSS / Tailwind

- Use the configuration in `tailwind.config.ts`.
- Avoid arbitrary values (`w-[123px]`). Use the theme scale (`w-32`).
- Group standard styles: `className="flex items-center justify-between gap-4"`.
