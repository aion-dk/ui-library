import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOptions, getVoteCounts } from "@/examples";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVNormalListSummary from "./AVNormalListSummary.vue";

const selectableParents = getOptions(["selectable", "children"], 2);
const groupParents = getOptions(["children"], 2);
const [first, second] = selectableParents;

const sortedResult = [
  { reference: first.reference, title: first.title, count: 5, elected: false, tied: false },
  {
    reference: first.children![1].reference,
    title: first.children![1].title,
    count: 30,
    elected: true,
    tied: false,
  },
  {
    reference: first.children![0].reference,
    title: first.children![0].title,
    count: 20,
    elected: true,
    tied: false,
  },
  {
    reference: second.children![0].reference,
    title: second.children![0].title,
    count: 10,
    elected: false,
    tied: true,
  },
  { reference: "blank", title: { en: "Blank" }, count: 3, elected: false, tied: false },
];

const mountComponent = (props = {}) =>
  mount(AVNormalListSummary, {
    props: {
      options: selectableParents,
      sortedResult,
      totalCount: 68,
      voteCounts: getVoteCounts(),
      ...props,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVResultOption: {
          template: "<span />",
        },
      },
      components: {
        AVResultSummaryItem,
      },
    },
  });

describe("AVNormalListSummary", () => {
  it("renders a group per parent option", () => {
    const wrapper = mountComponent();
    const groups = wrapper.findAll("[data-test=result-group]");

    expect(groups.length).to.eq(2);
    expect(groups[0].find("[data-test=group-title]").text()).to.eq("Example option 1");
    expect(groups[1].find("[data-test=group-title]").text()).to.eq("Example option 2");
  });

  it("shows the elected count as seats", () => {
    const groups = mountComponent().findAll("[data-test=group-seats]");

    expect(groups[0].text()).to.eq("2 seats");
    expect(groups[1].text()).to.eq("no seats");
  });

  it("lists selectable parents first and children in ballot order", () => {
    const rows = mountComponent()
      .findAll("[data-test=result-group]")[0]
      .findAll("[data-test=result-option]");

    expect(rows.map((row) => row.attributes().votes)).to.deep.eq(["5", "20", "30"]);
  });

  it("doesn't list parents that aren't selectable", () => {
    const wrapper = mountComponent({
      options: groupParents,
      sortedResult: sortedResult.filter((result) => result.reference !== first.reference),
    });
    const rows = wrapper
      .findAll("[data-test=result-group]")[0]
      .findAll("[data-test=result-option]");

    expect(rows.map((row) => row.attributes().votes)).to.deep.eq(["20", "30"]);
  });

  it("renders options without children ungrouped", () => {
    const options = getOptions(["selectable"], 1);
    const wrapper = mountComponent({
      options,
      sortedResult: [{ reference: options[0].reference, title: options[0].title, count: 7 }],
    });

    expect(wrapper.findAll("[data-test=result-group]").length).to.eq(0);
    expect(
      wrapper.find("[data-test=ungrouped] [data-test=result-option]").attributes().votes,
    ).to.eq("7");
  });

  it("renders results outside the hierarchy after the groups", () => {
    const others = mountComponent().findAll("[data-test=others] [data-test=result-option]");

    expect(others.length).to.eq(1);
    expect(others[0].attributes().votes).to.eq("3");
  });

  it("hides percentages", async () => {
    const wrapper = mountComponent();
    const hidden = () =>
      wrapper.findAll("[data-test=result-option]").map((e) => e.attributes()["hide-percentage"]);

    expect(hidden().every((e) => e === "false")).to.be.true;

    await wrapper.setProps({ disregardBlank: true });
    expect(hidden()).to.deep.eq(["false", "false", "false", "false", "true"]);

    await wrapper.setProps({ hidePercentage: true });
    expect(hidden().every((e) => e === "true")).to.be.true;
  });

  it("hides elected and seats", async () => {
    const wrapper = mountComponent({ hideElected: true });

    expect(wrapper.find("[data-test=group-seats]").exists()).to.be.false;
    expect(
      wrapper.findAll("[data-test=result-option]").every((e) => e.attributes().elected === "false"),
    ).to.be.true;
  });

  it("hides tied", async () => {
    const wrapper = mountComponent();
    const tied = () => wrapper.findAll("[data-test=result-option]").map((e) => e.attributes().tied);

    expect(tied().some((e) => e === "true")).to.be.true;

    await wrapper.setProps({ hideTied: true });
    expect(tied().every((e) => e === "false")).to.be.true;
  });

  it("can switch language", async () => {
    const wrapper = mountComponent();

    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");

    await wrapper.setProps({ locale: "cy" });

    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Pleidleisiau gwag:  8");
  });

  it("doesn't show null votes without excludedCount", () => {
    const voteCounts = getVoteCounts();
    delete voteCounts.excludedCount;

    expect(mountComponent({ voteCounts }).find("[data-test=null_votes]").exists()).to.be.false;
  });
});
