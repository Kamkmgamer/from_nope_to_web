// Root layout - minimal pass-through for Next.js
// The actual layout with i18n, fonts, and providers is in [locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
