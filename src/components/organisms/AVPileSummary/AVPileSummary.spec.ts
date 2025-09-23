import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getContest, getSelectionPile } from "@/examples";

import AVPileSummary from "./AVPileSummary.vue";
import AVSummaryOption from "@/components/molecules/AVSummaryOption";

describe("AVPileSummary", () => {
  const wrapper = mount(AVPileSummary, {
    props: {
      selectionPile: getSelectionPile(["single", "weighted"]),
      contest: getContest(["many_options"]),
      activeState: "assign",
      maximumOptionsShown: 3,
      pileIndex: 0,
      totalPiles: 0,
      locale: "en",
    },
    global: {
      components: {
        AVSummaryOption,
      },
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
        AVOptionCheckbox: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain("Ballot selection 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=pile-summary-edit]").get("span").attributes().icon).to.eq(
      "pen-to-square",
    );
  });

  it("can handle ranked ballots", async () => {
    await wrapper.setProps({
      selectionPile: getSelectionPile(["multi", "weighted"]),
      contest: getContest(["many_options", "ranked"]),
    });

    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("1:  Example option 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("2:  Example option 2");
  });

  it("can go into edition mode", async () => {
    expect(wrapper.findAll("[data-test=pile-summary-assigned]").length).to.eq(0);

    await wrapper.setProps({
      isEditing: true,
    });

    expect(wrapper.find("[data-test=pile-summary-assigned]").text()).to.contain("Assigned: 10");

    await wrapper.setProps({
      isEditing: false,
    });
  });

  it("can emit edit event", async () => {
    expect(wrapper.emitted().editCurrentSelection).to.not.exist;
    await wrapper.find("[data-test=pile-summary-edit]").trigger("click");
    expect(wrapper.emitted().editCurrentSelection).to.exist;
  });

  it("can switch to overview mode", async () => {
    expect(wrapper.findAll("[data-test=pile-summary-delete]").length).to.eq(0);

    await wrapper.setProps({
      activeState: "overview",
    });

    expect(wrapper.findAll("[data-test=pile-summary-delete]").length).to.eq(1);
    expect(wrapper.find("[data-test=pile-summary-delete]").attributes()["aria-label"]).to.eq(
      "Delete this selection",
    );
    expect(wrapper.find("[data-test=pile-summary-assigned]").text()).to.contain("Assigned: 10");
    expect(wrapper.find("[data-test=pile-summary-delete]").get("span").attributes().icon).to.eq(
      "trash-can",
    );
  });

  it("can emit delete event", async () => {
    expect(wrapper.emitted().deleteSelection).to.not.exist;
    await wrapper.find("[data-test=pile-summary-delete]").trigger("click");
    expect(wrapper.emitted().deleteSelection).to.exist;
  });

  it("can switch to summary mode", async () => {
    expect(wrapper.findAll("[data-test=summary-option]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=summary-cross]").length).to.eq(0);

    await wrapper.setProps({
      activeState: "summary",
      selectionPile: getSelectionPile(["single", "weighted"]),
      totalPiles: 5,
    });

    expect(wrapper.findAll("[data-test=pile-summary-edit]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=pile-summary-delete]").length).to.eq(0);

    expect(wrapper.findAll("[data-test=summary-option]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=summary-cross]").length).to.eq(1);
    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain("Selection 1 / 5");
    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain("10 ballots");
    expect(wrapper.find("[data-test=summary-option]").text()).to.contain("Example option 1");
  });

  it("can support multiple options", async () => {
    await wrapper.setProps({
      activeState: "overview",
      maximumOptionsShown: 3,
      contest: getContest(["many_options"]),
      selectionPile: getSelectionPile(["many", "weighted"]),
    });

    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 2");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 3");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 4");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 5");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 6");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 7");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.contain("And 4 more...");
  });

  it("can uncollapse options", async () => {
    await wrapper.find("[data-test=pile-summary-more]").trigger("click");

    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 2");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 3");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 4");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 5");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 6");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 7");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.not.contain("And 4 more...");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.contain("Show less options");
  });

  it("can collapse options", async () => {
    await wrapper.find("[data-test=pile-summary-more]").trigger("click");

    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 2");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 3");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 4");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 5");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 6");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.not.contain("Example option 7");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.contain("And 4 more...");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.not.contain(
      "Show less options",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "pl",
    });

    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain(
      "Wybór karty do głosowania 1",
    );
    expect(wrapper.find("[data-test=pile-summary-assigned]").text()).to.contain("Przypisane: 10");

    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Przykładowa opcja 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Przykładowa opcja 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Przykładowa opcja 1");
    expect(wrapper.find("[data-test=pile-summary-more]").text()).to.contain("I 4 więcej...");

    expect(wrapper.find("[data-test=pile-summary-delete]").attributes()["aria-label"]).to.eq(
      "Usuń ten wybór",
    );
  });
});
