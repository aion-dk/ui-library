import { describe, it, expect } from "vitest";
import { getContest, getOption, getCandidate } from "@/examples";
import localI18n from "@/i18n";

import { getMeaningfulLabel } from "./meaningfulLabel";

const INITIAL_OPTION = { ...getOption(["selectable"], 1), id: 5 };
const INITIAL_CONTEST = { ...getContest([]), id: 7 };
const INITIAL_RESOURCE = { ...getCandidate().generic[1], internal_name: "Some internal name" };
localI18n.global.locale = "es";

describe("Option labels", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel(INITIAL_OPTION, "es")).to.eq("Opción de ejemplo 1");
  });

  it("Gets first available label (ar) when user locale missing", async () => {
    delete INITIAL_OPTION.title.es;
    expect(getMeaningfulLabel(INITIAL_OPTION, "es")).to.eq("خيار المثال 1");
  });

  it("Gets option reference when title missing", async () => {
    Object.keys(INITIAL_OPTION.title).forEach((key) => {
      delete INITIAL_OPTION.title[key];
    });

    expect(getMeaningfulLabel(INITIAL_OPTION, "es")).to.eq("exampleOption1");
  });

  it("Gets option id when code missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_OPTION.reference;
    expect(getMeaningfulLabel(INITIAL_OPTION, "es", "Opción")).to.eq("Opción #5");
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_OPTION.id;
    expect(getMeaningfulLabel(INITIAL_OPTION, "es")).to.eq("Unknown resource");
  });
});

describe("Contest labels", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel(INITIAL_CONTEST, "es")).to.eq("Boleta de ejemplo");
  });

  it("Gets first available label (ar) when user locale missing", async () => {
    delete INITIAL_CONTEST.title.es;
    expect(getMeaningfulLabel(INITIAL_CONTEST, "es")).to.eq("مثال الاقتراع");
  });

  it("Gets contest reference when title missing", async () => {
    Object.keys(INITIAL_CONTEST.title).forEach((key) => {
      delete INITIAL_CONTEST.title[key];
    });
    expect(getMeaningfulLabel(INITIAL_CONTEST, "es")).to.eq("exampleContest");
  });

  it("Gets id when id reference missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_CONTEST.reference;
    expect(getMeaningfulLabel(INITIAL_CONTEST, "es", "Opción")).to.eq("Opción #7");
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_CONTEST.id;
    expect(getMeaningfulLabel(INITIAL_CONTEST, "es")).to.eq("Unknown resource");
  });
});

describe("Resource labels", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel(INITIAL_RESOURCE, "es")).to.eq("Etiqueta del campo");
  });

  it("Gets first available label (ar) when user locale missing", async () => {
    delete INITIAL_RESOURCE.label.es;
    expect(getMeaningfulLabel(INITIAL_RESOURCE, "es")).to.eq("تسمية الحقل");
  });

  it("Gets internal name when title missing", async () => {
    Object.keys(INITIAL_RESOURCE.label).forEach((key) => {
      delete INITIAL_RESOURCE.label[key];
    });
    expect(getMeaningfulLabel(INITIAL_RESOURCE, "es")).to.eq("Some internal name");
  });

  it("Gets attribute name when internal name is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_RESOURCE.internal_name;
    expect(getMeaningfulLabel(INITIAL_RESOURCE, "es")).to.eq("voteforme");
  });

  it("Gets resource type and id when position missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_RESOURCE.attribute_name;
    expect(
      getMeaningfulLabel(
        INITIAL_RESOURCE,
        "es",
        `Item del formulario ${INITIAL_RESOURCE.item_type}`,
      ),
    ).to.eq("Item del formulario rich_text_area #2");
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_RESOURCE.id;
    expect(getMeaningfulLabel(INITIAL_RESOURCE, "es")).to.eq("Unknown resource");
  });
});
