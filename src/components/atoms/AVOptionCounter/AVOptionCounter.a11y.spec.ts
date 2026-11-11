import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVOptionCounter from "@/components/atoms/AVOptionCounter/AVOptionCounter.vue";

describe("AVOptionCounter accessibility", () => {
  const mountCounter = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVOptionCounter, {
      props: {
        amount: 0,
        maxAmount: 1,
        locale: "en",
        ...props,
      },
    });

  it("has no violations at zero", async () => {
    const result = await mountCounter();
    expect(result).toHaveNoViolations();
  });

  it("has no violations with a value", async () => {
    const result = await mountCounter({ amount: 3, maxAmount: 10 });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when invalid", async () => {
    const result = await mountCounter({ amount: 3, maxAmount: 10, invalid: true });
    expect(result).toHaveNoViolations();
  });
});
