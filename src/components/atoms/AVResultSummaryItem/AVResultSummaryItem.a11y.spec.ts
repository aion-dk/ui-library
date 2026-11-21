import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem/AVResultSummaryItem.vue";

describe("AVResultSummaryItem accessibility", () => {
  it("has no violations in light theme", async () => {
    const result = await mountForA11y(AVResultSummaryItem, {
      props: { title: "Valid ballots", value: 50, reference: "valid", theme: "light" },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations in dark theme", async () => {
    const result = await mountForA11y(AVResultSummaryItem, {
      props: { title: "Valid ballots", value: 50, reference: "valid", theme: "dark" },
    });
    expect(result).toHaveNoViolations();
  });
});
