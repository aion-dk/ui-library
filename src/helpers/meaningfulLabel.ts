import type { LocalString, LookUpMethod } from "@/types";
import { LOOKUP_DEFAULT_FALLBACKS } from "@/constants";

const getFirstLocalizedValue = (source?: LocalString): string | null => {
  if (!source) return null;
  const [firstLocale] = Object.keys(source) as Array<keyof typeof source>;
  return firstLocale ? (source[firstLocale] ?? null) : null;
};

const getMeaningfulLabel: LookUpMethod = (
  object,
  locale,
  humanName = "Item",
  fallbacks = LOOKUP_DEFAULT_FALLBACKS,
) => {
  const fallbackResolvers: Record<string, () => string | null> = {
    title: () => object.title?.[locale] ?? null,
    label: () => object.label?.[locale] ?? null,
    group: () => object.group?.[locale] ?? getFirstLocalizedValue(object.group),
    first_available_locale: () =>
      getFirstLocalizedValue(object.title) ?? getFirstLocalizedValue(object.label),
    reference: () => object.reference || null,
    internal_name: () => object.internal_name || null,
    attribute_name: () => object.attribute_name || null,
    name: () => object.name || null,
    id: () => (object.id ? `${humanName} #${object.id}` : null),
  };

  for (const fallback of fallbacks) {
    const result = fallbackResolvers[fallback]?.() ?? null;
    if (result !== null) return result;
  }

  return "";
};

export { getMeaningfulLabel };
