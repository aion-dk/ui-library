import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getLiveResult } from "@/examples";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults/AVOptionLiveResults.vue";
import AVTweenedCount from "@/components/atoms/AVTweenedCount";

describe("AVOptionLiveResults accessibility", () => {
  const mountLive = (props: Record<string, unknown> = {}) =>
    mountForA11y(AVOptionLiveResults, {
      props: {
        optionReference: "exampleOption1",
        partialResults: getLiveResult(["exampleOption1"]).exampleOption1,
        locale: "en",
        ...props,
      },
      global: { components: { AVTweenedCount } },
    });

  it("has no violations in external mode", async () => {
    const result = await mountLive({ mode: "external" });
    expect(result).toHaveNoViolations();
  });

  it("has no violations in observer (internal) mode", async () => {
    const result = await mountLive({ mode: "internal", observerMode: true });
    expect(result).toHaveNoViolations();
  });
});
