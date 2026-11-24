import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVFileInput from "@/components/atoms/AVFileInput/AVFileInput.vue";

describe("AVFileInput accessibility", () => {
  const mountFileInput = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVFileInput, {
      props: {
        id: "a11yfileinput",
        accept: ".json",
        ...props,
      },
    });

  it("has no violations when empty", async () => {
    const result = await mountFileInput();
    expect(result).toHaveNoViolations();
  });

  it("has no violations with an external downloadable file", async () => {
    const result = await mountFileInput({
      currentValue: ["https://example.com/uploads/av_logo.svg"],
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when displaying an error", async () => {
    const result = await mountFileInput({
      error: true,
      errorMessage: "The file could not be read",
    });
    expect(result).toHaveNoViolations();
  });
});
