import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getSelectionPile } from "@/examples";

import AVSplitWizardHeader from "./AVSplitWizardHeader.vue";
import AVTooltip from "@/components/atoms/AVTooltip";

describe("AVSplitWizardHeader", () => {
  const wrapper = mount(AVSplitWizardHeader, {
    props: {
      selectionPiles: [getSelectionPile([])],
      activeState: "ballot",
      activeSelectionPileIndex: 2,
      totalWeight: 10,
      isEditing: false,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
      components: { AVTooltip },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 1: Make your choice for ballot selection 2",
    );
    expect(wrapper.find("[data-test=split-wizard-tooltip]").text()).to.contain(
      "You can assign your choices up to 10 ballots",
    );

    await wrapper.setProps({
      activeState: "assign",
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 2: Assign number of ballots to ballot selection 2",
    );
    expect(wrapper.findAll("[data-test=split-wizard-tooltip]").length).to.eq(0);

    await wrapper.setProps({
      activeState: "overview",
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 3: Overview of ballot selections",
    );
    expect(wrapper.findAll("[data-test=split-wizard-tooltip]").length).to.eq(0);
  });

  it("can enter edit mode", async () => {
    await wrapper.setProps({
      activeSelectionPileIndex: 5,
      activeState: "ballot",
      isEditing: true,
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 1: Edit your choice for ballot selection 6",
    );
    expect(wrapper.find("[data-test=split-wizard-tooltip]").text()).to.contain(
      "You can assign your choices up to 10 ballots",
    );

    await wrapper.setProps({
      activeState: "assign",
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Step 2: Edit assigned number of ballots to ballot selection 6",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "fr",
      activeState: "ballot",
      isEditing: false,
    });

    expect(wrapper.find("[data-test=split-wizard-header]").text()).to.contain(
      "Étape 1: Ajout de la sélection des bulletins de vote 2",
    );
    expect(wrapper.find("[data-test=split-wizard-tooltip]").text()).to.contain(
      "Vous pouvez attribuer vos choix jusqu'à 10 bulletins de vote",
    );
  });
});
