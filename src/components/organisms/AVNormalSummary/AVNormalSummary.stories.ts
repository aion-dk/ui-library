import type { Meta } from "@/types";
import { AVNormalSummary } from "@/components";
import { getOption, getVoteCounts } from "@/examples";

const meta: Meta<typeof AVNormalSummary> = {
  title: "Design System/Organisms/AVNormalSummary",
  component: AVNormalSummary,
  tags: ["autodocs"],
  argTypes: {
    sortedResult: {
      control: { type: "object" },
    },
    hidePercentage: {
      control: { type: "boolean" },
    },
    hideElected: {
      control: { type: "boolean" },
    },
    hideTied: {
      control: { type: "boolean" },
    },
    disregardBlank: {
      control: { type: "boolean" },
    },
    voteCounts: {
      control: { type: "object" },
    },
    totalCount: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVNormalSummary },
  setup() {
    return { args };
  },
  template: '<AVNormalSummary v-bind="args" />',
});

export const Elected = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        count: 30,
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 5).reference,
        title: getOption(["selectable"], 5).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 6).reference,
        title: getOption(["selectable"], 6).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: "blank",
        title: { en: "Blank" },
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    voteCounts: getVoteCounts(),
  },
};

export const Tied = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        count: 30,
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        count: 30,
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 5).reference,
        title: getOption(["selectable"], 5).title,
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    voteCounts: getVoteCounts(),
  },
};

export const HandledTie = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        count: 30,
        elected: false,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        count: 30,
        elected: true,
        tied: true,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 5).reference,
        title: getOption(["selectable"], 5).title,
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    voteCounts: getVoteCounts(),
  },
};

export const HidePercentage = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        count: 30,
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 5).reference,
        title: getOption(["selectable"], 5).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 6).reference,
        title: getOption(["selectable"], 6).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 7).reference,
        title: getOption(["selectable"], 7).title,
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    hidePercentage: true,
    voteCounts: getVoteCounts(),
  },
};

export const DisregardBlank = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable"], 1).reference,
        title: getOption(["selectable"], 1).title,
        count: 30,
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 4).reference,
        title: getOption(["selectable"], 4).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 5).reference,
        title: getOption(["selectable"], 5).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable"], 6).reference,
        title: getOption(["selectable"], 6).title,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: "blank",
        title: { en: "Blank" },
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    disregardBlank: true,
    voteCounts: getVoteCounts(),
  },
};

export const OptionsWithImage = {
  render: Template,

  args: {
    sortedResult: [
      {
        reference: getOption(["selectable", "image"], 1).reference,
        title: getOption(["selectable", "image"], 1).title,
        image: getOption(["selectable", "image"], 1).image,
        count: 30,
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 2).reference,
        title: getOption(["selectable", "image"], 2).title,
        image: getOption(["selectable", "image"], 2).image,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 3).reference,
        title: getOption(["selectable", "image"], 3).title,
        image: getOption(["selectable", "image"], 3).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 4).reference,
        title: getOption(["selectable", "image"], 4).title,
        image: getOption(["selectable", "image"], 4).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 5).reference,
        title: getOption(["selectable", "image"], 5).title,
        image: getOption(["selectable", "image"], 5).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 6).reference,
        title: getOption(["selectable", "image"], 6).title,
        image: getOption(["selectable", "image"], 6).image,
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    voteCounts: getVoteCounts(),
  },
};
