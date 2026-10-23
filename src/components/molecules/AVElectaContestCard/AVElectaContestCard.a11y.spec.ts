import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import AVElectaContestCard from "@/components/molecules/AVElectaContestCard/AVElectaContestCard.vue";

describe("AVElectaContestCard accessibility", () => {
  it("has no violations in default state", async () => {
    const result = await mountForA11y(AVElectaContestCard, {
      props: {
        contestTitle: "Mayoral election",
        votingRoundTitle: "Round one",
      },
    });
    expect(result).toHaveNoViolations();
  });
});
