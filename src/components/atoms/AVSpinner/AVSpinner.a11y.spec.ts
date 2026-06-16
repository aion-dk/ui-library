import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVSpinner from "@/components/atoms/AVSpinner/AVSpinner.vue";

describe("AVSpinner accessibility", () => {
  it("has no violations in border variant", async () => {
    const result = await mountForA11y(AVSpinner, {
      props: { variant: "spinner-border", size: "sm", color: "primary", locale: "en" },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations in grow variant", async () => {
    const result = await mountForA11y(AVSpinner, {
      props: { variant: "spinner-grow", size: "md", color: "success", locale: "en" },
    });
    expect(result).toHaveNoViolations();
  });
});
