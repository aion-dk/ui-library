import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import AVNormalSummary from "@/components/organisms/AVNormalSummary/AVNormalSummary.vue";
import AVResultOption from "@/components/molecules/AVResultOption";
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
            imageUrl: null,
            count: 30,
            elected: true,
            tied: false,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            imageUrl: null,
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

  it("has no violations with grouped list results", async () => {
    const list = getOption(["selectable", "image"], 1);
    const candidate = getOption(["selectable"], 1, true, 1);
    const result = await mountForA11y(AVNormalSummary, {
      props: {
        voteCounts: getVoteCounts(),
        sortedResult: [
          {
            reference: list.reference,
            title: list.title,
            imageUrl: list.image ?? null,
            seatsWon: 1,
            children: [
              {
                reference: list.reference,
                title: list.title,
                imageUrl: null,
                count: 20,
                elected: false,
                tied: false,
              },
              {
                reference: candidate.reference,
                title: candidate.title,
                imageUrl: null,
                count: 10,
                elected: true,
                tied: false,
              },
            ],
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            imageUrl: null,
            count: 12,
            elected: false,
            tied: false,
          },
        ],
        totalCount: 100,
      },
      global: {
        components: { AVResultOption, AVResultSummaryItem },
      },
    });
    expect(result).toHaveNoViolations();
  });
});
