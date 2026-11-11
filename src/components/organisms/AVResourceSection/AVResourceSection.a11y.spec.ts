import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getCandidate } from "@/examples";
import AVResourceSection from "@/components/organisms/AVResourceSection/AVResourceSection.vue";

describe("AVResourceSection accessibility", () => {
  it("has no violations with a candidate", async () => {
    const result = await mountForA11y(AVResourceSection, {
      props: { candidate: getCandidate(), summary: true, card: true, locale: "en" },
      global: { stubs: { AVLinkVisualizer: { template: "<span />" } } },
    });
    expect(result).toHaveNoViolations();
  });
});
