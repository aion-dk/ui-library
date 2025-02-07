import type { Meta } from "@/types";
import { AVSplitWizardHeader } from "@/components";
import { SPLIT_HELPER_STATE, SUPPORTED_LOCALES } from "@/constants";
import { getSelectionPile } from "@/examples";

const meta: Meta<typeof AVSplitWizardHeader> = {
  title: "Design System/Molecules/AVSplitWizardHeader",
  component: AVSplitWizardHeader,
  tags: ["autodocs"],
  argTypes: {
    activeSelectionPileIndex: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    activeState: {
      control: { type: "select" },
      options: SPLIT_HELPER_STATE,
    },
    selectionPiles: {
      control: { type: "object" },
    },
    totalWeight: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    isEditing: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSplitWizardHeader },
  setup() {
    return { args };
  },
  template: '<AVSplitWizardHeader v-bind="args" />',
});

export const BallotDefault = {
  render: Template,

  args: {
    selectionPiles: [getSelectionPile([])],
    activeState: "ballot",
    activeSelectionPileIndex: 2,
    totalWeight: 10,
    isEditing: false,
  },
};

export const BallotEditMode = {
  render: Template,

  args: {
    selectionPiles: [getSelectionPile([])],
    activeState: "ballot",
    activeSelectionPileIndex: 1,
    totalWeight: 10,
    isEditing: true,
  },
};

export const AssignDefault = {
  render: Template,

  args: {
    selectionPiles: [getSelectionPile([])],
    activeState: "assign",
    activeSelectionPileIndex: 2,
    totalWeight: 10,
    isEditing: false,
  },
};

export const AssignEditMode = {
  render: Template,

  args: {
    selectionPiles: [getSelectionPile([])],
    activeState: "assign",
    activeSelectionPileIndex: 1,
    totalWeight: 10,
    isEditing: true,
  },
};

export const Overview = {
  render: Template,

  args: {
    selectionPiles: [getSelectionPile([])],
    activeState: "overview",
    activeSelectionPileIndex: 2,
    totalWeight: 10,
    isEditing: false,
  },
};
