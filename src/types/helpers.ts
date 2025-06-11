import type { LocalString, SupportedLocale } from "@/types";
import type { LOOKUP_DEFAULT_FALLBACKS } from "@/constants";

type LookUpFallback = (typeof LOOKUP_DEFAULT_FALLBACKS)[number];

interface IterableObject {
  title?: LocalString;
  label?: LocalString;
  group?: LocalString;
  reference?: string;
  internal_name?: string;
  attribute_name?: string;
  id?: number;
  [key: string]: unknown;
}

type LookUpMethod = (
  object: IterableObject,
  locale: SupportedLocale,
  humanName?: string,
  fallbacks?: Array<LookUpFallback>,
) => string;

export type { IterableObject, LookUpMethod, LookUpFallback };
