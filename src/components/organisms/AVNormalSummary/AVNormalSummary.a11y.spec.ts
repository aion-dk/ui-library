import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import AVNormalSummary from "@/components/organisms/AVNormalSummary/AVNormalSummary.vue";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

describe("AVNormalSummary accessibility", () => {
  it("has no violations with results", async () => {
    const result = await mountForA11y(AVNormalSummary, {
      props: {
        voteCounts: getVoteCounts(),
        sortedResult: [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            count: 30,
            elected: true,
            tied: false,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            count: 12,
            elected: false,
            tied: false,
          },
        ],
        totalCount: 100,
      },
      global: {
        stubs: { AVResultOption: { template: "<span />" } },
        components: { AVResultSummaryItem },
      },
    });
    expect(result).toHaveNoViolations();
  });
});
