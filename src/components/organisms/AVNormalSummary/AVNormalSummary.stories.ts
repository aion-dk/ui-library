import type { Meta, NormalResultListGroup, OptionContent } from "@/types";
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
        imageUrl: getOption(["selectable", "image"], 1).image,
        count: 30,
        elected: true,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 2).reference,
        title: getOption(["selectable", "image"], 2).title,
        imageUrl: getOption(["selectable", "image"], 2).image,
        count: 20,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 3).reference,
        title: getOption(["selectable", "image"], 3).title,
        imageUrl: getOption(["selectable", "image"], 3).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 4).reference,
        title: getOption(["selectable", "image"], 4).title,
        imageUrl: getOption(["selectable", "image"], 4).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 5).reference,
        title: getOption(["selectable", "image"], 5).title,
        imageUrl: getOption(["selectable", "image"], 5).image,
        count: 10,
        elected: false,
        tied: false,
      },
      {
        reference: getOption(["selectable", "image"], 6).reference,
        title: getOption(["selectable", "image"], 6).title,
        imageUrl: getOption(["selectable", "image"], 6).image,
        count: 10,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 100,
    voteCounts: getVoteCounts(),
  },
};

export const ListResults = {
  render: Template,

  args: {
    sortedResult: [
      toGroup(getOption(["selectable", "children", "image"], 1), [40, 101, 91], [1, 2], 2),
      toGroup(getOption(["selectable", "children", "image"], 2), [6, 4, 2], [], null),
      {
        reference: getOption(["selectable"], 3).reference,
        title: getOption(["selectable"], 3).title,
        imageUrl: getOption(["selectable"], 3).image,
        count: 1,
        elected: false,
        tied: false,
      },
      {
        reference: "blank",
        title: { en: "Blank" },
        count: 0,
        elected: false,
        tied: false,
      },
    ],
    totalCount: 245,
    voteCounts: getVoteCounts(),
  },
};

function toGroup(
  parent: OptionContent,
  counts: number[],
  elected: number[],
  seats: number | null,
): NormalResultListGroup {
  return {
    reference: parent.reference,
    title: parent.title,
    imageUrl: parent.image ?? null,
    seats,
    children: [parent, ...(parent.children ?? [])].map((option, index) => ({
      reference: option.reference,
      title: option.title,
      imageUrl: option.image ?? null,
      count: counts[index] ?? 0,
      elected: elected.includes(index),
      tied: false,
    })),
  };
}
