import type { LocalString } from "@/types";

export type ComponentTranslation = {
  [key: string]: LocalString;
};

export type ComponentTranslationList = {
  [componentName: string]: string;
};
