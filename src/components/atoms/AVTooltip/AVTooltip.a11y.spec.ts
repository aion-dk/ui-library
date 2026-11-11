import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVTooltip from "@/components/atoms/AVTooltip/AVTooltip.vue";

describe("AVTooltip accessibility", () => {
  it("has no violations with text content", async () => {
    const result = await mountForA11y(AVTooltip, {
      props: { content: "Additional information about this option" },
      slots: { text: "Hover for details" },
    });
    expect(result).toHaveNoViolations();
  });
});
