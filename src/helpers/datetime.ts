import { TimeUnit } from "@/constants/datetime";
import type { SupportedLocale } from "@assemblyvoting/types";

const humanizeDate = (
  date: Date,
  locale: SupportedLocale = "en",
  style: "narrow" | "short" | "long" = "short",
): string => {
  const rawSeconds = Math.round((date.getTime() - Date.now()) / TimeUnit.msPerSecond);
  const seconds =
    Math.abs(rawSeconds) < TimeUnit.minute
      ? Math.sign(rawSeconds) * TimeUnit.minute || -TimeUnit.minute
      : rawSeconds;

  const cutoffs: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [TimeUnit.minute, "second"],
    [TimeUnit.hour, "minute"],
    [TimeUnit.day, "hour"],
    [TimeUnit.day * TimeUnit.daysPerWeek, "day"],
    [TimeUnit.day * TimeUnit.daysPerMonth, "week"],
    [TimeUnit.day * TimeUnit.daysPerYear, "month"],
    [Infinity, "year"],
  ];

  const divisors: Array<number> = [
    TimeUnit.second,
    TimeUnit.minute,
    TimeUnit.hour,
    TimeUnit.day,
    TimeUnit.day * TimeUnit.daysPerWeek,
    TimeUnit.day * TimeUnit.daysPerMonth,
    TimeUnit.day * TimeUnit.daysPerYear,
  ];

  const defaultDivisor = 1;
  const index = cutoffs.findIndex(([cutoff]) => Math.abs(seconds) < cutoff);
  const value = Math.round(seconds / (divisors[index] ?? defaultDivisor));

  return new Intl.RelativeTimeFormat(locale, { numeric: "auto", style }).format(
    value,
    cutoffs[index]?.[1] ?? "year",
  );
};

export { humanizeDate };
