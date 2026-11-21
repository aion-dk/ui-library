import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox/AVOptionCheckbox.vue";
import AVOptionSelect from "@/components/atoms/AVOptionSelect";

describe("AVOptionCheckbox accessibility", () => {
  const mountCheckbox = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVOptionCheckbox, {
      props: {
        checked: false,
        optionReference: "exampleOption1",
        locale: "en",
        ...props,
      },
      global: {
        components: { AVOptionSelect },
      },
    });

  it("has no violations when unchecked", async () => {
    const result = await mountCheckbox();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when checked", async () => {
    const result = await mountCheckbox({ checked: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when checked and ranked", async () => {
    const result = await mountCheckbox({ checked: true, rank: 2 });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when disabled", async () => {
    const result = await mountCheckbox({ disabled: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when invalid and checked", async () => {
    const result = await mountCheckbox({ checked: true, invalid: true });
    expect(result).toHaveNoViolations();
  });
});
