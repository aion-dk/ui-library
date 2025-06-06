import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption, getVoteCounts } from "@/examples";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVRankedSummary from "./AVRankedSummary.vue";

describe("AVRankedSummary", () => {
  const wrapper = mount(AVRankedSummary, {
    props: {
      distributionNumber: 5,
      seats: 1,
      voteCounts: getVoteCounts(),
      result: [
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          rounds: [
            {
              count: 2,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
            {
              count: 5,
              elected: true,
              tied: false,
            },
          ],
          elected: true,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          rounds: [
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
      ],
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVResultSummaryItem,
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "PositionCandidateRound 1Round 2Round 3",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 2235");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 3113");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 1011");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 4001");

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Seats:  1");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Distribution number:  5");
    expect(wrapper.find("[data-test=elected]").text()).to.contain("Elected:  Example option 2");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Blank votes:  10");
  });

  it("renders in correct order", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Example option 2235Example option 3113Example option 1011Example option 4001",
    );

    await wrapper.setProps({
      result: [
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          rounds: [
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          rounds: [
            {
              count: 2,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
            {
              count: 5,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Example option 4001Example option 3113Example option 2235Example option 1011",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Example option 2235Example option 3113Example option 1011Example option 4001",
    );
  });

  it("can update values", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Example option 4001Example option 3113Example option 2235Example option 1011",
    );

    await wrapper.setProps({
      result: [
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
          rounds: [
            {
              count: 10,
              elected: false,
              tied: false,
            },
            {
              count: 11,
              elected: false,
              tied: false,
            },
            {
              count: 12,
              elected: true,
              tied: false,
            },
          ],
          elected: true,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          rounds: [
            {
              count: 7,
              elected: false,
              tied: false,
            },
            {
              count: 8,
              elected: false,
              tied: false,
            },
            {
              count: 9,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          rounds: [
            {
              count: 4,
              elected: false,
              tied: false,
            },
            {
              count: 5,
              elected: false,
              tied: false,
            },
            {
              count: 6,
              elected: false,
              tied: true,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          rounds: [
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 2,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Example option 4101112Example option 3789Example option 2456Example option 1123",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Example option 40012Example option 31133Example option 22354Example option 1011",
    );
  });

  it("can switch theme", async () => {
    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.contain(
      "AVRankedSummary--text-light",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.contain(
      "AVRankedSummary--text-light",
    );
    // elected in round 2, theme rules do not apply
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-light",
    );

    await wrapper.setProps({
      theme: "dark",
    });

    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.not.contain(
      "AVRankedSummary--text-light",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.not.contain(
      "AVRankedSummary--text-light",
    );
    // elected in round 2, theme rules do not apply
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-light",
    );

    await wrapper.setProps({
      theme: "light",
    });

    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_0]").classes()).to.contain(
      "AVRankedSummary--text-light",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_1]").classes()).to.contain(
      "AVRankedSummary--text-light",
    );
    // elected in round 2, theme rules do not apply
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-dark",
    );
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "AVRankedSummary--text-light",
    );
  });

  it("can hide elected", async () => {
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.findAll("[data-test=elected]").length).to.eq(1);

    await wrapper.setProps({
      hideElected: true,
    });

    expect(wrapper.findAll("[data-test=elected]").length).to.eq(0);
    expect(wrapper.find("[data-test=exampleOption4_round_2]").classes()).to.not.contain(
      "bg-success-faded",
    );
  });

  it("can hide tied", async () => {
    await wrapper.setProps({
      result: [
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          rounds: [
            {
              count: 2,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
            {
              count: 5,
              elected: true,
              tied: true,
            },
          ],
          elected: false,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          rounds: [
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: true,
            },
          ],
          elected: false,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 4).reference,
          title: getOption(["selectable"], 4).title,
          rounds: [
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 0,
              elected: false,
              tied: false,
            },
            {
              count: 1,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.findAll("[data-test=tied]").length).to.eq(1);
    expect(wrapper.find("[data-test=exampleOption2_round_2]").classes()).to.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=exampleOption3_round_2]").classes()).to.contain(
      "bg-warning-faded",
    );

    await wrapper.setProps({
      hideElected: false,
      hideTied: true,
    });

    expect(wrapper.findAll("[data-test=tied]").length).to.eq(0);
    expect(wrapper.find("[data-test=exampleOption2_round_2]").classes()).to.not.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=exampleOption3_round_2]").classes()).to.not.contain(
      "bg-warning-faded",
    );

    await wrapper.setProps({
      hideTied: false,
    });
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "es",
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "PosiciónCandidatoRonda 1Ronda 2Ronda 3",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Opción de ejemplo 4");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Opción de ejemplo 3");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Opción de ejemplo 2");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Opción de ejemplo 1");

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Escaños:  1");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain(
      "Número de distribución:  5",
    );
    expect(wrapper.find("[data-test=tied]").text()).to.contain(
      "Empatado:  Opción de ejemplo 2, Opción de ejemplo 3",
    );
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Votos nulos:  8");
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Votos en blanco:  10");
  });

  it("prioritizes elected color", async () => {
    await wrapper.setProps({
      hideElected: false,
      hideTied: false,
      result: [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          rounds: [
            {
              count: 10,
              elected: false,
              tied: false,
            },
            {
              count: 11,
              elected: false,
              tied: false,
            },
            {
              count: 12,
              elected: true,
              tied: true,
            },
          ],
          elected: true,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          rounds: [
            {
              count: 10,
              elected: false,
              tied: false,
            },
            {
              count: 11,
              elected: false,
              tied: false,
            },
            {
              count: 12,
              elected: false,
              tied: true,
            },
          ],
          elected: false,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          rounds: [
            {
              count: 1,
              elected: false,
              tied: false,
            },
            {
              count: 2,
              elected: false,
              tied: false,
            },
            {
              count: 3,
              elected: false,
              tied: false,
            },
          ],
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=exampleOption1_round_2]").classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=exampleOption1_round_2]").classes()).to.not.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=exampleOption2_round_2]").classes()).to.contain(
      "bg-warning-faded",
    );
  });

  describe("when voteCounts don't include excludedCount", async () => {
    beforeEach(async () => {
      const voteCounts = getVoteCounts();
      delete voteCounts.excludedCount;

      await wrapper.setProps({ voteCounts });
    });

    it("doesn't show null votes", async () => {
      expect(wrapper.find("[data-test=null_votes]").exists()).to.be.false;
    });
  });
});
