import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVSplitWeightHelper from "@/components/molecules/AVSplitWeightHelper/AVSplitWeightHelper.vue";

describe("AVSplitWeightHelper accessibility", () => {
  const mountHelper = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVSplitWeightHelper, {
      props: {
        assignedWeight: 4,
        unusedWeight: 6,
        activeAssigned: 4,
        locale: "en",
        ...props,
      },
    });

  it("has no violations with assigned and unused weight", async () => {
    const result = await mountHelper();
    expect(result).toHaveNoViolations();
  });

  it("has no violations when all weight is unassigned", async () => {
    const result = await mountHelper({ assignedWeight: 0, unusedWeight: 10, activeAssigned: 0 });
    expect(result).toHaveNoViolations();
  });
});
