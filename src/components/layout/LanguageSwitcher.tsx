"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "~/i18n/navigation";
import { Button } from "~/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
    >
      <Languages className="size-3" />
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
