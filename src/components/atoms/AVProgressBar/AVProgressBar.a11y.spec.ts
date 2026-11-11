import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVProgressBar from "@/components/atoms/AVProgressBar/AVProgressBar.vue";
import AVTweenedCount from "@/components/atoms/AVTweenedCount";

describe("AVProgressBar accessibility", () => {
  const mountBar = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVProgressBar, {
      props: { id: "a11y-progress", value: 37, ...props },
      global: { components: { AVTweenedCount } },
    });

  it("has no violations with a value", async () => {
    const result = await mountBar();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when complete", async () => {
    const result = await mountBar({ value: 100 });
    expect(result).toHaveNoViolations();
  });
});
