import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import AVInstantRunoffSummary from "@/components/organisms/AVInstantRunoffSummary/AVInstantRunoffSummary.vue";

describe("AVInstantRunoffSummary accessibility", () => {
  it("has no violations across rounds", async () => {
    const result = await mountForA11y(AVInstantRunoffSummary, {
      props: {
        voteCounts: getVoteCounts(),
        seatNumber: 1,
        quota: 2,
        totalVotes: 4,
        blankVotes: 0,
        sortedResult: [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
          },
        ],
        rounds: [
          {
            counts: { exampleOption1: 3, exampleOption2: 1, exampleOption3: 0 },
            eliminated: "exampleOption3",
            exhausted: 0,
            elected: null,
            transferred: 0,
            event: "",
          },
          {
            counts: { exampleOption1: 3, exampleOption2: 1 },
            eliminated: "exampleOption2",
            exhausted: 0,
            elected: "exampleOption1",
            transferred: 0,
            event: "",
          },
        ],
      },
    });
    expect(result).toHaveNoViolations();
  });
});
