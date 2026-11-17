import { describe, it, expect } from "vitest";

// Every component resolves its locale through `useLocalization`, where the
// `locale` prop has the highest precedence. A concrete default such as
// `default: "en"` therefore pins the component to that language and silently
// ignores its AV ancestor, the host app and Storybook's locale toolbar. The prop
// must default to `null` so resolution can fall through.
const sources = import.meta.glob<string>("../components/**/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
});

const LOCALE_PROP = /^\s{2}locale:\s*\{[^}]*?default:\s*([^,\n]+)/m;

describe("locale prop defaults", () => {
  const entries = Object.entries(sources).filter(([, source]) => LOCALE_PROP.test(source));

  it("finds the components that take a locale prop", () => {
    expect(entries.length).to.be.greaterThan(0);
  });

  it.each(entries)("%s defaults `locale` to null", (_path, source) => {
    expect(source.match(LOCALE_PROP)?.[1].trim()).to.eq("null");
  });
});
