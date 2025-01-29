import type { Meta } from "@/types";
import { AVSummaryOption } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples";

const meta: Meta<typeof AVSummaryOption> = {
  title: "Design System/Molecules/AVSummaryOption",
  component: AVSummaryOption,
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: { type: "object" },
    },
    multipleVotesAllowed: {
      control: { type: "boolean" },
    },
    blank: {
      control: { type: "boolean" },
    },
    parents: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSummaryOption },
  setup() {
    return { args };
  },
  template: '<AVSummaryOption v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    option: {
      title: getOption([], 1).title,
      handle: getOption([], 1).reference,
      crosses: 1,
      rank: null,
    },
    blank: false,
    multipleVotesAllowed: false,
  },
};

export const Ranked = {
  render: Template,

  args: {
    option: {
      title: getOption([], 1).title,
      handle: getOption([], 1).reference,
      crosses: 1,
      rank: 1,
    },
    blank: false,
    multipleVotesAllowed: false,
  },
};

export const WithParents = {
  render: Template,

  args: {
    option: {
      title: getOption([], 1).title,
      handle: getOption([], 1).reference,
      crosses: 1,
      rank: 1,
    },
    blank: false,
    multipleVotesAllowed: false,
    parents: [{ title: { en: "Parent 1" } }, { title: { en: "Parent 2" } }],
  },
};

export const Blank = {
  render: Template,

  args: {
    blank: true,
    multipleVotesAllowed: false,
  },
};

export const MultipleVotes = {
  render: Template,

  args: {
    option: {
      title: getOption([], 1).title,
      handle: getOption([], 1).reference,
      crosses: 5,
      rank: null,
    },
    blank: false,
    multipleVotesAllowed: true,
  },
};
