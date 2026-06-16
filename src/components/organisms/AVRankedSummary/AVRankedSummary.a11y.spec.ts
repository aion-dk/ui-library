import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import AVRankedSummary from "@/components/organisms/AVRankedSummary/AVRankedSummary.vue";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

describe("AVRankedSummary accessibility", () => {
  it("has no violations with ranked rounds", async () => {
    const result = await mountForA11y(AVRankedSummary, {
      props: {
        distributionNumber: 5,
        seats: 1,
        voteCounts: getVoteCounts(),
        result: [
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            rounds: [
              { count: 2, elected: false, tied: false },
              { count: 3, elected: false, tied: false },
              { count: 5, elected: true, tied: false },
            ],
            elected: true,
            tied: false,
          },
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            rounds: [
              { count: 0, elected: false, tied: false },
              { count: 1, elected: false, tied: false },
              { count: 1, elected: false, tied: false },
            ],
            elected: false,
            tied: false,
          },
        ],
      },
      global: { components: { AVResultSummaryItem } },
    });
    expect(result).toHaveNoViolations();
  });
});
