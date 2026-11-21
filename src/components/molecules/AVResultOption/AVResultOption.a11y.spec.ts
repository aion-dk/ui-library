import { describe, it, expect } from "vitest";
import { mountForA11y } from "@/test-utils/a11y";
import { getOption } from "@/examples";
import type { NormalResultListOption } from "@/types";
import AVResultOption from "@/components/molecules/AVResultOption/AVResultOption.vue";

describe("AVResultOption accessibility", () => {
  const baseOption = getOption(["selectable"], 1);
  const listOption: NormalResultListOption = {
    reference: baseOption.reference,
    title: baseOption.title,
    imageUrl: null,
    count: 1,
    elected: false,
    tied: false,
  };

  const mountResultOption = (
    option: Partial<NormalResultListOption> = {},
    props: Record<string, unknown> = {},
  ) =>
    mountForA11y(AVResultOption, {
      props: {
        option: { ...listOption, ...option },
        total: 2,
        locale: "en",
        ...props,
      },
    });

  it("has no violations in default state", async () => {
    const result = await mountResultOption();
    expect(result).toHaveNoViolations();
  });

  it("has no violations as winner", async () => {
    const result = await mountResultOption({ count: 2, elected: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when tied", async () => {
    const result = await mountResultOption({ tied: true });
    expect(result).toHaveNoViolations();
  });

  it("has no violations with a decorative image", async () => {
    const imageOption = getOption(["selectable", "image"], 1);
    const result = await mountResultOption({ imageUrl: imageOption.image ?? null });
    expect(result).toHaveNoViolations();
  });

  it("has no violations as a list row", async () => {
    const result = await mountResultOption({}, { list: true });
    expect(result).toHaveNoViolations();
  });
});
