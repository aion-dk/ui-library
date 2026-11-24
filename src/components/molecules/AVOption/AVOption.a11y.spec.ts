import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption, getContest } from "@/examples";
import AVOption from "@/components/molecules/AVOption/AVOption.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVOptionSelect from "@/components/atoms/AVOptionSelect";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVTweenedCount from "@/components/atoms/AVTweenedCount";
import AVOptionCounter from "@/components/atoms/AVOptionCounter";

describe("AVOption accessibility", () => {
  const mountOption = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVOption, {
      props: {
        option: getOption(["selectable"], 1),
        selections: [],
        contest: getContest([]),
        invalid: false,
        locale: "en",
        ...props,
      },
      global: {
        components: {
          AVCollapser,
          AVAnimatedTransition,
          AVOptionCheckbox,
          AVOptionSelect,
          AVOptionLiveResults,
          AVTweenedCount,
          AVOptionCounter,
        },
      },
    });

  it("has no violations in default state", async () => {
    const result = await mountOption();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when selected", async () => {
    const result = await mountOption({
      selections: [{ reference: "exampleOption1" }],
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when invalid and selected", async () => {
    const result = await mountOption({
      selections: [{ reference: "exampleOption1" }],
      invalid: true,
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations with children options expanded", async () => {
    const result = await mountOption({
      option: getOption(["selectable", "children"], 1),
      contest: getContest(["children_options"]),
    });
    expect(result).toHaveNoViolations();
  });
});
