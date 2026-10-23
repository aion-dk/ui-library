import { describe, it, expect } from "vitest";
import { getOptions } from "@/examples";
import type { OptionContent } from "@/types";

import { search } from "./ballotSearcher";

const options = getOptions(["selectable"], 3);
const byEnglishTitle = (option: OptionContent): string => option.title.en ?? "";

describe("ballotSearcher", () => {
  it("matches every query token against partial title tokens, case-insensitively", () => {
    expect(
      search(options, "  EXAMPLE   opt 2 ", byEnglishTitle).map((o) => o.reference),
    ).to.deep.eq(["exampleOption2"]);
  });

  it("returns every item when all of them match", () => {
    expect(search(options, "example", byEnglishTitle)).to.have.length(3);
  });

  it("returns nothing when a token does not match", () => {
    expect(search(options, "example nope", byEnglishTitle)).to.deep.eq([]);
  });

  it("throws when search_by is not a function", () => {
    expect(() =>
      search(options, "example", "title" as unknown as (option: OptionContent) => string),
    ).to.throw("search_by must be a function that returns a string");
  });
});
