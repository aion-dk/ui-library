import type { OptionContent } from "@/types";

export function search(
  items: OptionContent[],
  query: string,
  search_by: (option: OptionContent) => string,
) {
  if (typeof search_by !== "function")
    throw new Error("search_by must be a function that returns a string");

  const query_tokens = query.toLowerCase().trim().split(/\s+/);

  return items.filter((item) => {
    const item_tokens = search_by(item).toLowerCase().trim().split(/\s+/);
    return query_tokens.every((qt) => item_tokens.some((it) => it.includes(qt)));
  });
}
