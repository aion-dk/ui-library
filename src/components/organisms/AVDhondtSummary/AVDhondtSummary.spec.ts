import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption } from "@/examples";
import type { LocalString } from "@/types";
import localI18n from "@/i18n";

import AVDhondtSummary from "./AVDhondtSummary.vue";

describe("AVDhondtSummary", () => {
  const wrapper = mount(AVDhondtSummary, {
    props: {
      distributionNumber: 5,
      totalCount: 10,
      seats: 2,
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
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "OptionListVotes countComparative figure",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.2Example option 246.000",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 1.1Example option 134.000",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 1.2Example option 123.000",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.1Example option 222.000",
    );
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 26");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Example option 14");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Blank vote0");
    expect(wrapper.find("[data-test=table]").text()).to.contain("Total count10");

    expect(wrapper.find("[data-test=summary]").text()).to.contain("Seats: 2");
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Distribution number: 5");
    expect(wrapper.find("[data-test=summary]").text()).to.contain(
      "Elected: Child option 2.2, Child option 1.1",
    );
  });

  it("renders in correct order", async () => {
    expect(wrapper.find("[data-test=table]").text()).to.contain(
      "Child option 2.2Example option 246.000Child option 1.1Example option 134.000Child option 1.2Example option 123.000Child option 2.1Example option 222.000Example option 26Example option 14Blank vote0Total count10",
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
      "Child option 2.1Example option 246.000Child option 1.2Example option 134.000Child option 1.1Example option 123.000Child option 2.2Example option 222.000Example option 26Example option 14Blank vote0Total count10",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Child option 2.2Example option 246.000Child option 1.1Example option 134.000Child option 1.2Example option 123.000Child option 2.1Example option 222.000Example option 26Example option 14Blank vote0Total count10",
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
      "OptionListVotes countComparative figureChild option 2.1Example option 2106.235Child option 1.2Example option 185.453Child option 1.1Example option 153.432Child option 2.2Example option 272.435Example option 255Example option 144Blank vote15Total count999",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Child option 2.1Example option 246.000Child option 1.2Example option 134.000Child option 1.1Example option 123.000Child option 2.2Example option 222.000Example option 26Example option 14Blank vote0Total count10",
    );
    expect(wrapper.find("[data-test=summary]").text()).to.contain(
      "Seats: 1Distribution number: 4Elected: Child option 2.1",
    );
    expect(wrapper.find("[data-test=table]").text()).to.not.contain(
      "Seats: 2Distribution number: 5Elected: Child option 2.1, Child option 1.2",
    );
  });

  it("can switch theme", async () => {
    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        // elected, theme rules do not apply
        expect(el.html()).to.not.contain("AVDhondtSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVDhondtSummary--text-light");
            expect(child.classes()).to.not.contain("AVDhondtSummary--text-dark");
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
        expect(el.html()).to.not.contain("AVDhondtSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.not.contain("AVDhondtSummary--text-light");
            expect(child.classes()).to.contain("AVDhondtSummary--text-dark");
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
        expect(el.html()).to.not.contain("AVDhondtSummary--text-dark");
        expect(el.html()).to.not.contain("AVDhondtSummary--text-light");
      } else {
        el.findAll("td").forEach((child, i) => {
          if (i !== 0) {
            expect(child.classes()).to.contain("AVDhondtSummary--text-light");
            expect(child.classes()).to.not.contain("AVDhondtSummary--text-dark");
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

    await wrapper.setProps({
      hideElected: true,
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-success-faded");
      }
    });
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

    await wrapper.setProps({
      hideElected: false,
      hideTied: true,
    });

    wrapper.findAll("[data-test=candidate-dhondt-result]").forEach((el, i) => {
      if (i === 0) {
        expect(el.classes()).to.not.contain("bg-warning-faded");
      }
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
      "Barnakostur 2.2Dæmi um valmöguleika 245.000Barnakostur 1.1Dæmi um valmöguleika 145.000Barnakostur 1.2Dæmi um valmöguleika 123.000Barnakostur 2.1Dæmi um valmöguleika 222.000Dæmi um valmöguleika 26Dæmi um valmöguleika 15Blank vote0Heildarfjöldi999",
    );
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Sæti: 1");
    expect(wrapper.find("[data-test=summary]").text()).to.contain("Dreifingarnúmer: 4");
    expect(wrapper.find("[data-test=summary]").text()).to.contain(
      "Jafnt: Barnakostur 2.2, Barnakostur 1.1",
    );
  });
});
