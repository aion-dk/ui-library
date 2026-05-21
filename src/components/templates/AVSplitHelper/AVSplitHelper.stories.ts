import type { Meta } from "@/types";
import { AVSplitHelper } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getContestSelection, getContest, getValidationPolicy } from "@/examples";

const meta: Meta<typeof AVSplitHelper> & {
  argTypes: {
    "onUpdate:activePile": { action: string };
    "onUpdate:activeState": { action: string };
    "onUpdate:complete": { action: string };
    "onUpdate:contestSelection": { action: string };
  };
} = {
  title: "Design System/Templates/AVSplitHelper",
  component: AVSplitHelper,
  tags: ["autodocs"],
  argTypes: {
    contest: {
      control: { type: "object" },
    },
    contestSelection: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    weight: {
      control: { type: "number", min: 1, max: 100, step: 1 },
    },
    partialResults: {
      control: { type: "object" },
    },
    showSubmissionHelper: {
      control: { type: "boolean" },
    },
    reverseOption: {
      control: { type: "boolean" },
    },
    selectionStyle: {
      control: { type: "select" },
      options: ["checkbox", "background"],
    },
    "onUpdate:activePile": {
      action: "onUpdate:activePile: UPDATED",
    },
    "onUpdate:activeState": {
      action: "onUpdate:activeState: UPDATED",
    },
    "onUpdate:complete": {
      action: "onUpdate:complete: UPDATED",
    },
    "onUpdate:contestSelection": {
      action: "onUpdate:contestSelection: UPDATED",
    },
    "onUpdate:pendingAlerts": {
      action: "onUpdate:pendingAlerts: UPDATED",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSplitHelper },
  setup() {
    return { args };
  },
  template: '<AVSplitHelper v-bind="args" />',
});

export const NonSplit = {
  render: Template,

  args: {
    contest: getContest(["blank", "description"]),
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const NonSplitWithWriteIn = {
  render: Template,

  args: {
    contest: getContest(["blank", "description", "write_in"]),
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const NormalBallot = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    contestSelection: getContestSelection([]),
    weight: 10,
  },
};

export const MultiBallot = {
  render: Template,

  args: {
    contest: getContest(["multi"]),
    contestSelection: getContestSelection([]),
    weight: 10,
  },
};

export const RankedBallot = {
  render: Template,

  args: {
    contest: getContest(["ranked"]),
    contestSelection: getContestSelection([]),
    weight: 10,
  },
};

export const OverviewIncomplete = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    contestSelection: getContestSelection(["half"]),
    weight: 10,
  },
};

export const OverviewSuccess = {
  render: Template,

  args: {
    contest: getContest(["blank"]),
    contestSelection: getContestSelection(["complete"]),
    weight: 10,
  },
};

export const MultiVotingWithCounterInterface = {
  render: Template,

  args: {
    contest: getContest(["blank", "multiple_votes_lg", "counter", "many_options"]),
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const QuadraticVoting = {
  render: Template,

  args: {
    contest: getContest(["multiple_votes_lg", "huge", "quadratic_voting"]),
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const WithValidationPolicyUndervoteWarn = {
  render: Template,

  args: {
    contest: {
      ...getContest(["blank", "multi"]),
      validationPolicy: getValidationPolicy("undervote_warn"),
    },
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const WithValidationPolicyOvervoteBlock = {
  render: Template,

  args: {
    contest: {
      ...getContest(["blank", "multi"]),
      validationPolicy: getValidationPolicy("overvote_block"),
    },
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const WithValidationPolicyRadioButton = {
  render: Template,

  args: {
    contest: {
      ...getContest(["blank"]),
      validationPolicy: getValidationPolicy("radio_button"),
    },
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const WithValidationPolicyBlankVoteFeedback = {
  render: Template,

  args: {
    contest: {
      ...getContest(["blank", "multi"]),
      validationPolicy: getValidationPolicy("blank_vote_feedback"),
    },
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};

export const WithValidationPolicyMixed = {
  render: Template,

  args: {
    contest: {
      ...getContest(["blank", "multi"]),
      validationPolicy: getValidationPolicy("mixed"),
    },
    contestSelection: getContestSelection([]),
    weight: 1,
  },
};
