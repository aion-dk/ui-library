import type { Meta } from "@/types";
import { AVSplitHelper } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getContestSelection, getContest } from "@/examples";

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
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    partialResults: {
      control: { type: "object" },
    },
    showSubmissionHelper: {
      control: { type: "boolean" },
    },
    "onUpdate:activePile": {
      action: "onUpdate:activePile: UPDATED",
    },
    "onUpdate:activeState": {
      action: "onUpdate:activePile: UPDATED",
    },
    "onUpdate:complete": {
      action: "onUpdate:activePile: UPDATED",
    },
    "onUpdate:contestSelection": {
      action: "onUpdate:activePile: UPDATED",
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
