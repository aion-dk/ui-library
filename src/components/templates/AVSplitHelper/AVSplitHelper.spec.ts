import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getContestSelection, getContest, getLiveResult } from "@/examples";
import type { VitestEmitted } from "@/types";
import localI18n from "@/i18n";

import AVSplitHelper from "./AVSplitHelper.vue";
import AVTooltip from "@/components/atoms/AVTooltip";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVOptionSelect from "@/components/atoms/AVOptionSelect";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVSearchBallot from "@/components/molecules/AVSearchBallot";
import AVOption from "@/components/molecules/AVOption";
import AVBlankOption from "@/components/molecules/AVBlankOption";
import AVSplitWizardHeader from "@/components/molecules/AVSplitWizardHeader";
import AVSplitWeightHelper from "@/components/molecules/AVSplitWeightHelper";
import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper";
import AVSummaryOption from "@/components/molecules/AVSummaryOption";
import AVBallot from "@/components/organisms/AVBallot";
import AVPileSummary from "@/components/organisms/AVPileSummary";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVOptionCounter from "@/components/atoms/AVOptionCounter";

describe("AVSplitHelper", () => {
  const wrapper = mount(AVSplitHelper, {
    props: {
      contest: getContest([]),
      contestSelection: getContestSelection([]),
      weight: 1,
      locale: "en",
    },
    global: {
      components: {
        AVBallot,
        AVPileSummary,
        AVSummaryOption,
        AVSplitWizardHeader,
        AVSplitWeightHelper,
        AVSubmissionHelper,
        AVBlankOption,
        AVOption,
        AVOptionCheckbox,
        AVOptionSelect,
        AVCollapser,
        AVAnimatedTransition,
        AVSearchBallot,
        AVTooltip,
        AVOptionLiveResults,
        AVOptionCounter,
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
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=split-helper-contest-title]").text()).to.contain(
      "Example ballot",
    );
    expect(wrapper.find("[data-test=split-helper-contest-weight]").text()).to.contain(
      "Your vote has a weight of 1",
    );
    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
  });

  it("can display description, question and blank", async () => {
    expect(wrapper.find("[data-test=split-helper-contest-description]").text()).to.not.contain(
      "This is a description...",
    );
    expect(wrapper.findAll("[data-test=split-helper-contest-question]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=ballot-question]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["description", "blank", "question"]),
    });

    expect(wrapper.find("[data-test=split-helper-contest-description]").text()).to.contain(
      "This is a description...",
    );
    expect(wrapper.findAll("[data-test=split-helper-contest-question]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=ballot-question]").length).to.eq(1);
    expect(wrapper.find("[data-test=ballot-question]").text()).to.contain(
      "For whom does the bell toll?",
    );
  });

  it("emits correct information", async () => {
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[0][0].multiplier).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[0][0].optionSelections.length,
    ).to.eq(0);
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[0][0].explicitBlank).to.eq(
      false,
    );
    expect((wrapper.emitted()["update:contestSelection"] as VitestEmitted)[0][0].reference).to.eq(
      "exampleContest",
    );
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[0][0].piles.length,
    ).to.eq(1);

    await wrapper.findAll("[data-test=option-checkbox]")[0].trigger("click");

    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[1][0].multiplier).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[1][0].optionSelections.length,
    ).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[1][0].optionSelections[0].reference,
    ).to.eq("exampleOption1");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[1][0].explicitBlank).to.eq(
      false,
    );
    const pile = (wrapper.emitted()["update:activePile"] as VitestEmitted)[1][0];
    expect((wrapper.emitted()["update:contestSelection"] as VitestEmitted)[1][0].piles[0]).to.eq(
      pile,
    );
  });

  it("can trigger multiple options selected errror", async () => {
    expect(wrapper.find("[data-test=ballot-submission-helper]").text()).to.not.contain(
      "Too many options selected",
    );

    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[2][0].multiplier).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[2][0].optionSelections.length,
    ).to.eq(2);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[2][0].optionSelections[0].reference,
    ).to.eq("exampleOption1");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[2][0].optionSelections[1].reference,
    ).to.eq("exampleOption3");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[2][0].explicitBlank).to.eq(
      false,
    );
    expect(wrapper.find("[data-test=ballot-submission-helper]").text()).to.contain(
      "Too many options selected",
    );
  });

  it("can trigger blank is exclusive errror", async () => {
    expect(wrapper.find("[data-test=ballot-submission-helper]").text()).to.not.contain(
      "Blank is exclusive and cannot be combined with other options",
    );

    await wrapper.findAll("[data-test=option-checkbox]")[3].trigger("click");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[3][0].explicitBlank).to.eq(
      true,
    );
    const pile = (wrapper.emitted()["update:activePile"] as VitestEmitted)[3][0];
    expect((wrapper.emitted()["update:contestSelection"] as VitestEmitted)[3][0].piles[0]).to.eq(
      pile,
    );
    expect(wrapper.find("[data-test=ballot-submission-helper]").text()).to.contain(
      "Blank is exclusive and cannot be combined with other options",
    );
  });

  it("can enable split voting", async () => {
    await wrapper.findAll("[data-test=option-checkbox]")[0].trigger("click");
    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    await wrapper.findAll("[data-test=option-checkbox]")[3].trigger("click");
    expect(wrapper.findAll("[data-test=split-helper-confirm]").length).to.eq(0);

    await wrapper.setProps({
      weight: 10,
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 1: Make your choice for ballot selection 1",
    );
    expect(wrapper.find("[data-test=split-wizard-tooltip]").text()).to.contain(
      "You can assign your choices up to 10 ballots",
    );
    expect(wrapper.findAll("[data-test=split-helper-confirm]").length).to.eq(1);
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.exist;
  });

  it("can perform split voting", async () => {
    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");

    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[7][0].multiplier).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[7][0].optionSelections.length,
    ).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[7][0].optionSelections[0].reference,
    ).to.eq("exampleOption3");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[7][0].explicitBlank).to.eq(
      false,
    );
    expect(wrapper.emitted()["update:contestSelection"][7]).to.not.exist;
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.not.exist;
    expect(wrapper.findAll("[data-test=split-helper-contest-question]").length).to.eq(0);

    expect(wrapper.emitted()["update:activeState"][1]).to.not.exist;
    await wrapper.find("[data-test=split-helper-confirm]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[1][0]).to.eq("assign");

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 2: Assign number of ballots to ballot selection 1",
    );
    expect(wrapper.find("[data-test=split-helper-contest-question]").text()).to.contain(
      "How many ballots should have this combination of choices?",
    );
    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain("Ballot selection 1");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.eq("Example option 3");
    expect(wrapper.find("[data-test=split-helper-assign-label]").text()).to.contain(
      "Number of ballots to assign:",
    );
    expect(wrapper.find("[data-test=split-helper-assign-input]").attributes().max).to.eq("10");
    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain(
      "Total number of ballots: 10",
    );
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain(
      "Already assigned: 0",
    );
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain(
      "Left to assign: 10",
    );
  });

  it("can go back and edit a vote", async () => {
    expect(wrapper.emitted()["update:activeState"][2]).to.not.exist;
    await wrapper.find("[data-test=split-helper-assign-back]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[2][0]).to.eq("ballot");

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 1: Make your choice for ballot selection 1",
    );

    await wrapper.findAll("[data-test=option-checkbox]")[3].trigger("click");
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[8][0].explicitBlank).to.eq(
      true,
    );
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[8][0].optionSelections.length,
    ).to.eq(1);
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.exist;

    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[9][0].optionSelections.length,
    ).to.eq(0);
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.not.exist;
    const pile = (wrapper.emitted()["update:activePile"] as VitestEmitted)[9][0];

    expect(wrapper.emitted()["update:activeState"][3]).to.not.exist;
    await wrapper.find("[data-test=split-helper-confirm]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[3][0]).to.eq("assign");

    await wrapper.find("[data-test=split-helper-assign-input]").setValue(4);
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 2: Assign number of ballots to ballot selection 1",
    );

    expect(wrapper.emitted()["update:activeState"][4]).to.not.exist;
    await wrapper.find("[data-test=split-helper-assign-confirm]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[4][0]).to.eq("overview");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 3: Overview of ballot selections",
    );
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[7][0].piles.length,
    ).to.eq(1);
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[7][0].piles[0].multiplier,
    ).to.eq(pile.multiplier);
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[7][0].piles[0]
        .optionSelections,
    ).to.eq(pile.optionSelections);
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[7][0].piles[0].explicitBlank,
    ).to.eq(pile.explicitBlank);
  });

  it("can display pile summary", async () => {
    await wrapper.setProps({
      contestSelection: getContestSelection(["half"]),
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 3: Overview of ballot selections",
    );
    expect(wrapper.findAll("[data-test=split-helper-new-selection]").length).to.eq(1);
    expect(wrapper.find("[data-test=split-helper-new-selection]").text()).to.contain(
      "Add new ballot selection",
    );
    expect(wrapper.find("[data-test=split-helper-overview]").text()).to.contain(
      "5  ballots left to assign",
    );
    expect(wrapper.find("[data-test=pile-summary-header]").text()).to.contain("Ballot selection 1");
    expect(wrapper.find("[data-test=pile-summary-assigned]").text()).to.contain("Assigned: 5");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Example option 3");
    expect(wrapper.findAll("[data-test=pile-summary-delete]").length).to.eq(1);
  });

  it("can edit vote from overview", async () => {
    expect(wrapper.emitted()["update:activeState"][5]).to.not.exist;
    await wrapper.find("[data-test=pile-summary-edit]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[5][0]).to.eq("ballot");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 1: Edit your choice for ballot selection 1",
    );
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[10][0].optionSelections[0]
        .reference,
    ).to.eq("exampleOption3");

    await wrapper.findAll("[data-test=option-checkbox]")[1].trigger("click");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[11][0].optionSelections.length,
    ).to.eq(2);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[11][0].optionSelections[0]
        .reference,
    ).to.eq("exampleOption3");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[11][0].optionSelections[1]
        .reference,
    ).to.eq("exampleOption2");
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.exist;

    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[12][0].optionSelections.length,
    ).to.eq(1);
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[12][0].optionSelections[0]
        .reference,
    ).to.eq("exampleOption2");
    expect(wrapper.find("[data-test=split-helper-confirm]").attributes().disabled).to.not.exist;

    expect(wrapper.emitted()["update:activeState"][6]).to.not.exist;
    await wrapper.find("[data-test=split-helper-confirm]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[6][0]).to.eq("assign");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 2: Edit assigned number of ballots to ballot selection 1",
    );

    await wrapper.find("[data-test=split-helper-assign-input]").setValue(6);

    expect(wrapper.emitted()["update:activeState"][7]).to.not.exist;
    await wrapper.find("[data-test=split-helper-assign-confirm]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[7][0]).to.eq("overview");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 3: Overview of ballot selections",
    );

    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[8][0].piles.length,
    ).to.eq(1);
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[8][0].piles[0].multiplier,
    ).to.eq(6);
    expect(
      (wrapper.emitted()["update:contestSelection"] as VitestEmitted)[8][0].piles[0]
        .optionSelections[0].reference,
    ).to.eq("exampleOption2");
  });

  it("can delete selection pile", async () => {
    await wrapper.setProps({
      contestSelection: getContestSelection(["half"]),
    });

    expect(wrapper.findAll("[data-test=pile-summary-edit]").length).to.eq(1);
    await wrapper.find("[data-test=pile-summary-delete]").trigger("click");

    expect(wrapper.findAll("[data-test=pile-summary-edit]").length).to.eq(0);

    expect(wrapper.emitted()["update:activeState"][8]).to.not.exist;
    await wrapper.find("[data-test=split-helper-new-selection]").trigger("click");
    expect((wrapper.emitted()["update:activeState"] as VitestEmitted)[8][0]).to.eq("ballot");
    expect(
      (wrapper.emitted()["update:activePile"] as VitestEmitted)[13][0].optionSelections.length,
    ).to.eq(0);
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[13][0].explicitBlank).to.eq(
      false,
    );
    expect((wrapper.emitted()["update:activePile"] as VitestEmitted)[13][0].multiplier).to.eq(10);

    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    await wrapper.find("[data-test=split-helper-confirm]").trigger("click");
    await wrapper.find("[data-test=split-helper-assign-confirm]").trigger("click");
  });

  it("can complete ballot", async () => {
    expect((wrapper.emitted()["update:complete"] as VitestEmitted)[0][0]).to.eq(false);
    expect(wrapper.emitted()["update:complete"][1]).to.not.exist;
    expect(wrapper.find("[data-test=split-helper-overview]").text()).to.not.contain(
      "You have assigned all your ballots and can continue",
    );
    expect(wrapper.findAll("[data-test=pile-summary-edit]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=split-helper-new-selection]").length).to.eq(1);

    await wrapper.setProps({
      contestSelection: getContestSelection(["complete"]),
    });

    expect((wrapper.emitted()["update:complete"] as VitestEmitted)[1][0]).to.eq(true);
    expect(wrapper.find("[data-test=split-helper-overview]").text()).to.contain(
      "You have assigned all your ballots and can continue",
    );
    expect(wrapper.findAll("[data-test=pile-summary-edit]").length).to.eq(2);
    expect(wrapper.findAll("[data-test=split-helper-new-selection]").length).to.eq(0);

    expect(wrapper.findAll("[data-test=pile-summary-header]")[0].text()).to.contain(
      "Ballot selection 1",
    );
    expect(wrapper.findAll("[data-test=pile-summary-header]")[1].text()).to.contain(
      "Ballot selection 2",
    );
    expect(wrapper.findAll("[data-test=pile-summary-assigned]")[0].text()).to.contain(
      "Assigned: 6",
    );
    expect(wrapper.findAll("[data-test=pile-summary-assigned]")[1].text()).to.contain(
      "Assigned: 4",
    );
    expect(wrapper.findAll("[data-test=pile-summary-body]")[0].text()).to.contain(
      "Example option 3",
    );
    expect(wrapper.findAll("[data-test=pile-summary-body]")[1].text()).to.contain(
      "Example option 1",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "da",
    });

    // Overview
    expect(wrapper.find("[data-test=split-helper-contest-title]").text()).to.contain(
      "Eksempel valgseddel",
    );
    expect(wrapper.find("[data-test=split-helper-contest-description]").text()).to.contain(
      "Dette er en beskrivelse...",
    );
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Trin 3: Oversigt over valgkombinationer",
    );
    expect(wrapper.find("[data-test=split-helper-overview]").text()).to.contain(
      "Du har tildelt alle dine stemmesedler og kan fortsætte",
    );
    expect(wrapper.find("[data-test=pile-summary-assigned]").text()).to.contain("Tildelt: 6");
    expect(wrapper.find("[data-test=pile-summary-body]").text()).to.contain("Eksempel mulighed 3");
    expect(wrapper.find("[data-test=pile-summary-delete]").attributes()["aria-label"]).to.contain(
      "Slet dette valg",
    );
    await wrapper.find("[data-test=pile-summary-delete]").trigger("click");
    expect(wrapper.find("[data-test=split-helper-overview]").text()).to.contain(
      "6  utildeltestemmesedler",
    );
    expect(wrapper.find("[data-test=split-helper-new-selection]").text()).to.contain(
      "Tilføj ny valgkombination",
    );

    // Ballot
    await wrapper.find("[data-test=split-helper-new-selection]").trigger("click");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Trin 1: Angiv dit valg for valgkombination 2",
    );
    expect(wrapper.find("[data-test=split-wizard-tooltip]").text()).to.contain(
      "Du kan tildele op til 10 stemmesedler",
    );
    expect(wrapper.find("[data-test=ballot-question]").text()).to.contain(
      "For hvem ringer klokken?",
    );
    expect(wrapper.findAll("[data-test=option]")[2].text()).to.contain("Eksempel mulighed 3");
    expect(wrapper.find("[data-test=ballot-submission-helper]").text()).to.contain(
      "Sæt ét (1) kryds",
    );
    expect(wrapper.find("[data-test=split-helper-contest-weight]").text()).to.contain(
      "Du har en stemmevægt på 10",
    );
    expect(wrapper.find("[data-test=split-helper-confirm]").text()).to.contain("Bekræft valg");

    // Assign
    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    await wrapper.find("[data-test=split-helper-confirm]").trigger("click");
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Trin 2: Tildel antal stemmesedler til valgkombination 2",
    );
    expect(wrapper.find("[data-test=split-helper-contest-question]").text()).to.contain(
      "Hvor mange stemmesedler skal have denne kombination af valgmuligheder?",
    );
    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain(
      "Dit samlede antal stemmesedler: 10",
    );
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain(
      "Allerede tildelt: 4",
    );
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain(
      "Utildelte stemmesedler: 6",
    );
    expect(wrapper.find("[data-test=split-helper-assign-back]").text()).to.contain(
      "Tilbage til valgmuligheder",
    );
    expect(wrapper.find("[data-test=split-helper-assign-confirm]").text()).to.contain(
      "Bekræft og tildel",
    );
  });
});

describe("AVSplitHelper new props", () => {
  const createWrapper = (extraProps = {}) =>
    mount(AVSplitHelper, {
      props: {
        contest: getContest([]),
        contestSelection: getContestSelection([]),
        weight: 1,
        locale: "en",
        ...extraProps,
      },
      global: {
        components: {
          AVBallot,
          AVPileSummary,
          AVSummaryOption,
          AVSplitWizardHeader,
          AVSplitWeightHelper,
          AVSubmissionHelper,
          AVBlankOption,
          AVOption,
          AVOptionCheckbox,
          AVOptionSelect,
          AVCollapser,
          AVAnimatedTransition,
          AVSearchBallot,
          AVTooltip,
          AVOptionLiveResults,
          AVOptionCounter,
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
        },
      },
    });

  it("passes partialResults to AVBallot", async () => {
    const partialResults = getLiveResult(["exampleOption1"]);
    const wrapper = createWrapper({ partialResults });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("partialResults")).to.deep.eq(partialResults);
  });

  it("passes includeLazyErrors to AVBallot", async () => {
    const wrapper = createWrapper({ includeLazyErrors: true });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("includeLazyErrors")).to.eq(true);
  });

  it("defaults includeLazyErrors to false", async () => {
    const wrapper = createWrapper();

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("includeLazyErrors")).to.eq(false);
  });

  it("passes imageOption to AVBallot", async () => {
    const wrapper = createWrapper({ imageOption: "passport" });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("imageOption")).to.eq("passport");
  });

  it("defaults imageOption to square", async () => {
    const wrapper = createWrapper();

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("imageOption")).to.eq("square");
  });

  it("passes reverseOption to AVBallot", async () => {
    const wrapper = createWrapper({ reverseOption: true });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("reverseOption")).to.eq(true);
  });

  it("defaults reverseOption to false", async () => {
    const wrapper = createWrapper();

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("reverseOption")).to.eq(false);
  });

  it("passes selectionStyle to AVBallot", async () => {
    const wrapper = createWrapper({ selectionStyle: "background" });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("selectionStyle")).to.eq("background");
  });

  it("defaults selectionStyle to checkbox", async () => {
    const wrapper = createWrapper();

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("selectionStyle")).to.eq("checkbox");
  });

  it("passes displayErrorModal to AVBallot", async () => {
    const wrapper = createWrapper({ displayErrorModal: true });

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("displayErrorModal")).to.eq(true);
  });

  it("defaults displayErrorModal to false", async () => {
    const wrapper = createWrapper();

    const ballot = wrapper.findComponent(AVBallot);
    expect(ballot.props("displayErrorModal")).to.eq(false);
  });

  it("passes imageOption to AVPileSummary in split mode", async () => {
    const wrapper = createWrapper({
      weight: 10,
      contestSelection: getContestSelection(["half"]),
      imageOption: "passport",
    });

    const pileSummaries = wrapper.findAllComponents(AVPileSummary);
    expect(pileSummaries.length).to.be.greaterThan(0);
    pileSummaries.forEach((summary) => {
      expect(summary.props("imageOption")).to.eq("passport");
    });
  });
});
