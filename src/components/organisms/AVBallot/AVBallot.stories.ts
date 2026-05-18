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
    weight: {
      control: { type: "number", min: 1, step: 1 },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    reverseOption: {
      control: { type: "boolean" },
    },
    selectionStyle: {
      control: { type: "select" },
      options: ["checkbox", "background"],
    },
    displayErrorModal: {
      control: { type: "boolean" },
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
  template:
    '<div><AVBallot v-bind="args" /><div id="ballot-action-buttons" class="mt-4 bg-danger-subtle border border-danger p-3 hstack justify-content-center">External #ballot-action-buttons section</div></div>',
});

export const Default = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const WithWriteIn = {
  render: Template,

  args: {
    contest: getContest(["blank", "write_in"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const MultipleVotes = {
  render: Template,

  args: {
    contest: getContest(["blank", "multi"]),
    selectionPile: getSelectionPile(["multi"]),
    weight: 1,
  },
};

export const Ranked = {
  render: Template,

  args: {
    contest: getContest(["blank", "ranked"]),
    selectionPile: getSelectionPile(["multi"]),
    weight: 1,
  },
};

export const WithoutSubmissionHelper = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    selectionPile: getSelectionPile([]),
    showSubmissionHelper: false,
    weight: 1,
  },
};

export const WithError = {
  render: Template,

  args: {
    contest: getContest(["blank", "multi"]),
    selectionPile: getSelectionPile(["blank", "multi"]),
    weight: 1,
  },
};

export const WithSearchForm = {
  render: Template,

  args: {
    contest: getContest(["blank", "search_form"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const Handraise = {
  render: Template,

  args: {
    contest: getContest(["color_options", "blank"]),
    selectionPile: getSelectionPile([]),
    partialResults: getLiveResult(["exampleOption1", "exampleOption2", "exampleOption3", "blank"]),
    weight: 1,
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
    weight: 1,
  },
};

export const LessThan5VotesPerOption = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_sm"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const MoreThan5VotesPerOption = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_lg"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const MultivoteWithCounterInterface = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_lg", "counter"]),
    selectionPile: getSelectionPile(["multivote"]),
    weight: 1,
  },
};

export const WithChildren = {
  render: Template,

  args: {
    contest: getContest(["children_options", "collapsable", "blank"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const ObserverMode = {
  render: Template,

  args: {
    contest: getContest([]),
    observerMode: true,
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const Disabled = {
  render: Template,

  args: {
    contest: getContest([]),
    disabled: true,
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const HugeContest = {
  render: Template,

  args: {
    contest: getContest(["huge"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const GalleryMode = {
  render: Template,

  args: {
    contest: getContest(["gallery"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const GalleryModeWithParentsAndBlank = {
  render: Template,

  args: {
    contest: getContest(["gallery_parents"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};

export const QuadraticVoting = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_lg", "counter", "quadratic_voting"]),
    selectionPile: getSelectionPile([]),
    weight: 1,
  },
};
