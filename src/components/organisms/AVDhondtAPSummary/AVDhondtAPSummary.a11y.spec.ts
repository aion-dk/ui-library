import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getVoteCounts } from "@/examples";
import type { LocalString } from "@/types";
import AVDhondtAPSummary from "@/components/organisms/AVDhondtAPSummary/AVDhondtAPSummary.vue";

describe("AVDhondtAPSummary accessibility", () => {
  it("has no violations with a group result", async () => {
    const parent = getOption(["selectable", "children"], 2);
    const child = parent.children?.[1];
    const result = await mountForA11y(AVDhondtAPSummary, {
      props: {
        distributionNumber: 5,
        totalCount: 10,
        seats: 1,
        voteCounts: getVoteCounts(),
        result: [
          {
            reference: child?.reference as string,
            title: child?.title as LocalString,
            count: 4,
            elected: true,
            tied: false,
            group: parent.title,
            comparativeFigure: 6,
          },
        ],
      },
    });
    expect(result).toHaveNoViolations();
  });
});
