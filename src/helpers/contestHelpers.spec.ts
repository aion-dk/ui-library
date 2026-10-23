import { describe, it, expect } from "vitest";
import { getOptions } from "@/examples";
import type { OptionContent } from "@/types";

import { flattenOptions } from "./contestHelpers";

describe("flattenOptions", () => {
  it("flattens a tree depth-first, keeping each parent before its children", () => {
    const flat = flattenOptions(getOptions(["selectable", "children"], 2));

    expect(flat.map((o) => o.reference)).to.deep.eq([
      "exampleOption1",
      "exampleChildren1-1",
      "exampleChildren1-2",
      "exampleOption2",
      "exampleChildren2-1",
      "exampleChildren2-2",
    ]);
  });

  it("links children to a copy of their parent", () => {
    const [parent, child] = flattenOptions(getOptions(["selectable", "children"], 1));

    expect(parent.parentContent).to.be.undefined;
    expect(child.parentContent).to.deep.eq({
      reference: parent.reference,
      code: parent.code,
      title: parent.title,
      accentColor: parent.accentColor,
    });
    expect(child.parentContent!.title).to.not.eq(parent.title);
  });

  it("handles leaf options without a children array", () => {
    const leaves: OptionContent[] = getOptions(["selectable"], 2).map((option) => ({
      ...option,
      children: undefined,
    }));

    expect(flattenOptions(leaves).map((o) => o.reference)).to.deep.eq([
      "exampleOption1",
      "exampleOption2",
    ]);
  });
});
