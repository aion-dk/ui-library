import type { Meta } from "@/types";
import { AVBallot } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getContest, getLiveResult, getSelectionPile } from "@/examples";

const meta: Meta<typeof AVBallot> & {
  argTypes: { "onUpdate:selectionPile": { action: string } };
} = {
  title: "Design System/Organisms/AVBallot",
  component: AVBallot,
  tags: ["autodocs"],
  argTypes: {
    selectionPile: {
      control: { type: "object" },
    },
    contest: {
      control: { type: "object" },
    },
    partialResults: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    observerMode: {
      control: { type: "boolean" },
    },
    showSubmissionHelper: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    "onUpdate:selectionPile": {
      action: "update:selectionPile: UPDATED SELECTION PILE",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVBallot },
  setup() {
    return { args };
  },
  template: '<AVBallot v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    selectionPile: getSelectionPile([]),
  },
};

export const MultipleVotes = {
  render: Template,

  args: {
    contest: getContest(["blank", "multi"]),
    selectionPile: getSelectionPile(["multi"]),
  },
};

export const Ranked = {
  render: Template,

  args: {
    contest: getContest(["blank", "ranked"]),
    selectionPile: getSelectionPile(["multi"]),
  },
};

export const WithoutSubmissionHelper = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    selectionPile: getSelectionPile([]),
    showSubmissionHelper: false,
  },
};

export const WithError = {
  render: Template,

  args: {
    contest: getContest(["blank", "multi"]),
    selectionPile: getSelectionPile(["blank", "multi"]),
  },
};

export const WithSearchForm = {
  render: Template,

  args: {
    contest: getContest(["blank", "search_form"]),
    selectionPile: getSelectionPile([]),
  },
};

export const Handraise = {
  render: Template,

  args: {
    contest: getContest(["color_options", "blank"]),
    selectionPile: getSelectionPile([]),
    partialResults: getLiveResult(["exampleOption1", "exampleOption2", "exampleOption3", "blank"]),
  },
};

export const HandraiseWithPercentage = {
  render: Template,

  args: {
    contest: getContest(["color_options", "blank"]),
    selectionPile: getSelectionPile([]),
    partialResults: getLiveResult(
      ["exampleOption1", "exampleOption2", "exampleOption3", "blank"],
      true,
    ),
  },
};

export const LessThan5VotesPerOption = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_sm"]),
    selectionPile: getSelectionPile([]),
  },
};

export const MoreThan5VotesPerOption = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_lg"]),
    selectionPile: getSelectionPile([]),
  },
};

export const WithChildren = {
  render: Template,

  args: {
    contest: getContest(["children_options", "collapsable", "blank"]),
    selectionPile: getSelectionPile([]),
  },
};

export const ObserverMode = {
  render: Template,

  args: {
    contest: getContest([]),
    observerMode: true,
    selectionPile: getSelectionPile([]),
  },
};

export const Disabled = {
  render: Template,

  args: {
    contest: getContest([]),
    disabled: true,
    selectionPile: getSelectionPile([]),
  },
};
