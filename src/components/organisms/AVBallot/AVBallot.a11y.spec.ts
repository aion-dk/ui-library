import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getContest, getSelectionPile } from "@/examples";
import AVBallot from "@/components/organisms/AVBallot/AVBallot.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVOption from "@/components/molecules/AVOption";
import AVBlankOption from "@/components/molecules/AVBlankOption";
import AVSearchBallot from "@/components/molecules/AVSearchBallot";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVOptionCounter from "@/components/atoms/AVOptionCounter";
import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper";

describe("AVBallot accessibility", () => {
  const mountBallot = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVBallot, {
      props: {
        contest: getContest([]),
        selectionPile: getSelectionPile([]),
        showSubmissionHelper: false,
        weight: 1,
        locale: "en",
        ...props,
      },
      global: {
        components: {
          AVCollapser,
          AVAnimatedTransition,
          AVOption,
          AVBlankOption,
          AVSearchBallot,
          AVOptionCheckbox,
          AVOptionLiveResults,
          AVOptionCounter,
          AVSubmissionHelper,
        },
      },
    });

  it("has no violations in list mode", async () => {
    const result = await mountBallot();
    expect(result).toHaveNoViolations();
  });

  it("has no violations in gallery mode", async () => {
    const result = await mountBallot({ contest: getContest(["gallery_short"]) });
    expect(result).toHaveNoViolations();
  }, 20000);

  it("has no violations with the submission helper shown", async () => {
    const result = await mountBallot({ showSubmissionHelper: true });
    expect(result).toHaveNoViolations();
  });
});
