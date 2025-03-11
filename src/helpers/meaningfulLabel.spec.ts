import { describe, it, expect } from "vitest";
import { getContest, getOption, getCandidate } from "@/examples";
import localI18n from "@/i18n";

import { getMeaningfulLabel } from "./meaningfulLabel";

const INITIAL_OPTION = { ...getOption(["selectable"], 1), id: 5 };
const INITIAL_CONTEST = { ...getContest([]), id: 7 };
const INITIAL_ITEM = getCandidate().generic[1];
const ANOTHER_INITIAL_ITEM = { ...getCandidate().generic[1], internal_name: "Some internal name" };
localI18n.global.locale = "es";

describe("Option labels", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "Opción de ejemplo 1",
    );
  });

  it("Gets default label (en) when current local missing", async () => {
    delete INITIAL_OPTION.title.es;
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "Example option 1",
    );
  });

  it("Gets first available label (ar) when both missing", async () => {
    delete INITIAL_OPTION.title.en;
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "خيار المثال 1",
    );
  });

  it("Gets option code when title missing", async () => {
    Object.keys(INITIAL_OPTION.title).forEach((key) => {
      delete INITIAL_OPTION.title[key];
    });
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "Opción #5",
    );
  });

  it("Gets option id when code missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_OPTION.code;
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "Opción #5",
    );
  });

  it("Gets reference when id is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_OPTION.id;
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "exampleOption1",
    );
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_OPTION.reference;
    expect(getMeaningfulLabel("option", INITIAL_OPTION, "es", localI18n.global.t)).to.eq(
      "Unknown resource",
    );
  });
});

describe("Contest labels", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "Boleta de ejemplo",
    );
  });

  it("Gets default label (en) when current local missing", async () => {
    delete INITIAL_CONTEST.title.es;
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "Example ballot",
    );
  });

  it("Gets first available label (ar) when both missing", async () => {
    delete INITIAL_CONTEST.title.en;
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "مثال الاقتراع",
    );
  });

  it("Gets contest id when title missing", async () => {
    Object.keys(INITIAL_CONTEST.title).forEach((key) => {
      delete INITIAL_CONTEST.title[key];
    });
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "Boleta #7",
    );
  });

  it("Gets reference when id is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_CONTEST.id;
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "exampleContest",
    );
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete INITIAL_CONTEST.reference;
    expect(getMeaningfulLabel("contest", INITIAL_CONTEST, "es", localI18n.global.t)).to.eq(
      "Unknown resource",
    );
  });
});

describe("Resource Item content", () => {
  it("Gets localised label", async () => {
    expect(getMeaningfulLabel("resource", INITIAL_ITEM, "es", localI18n.global.t)).to.contain(
      "Este es un texto muy largo.",
    );
  });

  it("Gets default label (en) when current local missing", async () => {
    // @ts-expect-error just don't want to cast types everytime.
    delete INITIAL_ITEM.form_content.es;
    expect(getMeaningfulLabel("resource", INITIAL_ITEM, "es", localI18n.global.t)).to.contain(
      "This is a very long text.",
    );
  });

  it("Gets first available label (ar) when both missing", async () => {
    // @ts-expect-error just don't want to cast types everytime.
    delete INITIAL_ITEM.form_content.en;
    expect(getMeaningfulLabel("resource", INITIAL_ITEM, "es", localI18n.global.t)).to.contain(
      "هذا نص طويل جدًا.",
    );
  });

  it("Gets string when not localised", async () => {
    INITIAL_ITEM.localised = false;
    INITIAL_ITEM.form_content = "Some random stuff.";
    expect(getMeaningfulLabel("resource", INITIAL_ITEM, "es", localI18n.global.t)).to.contain(
      "Some random stuff.",
    );
    INITIAL_ITEM.localised = true;
    expect(getMeaningfulLabel("resource", INITIAL_ITEM, "es", localI18n.global.t)).to.eq("");
  });
});

describe("Resource labels", () => {
  it("Gets localised label", async () => {
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Etiqueta del campo");
  });

  it("Gets default label (en) when current local missing", async () => {
    delete ANOTHER_INITIAL_ITEM.label.es;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Field label");
  });

  it("Gets first available label (ar) when both missing", async () => {
    delete ANOTHER_INITIAL_ITEM.label.en;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("تسمية الحقل");
  });

  it("Gets internal name when title missing", async () => {
    Object.keys(ANOTHER_INITIAL_ITEM.label).forEach((key) => {
      delete ANOTHER_INITIAL_ITEM.label[key];
    });
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Some internal name");
  });

  it("Gets attribute name when internal name is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete ANOTHER_INITIAL_ITEM.internal_name;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("voteforme");
  });

  it("Gets resource type and position when attribute name missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete ANOTHER_INITIAL_ITEM.attribute_name;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Item del formulario rich_text_area #6");
  });

  it("Gets resource type and id when position missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete ANOTHER_INITIAL_ITEM.position;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Item del formulario rich_text_area #2");
  });

  it("Gets 'unknown' when everything is missing", async () => {
    // @ts-expect-error it will usually have one. This it just for testing purposes.
    delete ANOTHER_INITIAL_ITEM.id;
    expect(
      getMeaningfulLabel("resourceLabel", ANOTHER_INITIAL_ITEM, "es", localI18n.global.t),
    ).to.eq("Unknown resource");
  });
});
