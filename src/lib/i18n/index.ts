import { ja } from "./ja.ts";
import { en } from "./en.ts";

const translations = {
  ja,
  en,
};

export function t(
  key: string,
  locale: string,
): string {
  const keys = key.split(".");
  let value: unknown = translations[locale as keyof typeof translations];
  for (const k of keys) {
    value = (value as Record<string, unknown>)[k];
  }
  return value as string;
}

export {
  ja,
  en,
}