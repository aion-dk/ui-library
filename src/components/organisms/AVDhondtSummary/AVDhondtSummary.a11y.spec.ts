import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import AVDhondtSummary from "@/components/organisms/AVDhondtSummary/AVDhondtSummary.vue";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

const opt = (n: number) => ({
  reference: getOption(["selectable"], n).reference,
  title: getOption(["selectable"], n).title,
  elected: true,
  tied: false,
  raffled: false,
  comparativeFigure: 6,
});

describe("AVDhondtSummary accessibility", () => {
  it("has no violations with seat distributions", async () => {
    const result = await mountForA11y(AVDhondtSummary, {
      props: {
        voteCounts: getVoteCounts(),
        distributionNumber: 5,
        seats: 2,
        result: [
          [opt(1), opt(2)],
          [opt(1), { ...opt(2), elected: false, comparativeFigure: 3 }],
        ],
      },
      global: { components: { AVResultSummaryItem } },
    });
    expect(result).toHaveNoViolations();
  });
});
