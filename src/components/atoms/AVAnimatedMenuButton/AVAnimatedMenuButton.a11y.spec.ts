import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVAnimatedMenuButton from "@/components/atoms/AVAnimatedMenuButton/AVAnimatedMenuButton.vue";

describe("AVAnimatedMenuButton accessibility", () => {
  const mountMenuButton = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVAnimatedMenuButton, {
      props: {
        isOpened: false,
        variant: "cross",
        theme: "dark",
        locale: "en",
        ...props,
      },
    });

  it("has no violations when collapsed", async () => {
    const result = await mountMenuButton();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when expanded", async () => {
    const result = await mountMenuButton({ isOpened: true });
    expect(result).toHaveNoViolations();
  });
});
