import type { Meta } from "@/types";
import { AVRankedSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples";

const meta: Meta<typeof AVRankedSummary> = {
  title: "Design System/Organisms/AVRankedSummary",
  component: AVRankedSummary,
  tags: ["autodocs"],
  argTypes: {
    result: {
      control: { type: "object" },
    },
    distributionNumber: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    seats: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    hideElected: {
      control: { type: "boolean" },
    },
    hideTied: {
      control: { type: "boolean" },
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
  components: { AVRankedSummary },
  setup() {
    return { args };
  },
  template: '<AVRankedSummary v-bind="args" />',
});

export const Elected = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 1,
    result: [
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        rounds: [
          {
            count: 2,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
          {
            count: 5,
            elected: true,
            tied: false,
          },
        ],
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        rounds: [
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
    ],
  },
};

export const Tied = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 1,
    result: [
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        rounds: [
          {
            count: 2,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
          {
            count: 4,
            elected: false,
            tied: true,
          },
        ],
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        rounds: [
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 4,
            elected: false,
            tied: true,
          },
        ],
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
    ],
  },
};

export const ElectedDark = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    distributionNumber: 5,
    seats: 1,
    theme: "dark",
    result: [
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        rounds: [
          {
            count: 2,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
          {
            count: 5,
            elected: true,
            tied: false,
          },
        ],
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        rounds: [
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
    ],
  },
};

export const TiedDark = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    distributionNumber: 5,
    seats: 1,
    theme: "dark",
    result: [
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        rounds: [
          {
            count: 2,
            elected: false,
            tied: false,
          },
          {
            count: 3,
            elected: false,
            tied: false,
          },
          {
            count: 4,
            elected: false,
            tied: true,
          },
        ],
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        rounds: [
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 4,
            elected: false,
            tied: true,
          },
        ],
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
          {
            count: 1,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        rounds: [
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
          {
            count: 0,
            elected: false,
            tied: false,
          },
        ],
        elected: false,
        tied: false,
      },
    ],
  },
};
