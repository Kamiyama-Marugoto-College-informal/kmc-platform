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
  let value: any = translations[locale];
  for (const k of keys) {
    value = value[k];
  }
  return value as string;
}

export {
  ja,
  en,
}