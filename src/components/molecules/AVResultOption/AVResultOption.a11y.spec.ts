import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption } from "@/examples";
import AVResultOption from "@/components/molecules/AVResultOption/AVResultOption.vue";

describe("AVResultOption accessibility", () => {
  const mountResultOption = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVResultOption, {
      props: {
        option: getOption(["selectable"], 1),
        votes: 1,
        total: 2,
        locale: "en",
        ...props,
      },
    });

  it("has no violations in default state", async () => {
    const result = await mountResultOption();
    expect(result).toHaveNoViolations();
  });

  it("has no violations as winner", async () => {
    const result = await mountResultOption({ votes: 2, total: 2 });
    expect(result).toHaveNoViolations();
  });
});
