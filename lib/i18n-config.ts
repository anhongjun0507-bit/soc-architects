export const locales = ["ko", "ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
