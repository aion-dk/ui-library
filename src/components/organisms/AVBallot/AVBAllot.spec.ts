import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getContest, getSelectionPile } from "@/examples";

import AVBallot from "./AVBallot.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVSearchBallot from "@/components/molecules/AVSearchBallot";
import AVOption from "@/components/molecules/AVOption";
import AVBlankOption from "@/components/molecules/AVBlankOption";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";

describe("AVBallot", () => {
  const wrapper = mount(AVBallot, {
    props: {
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      showSubmissionHelper: false,
      locale: "en",
    },
    global: {
      components: {
        AVCollapser,
        AVAnimatedTransition,
        AVOption,
        AVBlankOption,
        AVSearchBallot,
        AVOptionLiveResults,
      },
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
        AVOptionCheckbox: {
          template: "<span data-test='checkbox' />",
        },
        AVSubmissionHelper: {
          template: "<span data-test='helper' />",
        },
        AVWriteInOption: {
          template: "<span data-test='writein' />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=option]")[0].text()).to.eq("Example option 1exampleOption1");
    expect(wrapper.findAll("[data-test=option]")[1].text()).to.eq("Example option 2exampleOption2");
    expect(wrapper.findAll("[data-test=option]")[2].text()).to.eq("Example option 3exampleOption3");

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");
  });

  it("can display blank option", async () => {
    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["blank"]),
    });

    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(1);
    expect(wrapper.find("[data-test=blank-option]").text()).to.eq("Blankblank");

    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .checked,
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .invalid,
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .disabled,
    ).to.eq("false");
  });

  it("can display errors", async () => {
    await wrapper.setProps({
      selectionPile: getSelectionPile(["blank", "multi"]),
    });

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .checked,
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .invalid,
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .disabled,
    ).to.eq("false");
  });

  it("can perform search", async () => {
    expect(wrapper.findAll("[data-test=search-ballot-input]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["blank", "search_form"]),
      selectionPile: getSelectionPile([]),
    });

    expect(wrapper.findAll("[data-test=search-ballot-input]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=search-result]").length).to.eq(0);

    await wrapper.find("[data-test=search-ballot-input]").setValue("option 2");
    expect(wrapper.findAll("[data-test=search-result]").length).to.eq(1);
    expect(wrapper.find("[data-test=search-result]").text()).to.contain("Example option 2");

    expect(wrapper.findAll("[data-test=option-section]")[1].classes()).to.not.contain(
      "AVOption--highlight",
    );
    await wrapper.find("[data-test=search-result]").trigger("click");
    expect(wrapper.findAll("[data-test=option-section]")[1].classes()).to.contain(
      "AVOption--highlight",
    );
  });

  it("can be disabled", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      disabled: true,
    });

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
  });

  it("can switch language", async () => {
    expect(wrapper.find("[data-test=ballot]").attributes()["aria-label"]).to.eq("Ballot");

    await wrapper.setProps({
      locale: "da",
    });

    expect(wrapper.find("[data-test=ballot]").attributes()["aria-label"]).to.contain(
      "Stemmeseddel",
    );
    expect(wrapper.findAll("[data-test=option]")[0].text()).to.contain("Eksempel mulighed 1");
    expect(wrapper.findAll("[data-test=option]")[1].text()).to.contain("Eksempel mulighed 2");
    expect(wrapper.findAll("[data-test=option]")[2].text()).to.contain("Eksempel mulighed 3");
  });
});
