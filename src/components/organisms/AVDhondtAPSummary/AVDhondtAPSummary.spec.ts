import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption, getVoteCounts } from "@/examples";
import type { LocalString } from "@/types";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVDhondtAPSummary from "./AVDhondtAPSummary.vue";

describe("AVDhondtAPSummary", () => {
  const wrapper = mount(AVDhondtAPSummary, {
    props: {
      distributionNumber: 5,
      totalCount: 10,
      seats: 2,
      voteCounts: getVoteCounts(),
      result: [
        {
          reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
          count: 4,
          elected: true,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
          count: 3,
          elected: true,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 4,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable", "children"], 2).reference,
          title: getOption(["selectable", "children"], 2).title,
          count: 6,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: getOption(["selectable", "children"], 1).reference,
          title: getOption(["selectable", "children"], 1).title,
          count: 4,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: "blank",
          title: {
            en: "Blank vote",
            da: "Blank stemme",
            de: "Enthaltung",
            es: "Voto en blanco",
          },
          count: 0,
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
      "OptionListVotes countComparative figure",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.2Example option 246.00",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 1.1Example option 134.00",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 1.2Example option 123.00",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.1Example option 222.00",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 26");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 14");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Blank vote0");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Total count10");

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Seats:  2");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Distribution number:  5");
    expect(wrapper.find("[data-test=elected]").text()).to.contain(
      "Elected:  Child option 2.2, Child option 1.1",
    );
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");
  });

  it("renders in correct order", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.2Example option 246.00Child option 1.1Example option 134.00Child option 1.2Example option 123.00Child option 2.1Example option 222.00Example option 26Example option 14Blank vote0Total count10",
    );

    await wrapper.setProps({
      result: [
        {
          reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
          count: 4,
          elected: true,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
          count: 3,
          elected: true,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 4,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable", "children"], 2).reference,
          title: getOption(["selectable", "children"], 2).title,
          count: 6,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: getOption(["selectable", "children"], 1).reference,
          title: getOption(["selectable", "children"], 1).title,
          count: 4,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: "blank",
          title: {
            en: "Blank vote",
            da: "Blank stemme",
            de: "Enthaltung",
            es: "Voto en blanco",
          },
          count: 0,
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.1Example option 246.00Child option 1.2Example option 134.00Child option 1.1Example option 123.00Child option 2.2Example option 222.00Example option 26Example option 14Blank vote0Total count10",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Child option 2.2Example option 246.00Child option 1.1Example option 134.00Child option 1.2Example option 123.00Child option 2.1Example option 222.00Example option 26Example option 14Blank vote0Total count10",
    );
  });

  it("can update values", async () => {
    await wrapper.setProps({
      seats: 1,
      distributionNumber: 4,
      totalCount: 999,
      result: [
        {
          reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
          count: 10,
          elected: true,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 6.2353426,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
          count: 8,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 5.4534645,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
          count: 5,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 3.43236,
        },
        {
          reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
          count: 7,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 2.43534,
        },
        {
          reference: getOption(["selectable", "children"], 2).reference,
          title: getOption(["selectable", "children"], 2).title,
          count: 55,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: getOption(["selectable", "children"], 1).reference,
          title: getOption(["selectable", "children"], 1).title,
          count: 44,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: "blank",
          title: {
            en: "Blank vote",
            da: "Blank stemme",
            de: "Enthaltung",
            es: "Voto en blanco",
          },
          count: 15,
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "OptionListVotes countComparative figureChild option 2.1Example option 2106.24Child option 1.2Example option 185.45Child option 1.1Example option 153.43Child option 2.2Example option 272.44Example option 255Example option 144Blank vote15Total count999",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Child option 2.1Example option 246.00Child option 1.2Example option 134.00Child option 1.1Example option 123.00Child option 2.2Example option 222.00Example option 26Example option 14Blank vote0Total count10",
    );
    expect(wrapper.find("[data-test=summary]").text()).to.contain(
      "Seats:  1Distribution number:  4Elected:  Child option 2.1Null votes:  8",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Seats: 2Distribution number: 5Elected: Child option 2.1, Child option 1.2",
    );
  });

  it("can switch theme", async () => {
    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVDhondtAPSummary--text-light");
            expect(child.classes()).to.not.contain("AVDhondAPSummary--text-dark");
          }
        });
      }
    });

    await wrapper.setProps({
      theme: "dark",
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.not.contain("AVDhondtAPSummary--text-light");
            expect(child.classes()).to.contain("AVDhondtAPSummary--text-dark");
          }
        });
      }
    });

    await wrapper.setProps({
      theme: "light",
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtAPSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVDhondtAPSummary--text-light");
            expect(child.classes()).to.not.contain("AVDhondtAPSummary--text-dark");
          }
        });
      }
    });
  });

  it("can hide elected", async () => {
    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.contain("bg-success-faded");
      }
    });
    expect(wrapper.findAll("[data-test=elected]").length).to.eq(1);

    await wrapper.setProps({
      hideElected: true,
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-success-faded");
      }
    });
    expect(wrapper.findAll("[data-test=elected]").length).to.eq(0);
  });

  it("can hide tied", async () => {
    await wrapper.setProps({
      result: [
        {
          reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
          count: 4,
          elected: false,
          tied: true,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 5,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
          count: 4,
          elected: false,
          tied: true,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 5,
        },
        {
          reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
          title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 1).title,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
          title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
          count: 2,
          elected: false,
          tied: false,
          group: getOption(["selectable", "children"], 2).title,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable", "children"], 2).reference,
          title: getOption(["selectable", "children"], 2).title,
          count: 6,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: getOption(["selectable", "children"], 1).reference,
          title: getOption(["selectable", "children"], 1).title,
          count: 5,
          elected: false,
          tied: false,
          group: null,
          comparativeFigure: null,
        },
        {
          reference: "blank",
          title: {
            en: "Blank vote",
            da: "Blank stemme",
            de: "Enthaltung",
            es: "Voto en blanco",
          },
          count: 0,
          elected: false,
          tied: false,
        },
      ],
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.contain("bg-warning-faded");
      }
    });
    expect(wrapper.findAll("[data-test=tied]").length).to.eq(1);

    await wrapper.setProps({
      hideElected: false,
      hideTied: true,
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-warning-faded");
      }
    });
    expect(wrapper.findAll("[data-test=tied]").length).to.eq(0);

    await wrapper.setProps({
      hideTied: false,
    });
  });

  it("can switch locale", async () => {
    await wrapper.setProps({
      locale: "is",
    });

    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "ValkosturListiAtkvæði teljaSamanburðarmynd",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Barnakostur 2.2Dæmi um valmöguleika 245.00Barnakostur 1.1Dæmi um valmöguleika 145.00Barnakostur 1.2Dæmi um valmöguleika 123.00Barnakostur 2.1Dæmi um valmöguleika 222.00Dæmi um valmöguleika 26Dæmi um valmöguleika 15Blank vote0Heildarfjöldi999",
    );
    expect(wrapper.find("[data-test=seats]").text()).to.contain("Sæti:  1");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Dreifingarnúmer:  4");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Núll atkvæði:  8");
    expect(wrapper.find("[data-test=tied]").text()).to.contain(
      "Jafnt:  Barnakostur 2.2, Barnakostur 1.1",
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
