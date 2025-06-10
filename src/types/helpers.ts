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

type HexaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type HexaLetter = "A" | "B" | "C" | "D" | "E" | "F";
type HexaChar = HexaLetter | HexaNumber;
type Hexa3 = `${HexaChar}${HexaChar}`;
type HexaColor = `${Hexa3}${Hexa3}`;

export type { IterableObject, LookUpMethod, LookUpFallback, HexaColor };
