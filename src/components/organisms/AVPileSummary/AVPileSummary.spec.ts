import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getContest, getSelectionPile, getValidationPolicy } from "@/examples";
import type { ContestContent, SelectionPile, ValidationResult } from "@/types";

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
        AVOptionCounter: {
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

  it("allows summary editing when editable or prefilled", async () => {
    await wrapper.setProps({ activeState: "summary", editable: true, isPrefilled: false });
    const edit = wrapper.get("[data-test=pile-summary-edit]");
    expect(edit.attributes("aria-label")).toBeTruthy();
    const count = wrapper.emitted("editCurrentSelection")?.length ?? 0;
    await edit.trigger("click");
    expect(wrapper.emitted("editCurrentSelection")).toHaveLength(count + 1);

    await wrapper.setProps({ editable: false, isPrefilled: true });
    expect(wrapper.find("[data-test=pile-summary-edit]").exists()).toBe(true);

    await wrapper.setProps({ isPrefilled: false });
    expect(wrapper.find("[data-test=pile-summary-edit]").exists()).toBe(false);
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

describe("AVPileSummary in summary state", () => {
  const mountSummary = (
    contest: ContestContent,
    selectionPile: SelectionPile,
    props: Record<string, unknown> = {},
    i18n: unknown = localI18n,
  ) =>
    mount(AVPileSummary, {
      props: {
        contest,
        selectionPile,
        activeState: "summary",
        pileIndex: 0,
        totalPiles: 1,
        locale: "en",
        ...props,
      },
      global: {
        components: { AVSummaryOption },
        provide: { i18n },
        stubs: {
          AVIcon: { template: "<span />" },
          AVOptionCheckbox: { template: "<span />" },
          AVOptionCounter: { template: "<span />" },
        },
      },
    });

  const feedback = (wrapper: ReturnType<typeof mountSummary>) =>
    wrapper.find("[data-test=pile-summary-policy-feedback]");

  const lastPendingAlerts = (wrapper: ReturnType<typeof mountSummary>) =>
    wrapper.emitted("update:pendingAlerts")?.at(-1)?.[0] as ValidationResult[] | undefined;

  // Same i18n, but reporting that no `review_*` translation exists.
  const i18nWithoutReviewKeys = {
    global: new Proxy(localI18n.global as unknown as Record<string, unknown>, {
      get: (target, key) => (key === "te" ? () => false : Reflect.get(target, key)),
    }),
  };

  it("shows no policy feedback without a validation policy", () => {
    const wrapper = mountSummary(getContest(["multi"]), getSelectionPile(["single"]));

    expect(feedback(wrapper).exists()).to.be.false;
  });

  it("shows the review-page wording for an undervote warning", () => {
    const wrapper = mountSummary(
      { ...getContest(["multi"]), validationPolicy: getValidationPolicy("undervote_warn") },
      getSelectionPile(["single"]),
    );

    expect(feedback(wrapper).classes()).to.include("bg-warning");
    expect(feedback(wrapper).classes()).to.not.include("bg-theme-danger");
    expect(feedback(wrapper).get("[role=alert]").text()).to.eq(
      "Summary: You have selected fewer than the maximum allowed options. You can continue or select more.",
    );
  });

  it("falls back to the ballot wording when no review translation exists", () => {
    const wrapper = mountSummary(
      { ...getContest(["multi"]), validationPolicy: getValidationPolicy("undervote_warn") },
      getSelectionPile(["single"]),
      {},
      i18nWithoutReviewKeys,
    );

    expect(feedback(wrapper).get("[role=alert]").text()).to.eq(
      "Ballot: You have selected fewer than the maximum allowed options. You can continue or select more.",
    );
  });

  it("shows blocking feedback with params for an undervote below minimum", () => {
    const contest = getContest(["multi"]);
    const wrapper = mountSummary(
      {
        ...contest,
        markingType: { ...contest.markingType, minMarks: 2 },
        validationPolicy: {
          undervoteBelowMin: {
            behavior: "do_not_allow",
            feedbackScreen: "ballot_and_review_page",
            feedbackType: "on_screen_message",
            editable: false,
          },
        },
      },
      getSelectionPile(["single"]),
    );

    expect(feedback(wrapper).classes()).to.include("bg-theme-danger");
    expect(feedback(wrapper).classes()).to.not.include("bg-warning");
    expect(feedback(wrapper).text()).to.eq("You must select at least 2 option(s) to continue.");
  });

  it("shows the raw inline blank-vote message and emits its alert only while in summary", async () => {
    const wrapper = mountSummary(
      { ...getContest([]), validationPolicy: getValidationPolicy("blank_vote_feedback") },
      getSelectionPile([]),
      { activeState: "assign" },
    );
    expect(wrapper.emitted("update:pendingAlerts")).to.not.exist;

    await wrapper.setProps({ activeState: "summary" });

    expect(feedback(wrapper).text()).to.eq(
      "You have not selected any option in this contest. If you continue, this contest will be submitted without a selection.",
    );
    const alerts = lastPendingAlerts(wrapper)!;
    expect(alerts).to.have.length(1);
    expect(alerts[0].isRawMessage).to.be.true;
    expect(alerts[0].feedbackMessage).to.eq(
      "You are about to cast a blank vote. Are you sure you want to continue?",
    );

    await wrapper.setProps({ activeState: "overview" });

    expect(lastPendingAlerts(wrapper)).to.deep.eq([]);
  });

  it("maps pending alerts to their review translation keys", async () => {
    const wrapper = mountSummary(
      {
        ...getContest(["multi"]),
        validationPolicy: {
          overvote: {
            behavior: "block_selection",
            feedbackScreen: "ballot_and_review_page",
            feedbackType: "alert",
          },
        },
      },
      getSelectionPile(["many"]),
      { activeState: "assign" },
    );

    await wrapper.setProps({ activeState: "summary" });

    const alerts = lastPendingAlerts(wrapper)!;
    expect(alerts).to.have.length(1);
    expect(alerts[0].scenario).to.eq("overvote");
    expect(alerts[0].feedbackMessage).to.eq("review_warnings.overvote");
    // Alert-only feedback is not rendered inline.
    expect(feedback(wrapper).exists()).to.be.false;
  });

  it("keeps the ballot key for alerts without a review translation", async () => {
    const wrapper = mountSummary(
      {
        ...getContest(["multi"]),
        validationPolicy: {
          overvote: {
            behavior: "block_selection",
            feedbackScreen: "ballot_and_review_page",
            feedbackType: "alert",
          },
        },
      },
      getSelectionPile(["many"]),
      { activeState: "assign" },
      i18nWithoutReviewKeys,
    );

    await wrapper.setProps({ activeState: "summary" });

    expect(lastPendingAlerts(wrapper)![0].feedbackMessage).to.eq("warnings.overvote");
  });

  it("lists options in contest order regardless of selection order", () => {
    const wrapper = mountSummary(getContest(["many_options"]), {
      multiplier: 1,
      optionSelections: [{ reference: "exampleOption3" }, { reference: "exampleOption1" }],
      explicitBlank: false,
    });

    const titles = wrapper.findAll("[data-test=summary-option]").map((o) => o.text());
    expect(titles).to.have.length(2);
    expect(titles[0]).to.contain("Example option 1");
    expect(titles[1]).to.contain("Example option 3");
  });

  it("keeps selection order for ranked contests", () => {
    const wrapper = mountSummary(getContest(["many_options", "ranked"]), {
      multiplier: 1,
      optionSelections: [{ reference: "exampleOption3" }, { reference: "exampleOption1" }],
      explicitBlank: false,
    });

    const titles = wrapper.findAll("[data-test=summary-option]").map((o) => o.text());
    expect(titles[0]).to.contain("Example option 3");
    expect(titles[1]).to.contain("Example option 1");
  });

  it("groups repeated selections and ignores unknown references", () => {
    const wrapper = mountSummary(getContest(["multiple_votes_sm"]), {
      multiplier: 1,
      optionSelections: [
        { reference: "exampleOption1" },
        { reference: "exampleOption1" },
        { reference: "doesNotExist" },
      ],
      explicitBlank: false,
    });

    expect(wrapper.findAll("[data-test=summary-option]")).to.have.length(1);
    expect(wrapper.findAll("[data-test=summary-cross]")).to.have.length(2);
  });

  it("shows the ancestry of child options", () => {
    const wrapper = mountSummary(getContest(["children_options"]), getSelectionPile(["children"]));

    const ancestry = wrapper.findAll("[data-test=summary-option-ancestry]");
    expect(ancestry).to.have.length(1);
    expect(ancestry[0].text()).to.contain("Example option 1");
  });

  it("shows descriptions only when the contest asks for it", async () => {
    const contest = getContest(["complete_options"]);
    const pile = getSelectionPile(["single"]);

    const wrapper = mountSummary(contest, pile);
    expect(wrapper.find("[data-test=summary-option-description]").exists()).to.be.false;

    await wrapper.setProps({ contest: { ...contest, displayDescriptionOnSummary: true } });
    expect(wrapper.find("[data-test=summary-option-description]").exists()).to.be.true;
  });

  it("shows a plain header when the contest disallows splitting", () => {
    const wrapper = mountSummary(getContest(["disallow_splitting"]), getSelectionPile(["single"]), {
      totalPiles: 3,
    });

    const header = wrapper.get("[data-test=pile-summary-header]").text();
    expect(header).to.contain("Selection");
    expect(header).to.not.contain("1 / 3");
  });

  it("shows write-ins in the overview body", () => {
    const wrapper = mountSummary(
      getContest(["write_in"]),
      {
        multiplier: 1,
        optionSelections: [{ reference: "exampleOption1", text: "Jane Doe" }],
        explicitBlank: false,
      },
      { activeState: "overview" },
    );

    const body = wrapper.get("[data-test=pile-summary-body]").text();
    expect(body).to.contain("Example option 1");
    expect(body).to.contain("Jane Doe");
  });
});
