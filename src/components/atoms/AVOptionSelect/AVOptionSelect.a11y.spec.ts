import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVOptionSelect from "@/components/atoms/AVOptionSelect/AVOptionSelect.vue";

describe("AVOptionSelect accessibility", () => {
  it("has no violations when checked with a rank", async () => {
    const result = await mountForA11y(AVOptionSelect, {
      props: {
        checked: true,
        rank: 1,
        locale: "en",
      },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when checked without a rank", async () => {
    const result = await mountForA11y(AVOptionSelect, {
      props: {
        checked: true,
        locale: "en",
      },
    });
    expect(result).toHaveNoViolations();
  });
});
