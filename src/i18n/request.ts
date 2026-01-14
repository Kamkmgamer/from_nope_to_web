import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requestedLocale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  const locale = 
    requestedLocale && routing.locales.includes(requestedLocale as "en" | "ar")
      ? requestedLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`) as { default: Record<string, unknown> }).default,
  };
});
