import { SUPPORTED_LOCALES } from "@/constants";

export type ComponentTranslationList = {
  [componentName: string]: string;
};

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
