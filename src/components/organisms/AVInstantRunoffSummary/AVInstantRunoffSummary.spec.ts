import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption, getVoteCounts } from "@/examples";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVInstantRunoffSummary from "./AVInstantRunoffSummary.vue";

describe("AVInstantRunoffSummary", () => {
  const wrapper = mount(AVInstantRunoffSummary, {
    props: {
      voteCounts: getVoteCounts(),
      rounds: [
        {
          counts: {
            exampleOption1: 3,
            exampleOption3: 0,
            exampleOption2: 1,
            exampleOption4: 0,
          },
          eliminated: "exampleOption4",
          exhausted: 0,
          elected: "exampleOption1",
          transferred: 0,
          event: "",
        },
        {
          counts: { exampleOption1: 3, exampleOption3: 0, exampleOption2: 1 },
          eliminated: "exampleOption3",
          exhausted: 0,
          elected: null,
          transferred: 0,
          event: "",
        },
        {
          counts: { exampleOption1: 3, exampleOption2: 1 },
          eliminated: "exampleOption2",
          exhausted: 0,
          elected: null,
          transferred: 0,
          event: "",
        },
        {
          counts: { exampleOption1: 4 },
          eliminated: null,
          exhausted: 0,
          elected: null,
          transferred: 1,
          event: "",
        },
      ],
      sortedResult: [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
        },
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
        },
      ],
      seatNumber: 1,
      quota: 5,
      totalVotes: 10,
      blankVotes: 1,
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVResultSummaryItem,
      },
      directives: {
        tooltip: () => {},
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=seat-title]").text()).to.contain("Seat 1");

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "CandidateRound 1 Round 2 Round 3 Round 4",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 13334");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 21110");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 30000");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 40000");
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Transferred votes from eliminated candidates0001",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Exhausted ballots0000");

    expect(wrapper.findAll("[data-test=not-included]").length).to.eq(0);
    expect(wrapper.find("[data-test=abstain]").text()).to.contain("Abstain:  1");
    expect(wrapper.find("[data-test=total]").text()).to.contain("Total votes:  10");
    expect(wrapper.find("[data-test=quota]").text()).to.contain("Quota needed for election:  5");
  });

  it("renders in correct position", async () => {
    await wrapper.setProps({
      sortedResult: [
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Example option 40000Example option 30000Example option 21110Example option 13334",
    );

    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Example option 13334Example option 21110Example option 30000Example option 40000",
    );
  });

  it("can render not included", async () => {
    await wrapper.setProps({
      votesNotIncluded: 8,
    });

    expect(wrapper.find("[data-test=not-included]").text()).to.contain(
      "Votes for elected candidates not included in the count for this seat:  8",
    );
  });

  it("renders correct values", async () => {
    await wrapper.setProps({
      rounds: [
        {
          counts: {
            exampleOption1: 10,
            exampleOption3: 222,
            exampleOption2: 99,
            exampleOption4: 6666,
          },
          eliminated: "exampleOption4",
          exhausted: 1,
          elected: "exampleOption1",
          transferred: 4,
          event: "",
        },
        {
          counts: {
            exampleOption1: 20,
            exampleOption3: 111,
            exampleOption2: 88,
          },
          eliminated: "exampleOption3",
          exhausted: 2,
          elected: null,
          transferred: 3,
          event: "",
        },
        {
          counts: { exampleOption1: 30, exampleOption2: 77 },
          eliminated: "exampleOption2",
          exhausted: 3,
          elected: null,
          transferred: 2,
          event: "",
        },
        {
          counts: { exampleOption1: 40 },
          eliminated: null,
          exhausted: 4,
          elected: null,
          transferred: 1,
          event: "",
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 46666000");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 322211100");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 29988770");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 110203040");
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Transferred votes from eliminated candidates4321",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Exhausted ballots1234");
  });

  it("can switch theme", async () => {
    expect(wrapper.findAll(".AVInstantRunoffSummary--text-light").length).to.eq(31);
    expect(wrapper.findAll(".AVInstantRunoffSummary--text-dark").length).to.eq(0);

    await wrapper.setProps({
      theme: "dark",
    });

    expect(wrapper.findAll(".AVInstantRunoffSummary--text-light").length).to.eq(0);
    expect(wrapper.findAll(".AVInstantRunoffSummary--text-dark").length).to.eq(31);

    await wrapper.setProps({
      theme: "light",
    });

    expect(wrapper.findAll(".AVInstantRunoffSummary--text-light").length).to.eq(31);
    expect(wrapper.findAll(".AVInstantRunoffSummary--text-dark").length).to.eq(0);
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "de",
    });

    expect(wrapper.find("[data-test=seat-title]").text()).to.contain("Sitz 1");

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "KandidatRunde 1 Runde 2 Runde 3 Runde 4 Beispieloption 46666000Beispieloption 322211100Beispieloption 29988770Beispieloption 110203040Übertragene Stimmen von ausgeschiedenen Kandidaten4321Erschöpfte Stimmzettel1234",
    );
    expect(wrapper.find("[data-test=abstain]").text()).to.contain("Verzichten:  1");
    expect(wrapper.find("[data-test=total]").text()).to.contain("Gesamte stimmen:  10");
    expect(wrapper.find("[data-test=quota]").text()).to.contain(
      "Quote für die Wahl erforderlich:  5",
    );
    expect(wrapper.find("[data-test=not-included]").text()).to.contain(
      "Stimmen für gewählte Kandidaten, die nicht in die Zählung für diesen Sitz einbezogen werden:  8",
    );
  });
});
