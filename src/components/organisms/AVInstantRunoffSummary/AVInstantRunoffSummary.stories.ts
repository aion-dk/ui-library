import type { Meta } from "@/types";
import { AVInstantRunoffSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption, getVoteCounts } from "@/examples";

const meta: Meta<typeof AVInstantRunoffSummary> = {
  title: "Design System/Organisms/AVInstantRunoffSummary",
  component: AVInstantRunoffSummary,
  tags: ["autodocs"],
  argTypes: {
    rounds: {
      control: { type: "object" },
    },
    sortedResult: {
      control: { type: "object" },
    },
    seatNumber: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    quota: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    totalVotes: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    blankVotes: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    votesNotIncluded: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    voteCounts: {
      control: { type: "object" },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVInstantRunoffSummary },
  setup() {
    return { args };
  },
  template: '<AVInstantRunoffSummary v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    rounds: [
      {
        counts: {
          exampleOption1: 3,
          exampleOption3: 0,
          exampleOption2: 1,
          exampleOption4: 0,
        },
        eliminated: "exampleOption4",
        exhausted: 0,
        elected: "exampleOption1",
        transferred: 0,
        event: "option 'Example option 1' elected by majority - option 'exampleOption4' eliminated",
      },
      {
        counts: { exampleOption1: 3, exampleOption3: 0, exampleOption2: 1 },
        eliminated: "exampleOption3",
        exhausted: 0,
        elected: null,
        transferred: 0,
        event: "option 'Example option 3' eliminated",
      },
      {
        counts: { exampleOption1: 3, exampleOption2: 1 },
        eliminated: "exampleOption2",
        exhausted: 0,
        elected: null,
        transferred: 0,
        event: "option 'Example option 2' eliminated",
      },
      {
        counts: { exampleOption1: 4 },
        eliminated: null,
        exhausted: 0,
        elected: null,
        transferred: 1,
        event: "report progresses to end with one option left",
      },
    ],
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
      },
    ],
    seatNumber: 1,
    quota: 5,
    totalVotes: 10,
    blankVotes: 1,
    votesNotIncluded: null,
    voteCounts: getVoteCounts(),
  },
};

export const DarkMode = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    theme: "dark",
    rounds: [
      {
        counts: {
          exampleOption1: 3,
          exampleOption3: 0,
          exampleOption2: 1,
          exampleOption4: 0,
        },
        eliminated: "exampleOption4",
        exhausted: 0,
        elected: "exampleOption1",
        transferred: 0,
        event: "option 'Example option 1' elected by majority - option 'exampleOption4' eliminated",
      },
      {
        counts: { exampleOption1: 3, exampleOption3: 0, exampleOption2: 1 },
        eliminated: "exampleOption3",
        exhausted: 0,
        elected: null,
        transferred: 0,
        event: "option 'Example option 3' eliminated",
      },
      {
        counts: { exampleOption1: 3, exampleOption2: 1 },
        eliminated: "exampleOption2",
        exhausted: 0,
        elected: null,
        transferred: 0,
        event: "option 'Example option 2' eliminated",
      },
      {
        counts: { exampleOption1: 4 },
        eliminated: null,
        exhausted: 0,
        elected: null,
        transferred: 1,
        event: "report progresses to end with one option left",
      },
    ],
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
      },
    ],
    seatNumber: 1,
    quota: 5,
    totalVotes: 10,
    blankVotes: 1,
    votesNotIncluded: null,
    voteCounts: getVoteCounts(),
  },
};
