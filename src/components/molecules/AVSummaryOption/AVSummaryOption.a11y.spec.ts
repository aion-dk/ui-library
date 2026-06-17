import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption } from "@/examples";
import AVSummaryOption from "@/components/molecules/AVSummaryOption/AVSummaryOption.vue";

describe("AVSummaryOption accessibility", () => {
  const mountSummaryOption = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVSummaryOption, {
      props: {
        option: {
          title: getOption([], 1).title,
          handle: getOption([], 1).reference,
          crosses: 1,
          rank: undefined,
          reference: getOption([], 1).reference,
        },
        locale: "en",
        ...props,
      },
      global: {
        stubs: {
          AVOptionCheckbox: { template: "<span />" },
          AVOptionCounter: { template: '<span data-test="option-counter" />' },
        },
      },
    });

  it("has no violations with a single cross", async () => {
    const result = await mountSummaryOption();
    expect(result).toHaveNoViolations();
  });

  it("has no violations with a rank", async () => {
    const result = await mountSummaryOption({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        rank: 2,
        reference: getOption([], 1).reference,
      },
    });
    expect(result).toHaveNoViolations();
  });
});
