import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVVerticalStep from "@/components/atoms/AVVerticalStep/AVVerticalStep.vue";

describe("AVVerticalStep accessibility", () => {
  const mountStep = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVVerticalStep, {
      props: {
        title: "Step one",
        collapsed: true,
        linkMode: true,
        summary: true,
        ...props,
      },
    });

  it("has no violations when collapsed", async () => {
    const result = await mountStep();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when expanded", async () => {
    const result = await mountStep({ collapsed: false });
    expect(result).toHaveNoViolations();
  });
});
