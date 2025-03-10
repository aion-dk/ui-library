import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption } from "@/examples";
import localI18n from "@/i18n";

import AVRankedSummary from "./AVRankedSummary.vue";

describe("AVRankedSummary", () => {
  const wrapper = mount(AVRankedSummary, {
    props: {
      distributionNumber: 5,
      seats: 1,
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

    expect(wrapper.find("[data-test=summary]").text()).to.contain("Seats: 1");
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Distribution number: 5");
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Elected: Example option 2");
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
    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVRankedSummary--text-dark");
        expect(el.html()).to.not.contain("AVRankedSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVRankedSummary--text-light");
            expect(child.classes()).to.not.contain("AVRankedSummary--text-dark");
          }
        });
      }
    });

    await wrapper.setProps({
      theme: "dark",
    });

    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVRankedSummary--text-dark");
        expect(el.html()).to.not.contain("AVRankedSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.not.contain("AVRankedSummary--text-light");
            expect(child.classes()).to.contain("AVRankedSummary--text-dark");
          }
        });
      }
    });

    await wrapper.setProps({
      theme: "light",
    });

    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVRankedSummary--text-dark");
        expect(el.html()).to.not.contain("AVRankedSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVRankedSummary--text-light");
            expect(child.classes()).to.not.contain("AVRankedSummary--text-dark");
          }
        });
      }
    });
  });

  it("can hide elected", async () => {
    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.contain("bg-success-faded");
      }
    });

    await wrapper.setProps({
      hideElected: true,
    });

    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-success-faded");
      }
    });
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
              tied: false,
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
              tied: false,
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

    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.contain("bg-warning-faded");
      }
    });

    await wrapper.setProps({
      hideElected: false,
      hideTied: true,
    });

    wrapper.findAll("[data-test=candidate-ranked-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-warning-faded");
      }
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

    expect(wrapper.find("[data-test=summary]").text()).to.contain("Escaños: 1");
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Número de distribución: 5");
    expect(wrapper.find("[data-test=summary]").text()).to.contain(
      "Empatado: Opción de ejemplo 2, Opción de ejemplo 3",
    );
  });
});
