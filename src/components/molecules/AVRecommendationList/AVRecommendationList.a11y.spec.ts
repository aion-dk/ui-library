import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getRecommendationsList } from "@/examples";
import AVRecommendationList from "@/components/molecules/AVRecommendationList/AVRecommendationList.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";

describe("AVRecommendationList accessibility", () => {
  const mountRecs = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVRecommendationList, {
      props: {
        recommendations: [],
        locale: "en",
        recommendationPhaseActive: true,
        ...props,
      },
      global: { components: { AVCollapser, AVAnimatedTransition } },
    });

  it("has no violations when empty", async () => {
    const result = await mountRecs();
    expect(result).toHaveNoViolations();
  });

  it("has no violations with recommendations", async () => {
    const result = await mountRecs({ recommendations: getRecommendationsList() });
    expect(result).toHaveNoViolations();
  });
});
