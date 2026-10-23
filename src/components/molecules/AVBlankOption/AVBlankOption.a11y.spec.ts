import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVBlankOption from "@/components/molecules/AVBlankOption/AVBlankOption.vue";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVTweenedCount from "@/components/atoms/AVTweenedCount";

describe("AVBlankOption accessibility", () => {
  const mountBlank = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVBlankOption, {
      props: {
        checked: false,
        error: false,
        locale: "en",
        ...props,
      },
      global: {
        components: {
          AVOptionCheckbox,
          AVOptionLiveResults,
          AVTweenedCount,
        },
      },
    });

  it("has no violations in default state", async () => {
    const result = await mountBlank();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when checked", async () => {
    const result = await mountBlank({ checked: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when invalid", async () => {
    const result = await mountBlank({ checked: true, error: true, invalid: true });
    expect(result).toHaveNoViolations();
  });
});
