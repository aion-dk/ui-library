import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getSelectionPile } from "@/examples";
import AVSplitWizardHeader from "@/components/molecules/AVSplitWizardHeader/AVSplitWizardHeader.vue";
import AVTooltip from "@/components/atoms/AVTooltip";

describe("AVSplitWizardHeader accessibility", () => {
  it("has no violations in default state", async () => {
    const result = await mountForA11y(AVSplitWizardHeader, {
      props: {
        selectionPiles: [getSelectionPile([])],
        activeState: "ballot",
        activeSelectionPileIndex: 2,
        totalWeight: 10,
        isEditing: false,
        locale: "en",
      },
      global: { components: { AVTooltip } },
    });
    expect(result).toHaveNoViolations();
  });
});
