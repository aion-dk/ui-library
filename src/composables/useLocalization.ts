import { computed, inject, provide, unref, type ComputedRef } from "vue";
import localI18n from "@/i18n";
import type { SupportedLocale } from "@/types";

/**
 * Injection key used to hand the resolved locale down the component tree.
 *
 * A consumer only has to pass `locale` to the component it actually mounts
 * (AVSplitHelper, AVBallot, a summary, AVResourceSection, ...). Every component
 * re-provides the locale it resolved, so nested children inherit it without the
 * prop having to be forwarded by hand at every level — an unforwarded child can
 * no longer silently fall back to the host app's global locale and leave you
 * with a half-translated ballot.
 *
 * A plain string key (rather than a Symbol) mirrors the existing `"i18n"` DI
 * contract and survives a consumer ending up with two copies of the library.
 */
const AV_LOCALE = "avLocale";

const FALLBACK_LOCALE: SupportedLocale = "en";

const asLocale = (value: unknown): SupportedLocale | null =>
  typeof value === "string" && value !== "" ? (value as SupportedLocale) : null;

interface Localization {
  locale: ComputedRef<SupportedLocale>;
  t: (key: string, named?: Record<string, unknown>, plural?: number) => string;
  d: (value: Date | number | string, format?: string | null) => string;
}

/**
 * Single source of truth for which locale a component renders in, and for
 * translating in that locale.
 *
 * Precedence, highest first:
 *   1. the component's own `locale` prop
 *   2. the locale resolved by the nearest ancestor AV component
 *   3. the locale of the injected i18n instance (the host app's, or the
 *      library's own when running standalone)
 *   4. "en", if none of the above is a usable string
 *
 * Because the prop wins, a component's `locale` prop must default to `null`,
 * never to a concrete locale: `default: "en"` silently pins the component to
 * English and ignores both its AV ancestor and the host app (enforced by
 * `localePropDefaults.spec.ts`).
 *
 * This is necessary in order to support both a provided i18n and the local one.
 * `localI18n` is the `inject` default, so tests, Storybook and the playground —
 * which have no host app to provide an instance — keep working. That is what the
 * old "DO NOT REMOVE" block in every component was protecting; do not drop it.
 *
 * `t` and `d` pin the resolved locale explicitly rather than reading whatever
 * the injected instance's global locale currently is. Without that, `locale`
 * would translate domain content (option titles, descriptions) while the
 * library's own chrome — "Select one (1) option", the vote-weight line, aria
 * labels — stayed in the host app's language.
 *
 * @param localeProp getter for the component's `locale` prop, e.g. `() => props.locale`
 */
export const useLocalization = (
  localeProp: () => SupportedLocale | null = (): null => null,
): Localization => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const i18n: any = inject("i18n", localI18n);

  const inheritedLocale = inject<ComputedRef<SupportedLocale> | null>(AV_LOCALE, null);

  // `i18n.global.locale` is a ref on a Composer (legacy: false) and a plain
  // string on a legacy VueI18n instance — `unref` supports both.
  //
  // Every candidate must be a non-empty string: vue-i18n throws "cannot support
  // locale type" on anything else. The old `locale.value || locale` fallback
  // handed vue-i18n the Ref object itself whenever the instance's locale was
  // unset (e.g. Storybook's toolbar global arriving as `undefined`).
  const locale = computed<SupportedLocale>(
    () =>
      asLocale(localeProp()) ??
      asLocale(inheritedLocale?.value) ??
      asLocale(unref(i18n.global.locale)) ??
      FALLBACK_LOCALE,
  );

  provide(AV_LOCALE, locale);

  // Pass `plural` to pick a form from a "none | one | many" message; `{n}` is filled from it.
  const t = (key: string, named: Record<string, unknown> = {}, plural?: number): string =>
    typeof plural === "number"
      ? i18n.global.t(key, { n: plural, ...named }, { locale: locale.value, plural })
      : i18n.global.t(key, named, { locale: locale.value });

  const d = (value: Date | number | string, format: string | null = null): string =>
    i18n.global.d(value, format, locale.value);

  return { locale, t, d };
};
