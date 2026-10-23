import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVShowMore from "@/components/atoms/AVShowMore/AVShowMore.vue";

describe("AVShowMore accessibility", () => {
  const longContent = {
    default: "A".repeat(800),
  };

  it("has no violations when collapsed", async () => {
    const result = await mountForA11y(AVShowMore, {
      props: { id: "a11y-showmore", contentHeight: 500, customHeightInPx: 350, locale: "en" },
      slots: longContent,
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when fully displayed", async () => {
    const result = await mountForA11y(AVShowMore, {
      props: {
        id: "a11y-showmore-open",
        contentHeight: 500,
        customHeightInPx: 350,
        displayFullContent: true,
        locale: "en",
      },
      slots: longContent,
    });
    expect(result).toHaveNoViolations();
  });
});
