import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getSelectionPile, getContest } from "@/examples";
import AVPileSummary from "@/components/organisms/AVPileSummary/AVPileSummary.vue";
import AVSummaryOption from "@/components/molecules/AVSummaryOption";

describe("AVPileSummary accessibility", () => {
  it("has no violations with a selection pile", async () => {
    const result = await mountForA11y(AVPileSummary, {
      props: {
        selectionPile: getSelectionPile(["single", "weighted"]),
        contest: getContest(["many_options"]),
        activeState: "assign",
        maximumOptionsShown: 3,
        pileIndex: 0,
        totalPiles: 0,
        locale: "en",
      },
      global: {
        components: { AVSummaryOption },
        stubs: {
          AVOptionCheckbox: { template: "<span />" },
          AVOptionCounter: { template: '<span data-test="option-counter" />' },
        },
      },
    });
    expect(result).toHaveNoViolations();
  });
});
