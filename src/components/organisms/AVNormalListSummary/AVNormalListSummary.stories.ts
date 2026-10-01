import type { Meta, NormalResult, OptionContent } from "@/types";
import { AVNormalListSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOptions, getVoteCounts } from "@/examples";

const meta: Meta<typeof AVNormalListSummary> = {
  title: "Design System/Organisms/AVNormalListSummary",
  component: AVNormalListSummary,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "object" },
    },
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
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVNormalListSummary },
  setup() {
    return { args };
  },
  template: '<AVNormalListSummary v-bind="args" />',
});

const toResults = (
  options: OptionContent[],
  counts: number[],
  elected: number[] = [],
  tied: number[] = [],
): NormalResult[] => {
  const flat = options.flatMap((option) => [
    ...(option.selectable ? [option] : []),
    ...(option.children ?? []),
  ]);

  return [
    ...flat.map((option, index) => ({
      reference: option.reference,
      title: option.title,
      count: counts[index] ?? 0,
      elected: elected.includes(index),
      tied: tied.includes(index),
    })),
    {
      reference: "blank",
      title: { en: "Blank" },
      count: 10,
      elected: false,
      tied: false,
    },
  ];
};

const selectableParents = getOptions(["selectable", "children"], 2);
const groupParents = getOptions(["children"], 2);

export const Elected = {
  render: Template,

  args: {
    options: groupParents,
    sortedResult: toResults(groupParents, [101, 91, 89, 75], [0, 1, 2]),
    totalCount: 366,
    voteCounts: getVoteCounts(),
  },
};

export const SelectableParents = {
  render: Template,

  args: {
    options: selectableParents,
    sortedResult: toResults(selectableParents, [40, 101, 91, 30, 89, 75], [1, 2, 4]),
    totalCount: 436,
    voteCounts: getVoteCounts(),
  },
};

export const Tied = {
  render: Template,

  args: {
    options: groupParents,
    sortedResult: toResults(groupParents, [101, 91, 89, 89], [0, 1], [2, 3]),
    totalCount: 380,
    voteCounts: getVoteCounts(),
  },
};

export const HidePercentage = {
  render: Template,

  args: {
    options: groupParents,
    sortedResult: toResults(groupParents, [101, 91, 89, 75], [0, 1, 2]),
    totalCount: 366,
    hidePercentage: true,
    voteCounts: getVoteCounts(),
  },
};

export const HideElected = {
  render: Template,

  args: {
    options: groupParents,
    sortedResult: toResults(groupParents, [101, 91, 89, 75], [0, 1, 2]),
    totalCount: 366,
    hideElected: true,
    voteCounts: getVoteCounts(),
  },
};
