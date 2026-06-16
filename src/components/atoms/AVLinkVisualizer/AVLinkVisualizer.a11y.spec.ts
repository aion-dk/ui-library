import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getUrl } from "@/examples";
import AVLinkVisualizer from "@/components/atoms/AVLinkVisualizer/AVLinkVisualizer.vue";

describe("AVLinkVisualizer accessibility", () => {
  it("has no violations with a link", async () => {
    const result = await mountForA11y(AVLinkVisualizer, {
      props: { link: getUrl("website") },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations with an icon-only link", async () => {
    const result = await mountForA11y(AVLinkVisualizer, {
      props: { link: getUrl("website"), onlyIcon: true },
    });
    expect(result).toHaveNoViolations();
  });
});
