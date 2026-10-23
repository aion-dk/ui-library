import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper/AVSubmissionHelper.vue";

describe("AVSubmissionHelper accessibility", () => {
  const mountHelper = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVSubmissionHelper, {
      props: {
        minMarks: 1,
        maxMarks: 1,
        chosenCount: 1,
        errors: [],
        locale: "en",
        ...props,
      },
    });

  it("has no violations in default state", async () => {
    const result = await mountHelper();
    expect(result).toHaveNoViolations();
  });

  it("has no violations with errors", async () => {
    const result = await mountHelper({
      chosenCount: 0,
      errors: [{ message: "You must select at least one option" }],
    });
    expect(result).toHaveNoViolations();
  });
});
