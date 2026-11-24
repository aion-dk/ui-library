import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVCalculateResultContent from "@/components/organisms/AVCalculateResultContent/AVCalculateResultContent.vue";

describe("AVCalculateResultContent accessibility", () => {
  const mountContent = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVCalculateResultContent, {
      props: {
        id: "a11y-calc",
        progress: 0,
        role: "mixer",
        status: "initial",
        mixes: [0, 10],
        decryptions: [0, 10],
        elapsed: "00:00:00",
        ...props,
      },
      global: {
        stubs: {
          AVProgressBar: { template: '<span data-test="progress" />' },
          AVWaitingDots: { template: "<span />" },
        },
      },
    });

  it("has no violations in the initial state", async () => {
    const result = await mountContent();
    expect(result).toHaveNoViolations();
  });

  it("has no violations while calculating", async () => {
    const result = await mountContent({ progress: 50, status: "mixing" });
    expect(result).toHaveNoViolations();
  });
});
