import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption, getVoteCounts } from "@/examples";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVDhondtSummary from "./AVDhondtSummary.vue";

describe("AVDhondtSummary", () => {
  const wrapper = mount(AVDhondtSummary, {
    props: {
      voteCounts: getVoteCounts(),
      distributionNumber: 5,
      seats: 4,
      result: [
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 6,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1.5,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 2,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1.5,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 0.75,
          },
        ],
        {
          reference: "blank",
          title: { da: "Blank stemme", en: "Blank vote" },
          count: 1,
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
    expect(wrapper.find("thead").text()).to.contain("PartySeat 1Seat 2Seat 3Seat 4");
    expect(wrapper.find("[data-test=party-list-0]").text()).to.contain(
      "Example option 16.003.002.001.50",
    );
    expect(wrapper.find("[data-test=party-list-1]").text()).to.contain(
      "Example option 23.001.501.000.75",
    );

    expect(wrapper.find("[data-test=party-list-0]").findAll("td").length).to.eq(5);
    expect(wrapper.find("[data-test=party-list-1]").findAll("td").length).to.eq(5);

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Total seats:  4");
    expect(wrapper.find("[data-test=exampleOption1]").text()).to.contain(
      "Example option 1:  3 seats",
    );
    expect(wrapper.find("[data-test=exampleOption2]").text()).to.contain(
      "Example option 2:  1 seat",
    );
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Blank votes:  1");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Distribution number:  5");
  });

  it("hides elected", async () => {
    await wrapper.setProps({
      hideElected: true,
    });

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=summary]").text()).to.not.contain("Example option 1:  3 seats");
    expect(wrapper.find("[data-test=summary]").text()).to.not.contain("Example option 2:  1 seat");
  });

  it("update values", async () => {
    await wrapper.setProps({
      hideElected: false,
      result: [
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 6,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: true,
            raffled: false,
            comparativeFigure: 2,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: false,
            tied: true,
            raffled: false,
            comparativeFigure: 2,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1.5,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 0.75,
          },
        ],
        {
          reference: "blank",
          title: { da: "Blank stemme", en: "Blank vote" },
          count: 1,
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=party-list-0]").text()).to.contain(
      "Example option 16.003.002.001.50",
    );
    expect(wrapper.find("[data-test=party-list-1]").text()).to.contain(
      "Example option 23.002.001.000.75",
    );

    expect(wrapper.find("[data-test=party-list-0]").findAll("td").length).to.eq(5);
    expect(wrapper.find("[data-test=party-list-1]").findAll("td").length).to.eq(5);

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Total seats:  4");
    expect(wrapper.find("[data-test=exampleOption1]").text()).to.contain(
      "Example option 1:  2 seats",
    );
    expect(wrapper.find("[data-test=exampleOption2]").text()).to.contain(
      "Example option 2:  1 seat",
    );
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Blank votes:  1");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Distribution number:  5");
  });

  it("handle ties", async () => {
    await wrapper.setProps({
      result: [
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 6,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: true,
            tied: false,
            raffled: false,
            comparativeFigure: 3,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: true,
            tied: true,
            raffled: false,
            comparativeFigure: 2,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: false,
            tied: true,
            raffled: false,
            comparativeFigure: 2,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1,
          },
        ],
        [
          {
            reference: getOption(["selectable"], 1).reference,
            title: getOption(["selectable"], 1).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 1.5,
          },
          {
            reference: getOption(["selectable"], 2).reference,
            title: getOption(["selectable"], 2).title,
            elected: false,
            tied: false,
            raffled: false,
            comparativeFigure: 0.75,
          },
        ],
        {
          reference: "blank",
          title: { da: "Blank stemme", en: "Blank vote" },
          count: 1,
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.find("[data-test=party-list-0]").text()).to.contain(
      "Example option 16.003.002.001.50",
    );
    expect(wrapper.find("[data-test=party-list-1]").text()).to.contain(
      "Example option 23.002.001.000.75",
    );

    expect(wrapper.find("[data-test=party-list-0]").findAll("td").length).to.eq(5);
    expect(wrapper.find("[data-test=party-list-1]").findAll("td").length).to.eq(5);

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=seats]").text()).to.contain("Total seats:  4");
    expect(wrapper.find("[data-test=exampleOption1]").text()).to.contain(
      "Example option 1:  2 seats",
    );
    expect(wrapper.find("[data-test=exampleOption2]").text()).to.contain(
      "Example option 2:  2 seats",
    );
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Blank votes:  1");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain("Distribution number:  5");
  });

  it("hides tied", async () => {
    await wrapper.setProps({
      hideTied: true,
    });

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.not.contain(
      "bg-warning-faded",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "bg-success-faded",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "bg-success-faded",
    );
  });

  it("supports dark theme", async () => {
    await wrapper.setProps({
      hideTied: false,
    });

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.not.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.not.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.not.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.contain(
      "AVDhondtSummary--text-light",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.not.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.not.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.contain(
      "AVDhondtSummary--text-light",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.contain(
      "AVDhondtSummary--text-light",
    );

    await wrapper.setProps({
      theme: "dark",
    });

    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[1].classes()).to.not.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[2].classes()).to.not.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[3].classes()).to.not.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-0]").findAll("td")[4].classes()).to.contain(
      "AVDhondtSummary--text-dark",
    );

    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.not.contain(
      "text-gray-800",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[1].classes()).to.not.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[2].classes()).to.not.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[3].classes()).to.contain(
      "AVDhondtSummary--text-dark",
    );
    expect(wrapper.find("[data-test=party-list-1]").findAll("td")[4].classes()).to.contain(
      "AVDhondtSummary--text-dark",
    );
  });

  it("switches language", async () => {
    await wrapper.setProps({
      locale: "ro",
    });

    expect(wrapper.find("thead").text()).to.contain("PartidulScaun 1Scaun 2Scaun 3Scaun 4");
    expect(wrapper.find("[data-test=party-list-0]").text()).to.contain(
      "Exemplu de opțiune 16.003.002.001.50",
    );
    expect(wrapper.find("[data-test=party-list-1]").text()).to.contain(
      "Exemplu de opțiune 23.002.001.000.75",
    );
    expect(wrapper.find("[data-test=seats]").text()).to.contain("Total locuri:  4");
    expect(wrapper.find("[data-test=exampleOption1]").text()).to.contain(
      "Exemplu de opțiune 1:  2 locuri",
    );
    expect(wrapper.find("[data-test=exampleOption2]").text()).to.contain(
      "Exemplu de opțiune 2:  2 locuri",
    );
    expect(wrapper.find("[data-test=blank_votes]").text()).to.contain("Voturi în alb:  1");
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Voturi nule:  8");
    expect(wrapper.find("[data-test=distribution_n]").text()).to.contain(
      "Numărul de distribuție:  5",
    );
  });
});
