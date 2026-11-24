import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVTweenedCount from "@/components/atoms/AVTweenedCount/AVTweenedCount.vue";

describe("AVTweenedCount accessibility", () => {
  it("has no violations with a count", async () => {
    const result = await mountForA11y(AVTweenedCount, {
      props: { id: "a11y-tweened", count: 42, duration: 0.5, decimals: 0 },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations with decimals", async () => {
    const result = await mountForA11y(AVTweenedCount, {
      props: { id: "a11y-tweened-decimals", count: 42.5, duration: 0.5, decimals: 1 },
    });
    expect(result).toHaveNoViolations();
  });
});
