import type { Meta } from "@/types";
import { SUPPORTED_LOCALES } from "@/constants";
import { AVSubmissionHelper } from "@/components";

const meta: Meta<typeof AVSubmissionHelper> = {
  title: "Design System/Molecules/AVSubmissionHelper",
  component: AVSubmissionHelper,
  tags: ["autodocs"],
  argTypes: {
    minMarks: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    maxMarks: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    chosenCount: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    errors: {
      control: { type: "object" },
    },
    hasExclusiveOptions: {
      control: { type: "boolean" },
    },
    displayScrollToBottom: {
      control: { type: "boolean" },
    },
    voiceCredits: {
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
  components: { AVSubmissionHelper },
  setup() {
    return { args };
  },
  template: '<AVSubmissionHelper v-bind="args" />',
});

export const Single = {
  render: Template,

  args: {
    minMarks: 1,
    maxMarks: 1,
    chosenCount: 1,
    errors: [],
  },
};

export const Multiple = {
  render: Template,

  args: {
    minMarks: 1,
    maxMarks: 5,
    chosenCount: 3,
    errors: [],
  },
};

export const MultipleWithExclusives = {
  render: Template,

  args: {
    minMarks: 1,
    maxMarks: 5,
    chosenCount: 5,
    errors: [],
    hasExclusiveOptions: true,
  },
};

export const Error = {
  render: Template,

  args: {
    minMarks: 1,
    maxMarks: 1,
    chosenCount: 3,
    errors: [{ message: "too_many" }],
  },
};

export const MultipleWithExclusivesError = {
  render: Template,

  args: {
    minMarks: 1,
    maxMarks: 4,
    chosenCount: 2,
    errors: [{ message: "too_many" }, { message: "exclusive" }],
    hasExclusiveOptions: true,
  },
};
