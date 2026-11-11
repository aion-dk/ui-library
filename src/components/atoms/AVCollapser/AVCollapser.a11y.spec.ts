import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVCollapser from "@/components/atoms/AVCollapser/AVCollapser.vue";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";

describe("AVCollapser accessibility", () => {
  const mountCollapser = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVCollapser, {
      props: {
        paneId: "a11y-pane",
        collapsable: true,
        ...props,
      },
      slots: {
        toggle: "Toggle section",
        pane: "Pane content describing the section",
      },
      global: {
        components: { AVAnimatedTransition },
      },
    });

  it("has no violations when collapsed", async () => {
    const result = await mountCollapser({ startCollapsed: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when expanded", async () => {
    const result = await mountCollapser({ startCollapsed: false });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when not collapsable", async () => {
    const result = await mountCollapser({ collapsable: false });
    expect(result).toHaveNoViolations();
  });
});
