import type { LookUpFallback, LookUpMethod } from "@/types";
import { LOOKUP_DEFAULT_FALLBACKS } from "@/constants";

const getMeaningfulLabel: LookUpMethod = (
  object,
  locale,
  humanName = "Item",
  fallbacks = LOOKUP_DEFAULT_FALLBACKS,
) => {
  let result: string | null = null;
  fallbacks.forEach((fallback: LookUpFallback) => {
    if (result === null) {
      switch (true) {
        case fallback === "title":
          result = object.title?.[locale] ?? null;
          break;
        case fallback === "label":
          result = object.label?.[locale] ?? null;
          break;
        case fallback === "group":
          result = object.group?.[locale] ?? object.group?.[Object.keys(object.group)[0]] ?? null;
          break;
        case fallback === "first_available_locale":
          result =
            object.title?.[Object.keys(object.title)[0]] ??
            object.label?.[Object.keys(object.label)[0]] ??
            null;
          break;
        case fallback === "reference":
          result = object.reference || null;
          break;
        case fallback === "internal_name":
          result = object.internal_name || null;
          break;
        case fallback === "attribute_name":
          result = object.attribute_name || null;
          break;
        case fallback === "id" && Boolean(object.id):
          result = `${humanName} #${object.id}`;
          break;
      }
    }
  });

  if (result === null) result = "";

  return result;
};

export { getMeaningfulLabel };
