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

export const PolicyWarningInline = {
  render: Template,
  args: {
    minMarks: 1,
    maxMarks: 3,
    chosenCount: 2,
    errors: [],
    hasExclusiveOptions: false,
    policyInlineResults: [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "warnings.undervote_between",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      },
    ],
    activeScreen: "ballot_page",
  },
};

export const PolicyErrorInline = {
  render: Template,
  args: {
    minMarks: 1,
    maxMarks: 3,
    chosenCount: 4,
    errors: [],
    hasExclusiveOptions: false,
    policyInlineResults: [
      {
        scenario: "overvote",
        allowed: false,
        warning: false,
        blocked: true,
        feedbackMessage: "errors.overvote",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      },
    ],
    activeScreen: "ballot_page",
  },
};

export const PolicyWarningOnReviewPage = {
  render: Template,
  args: {
    minMarks: 1,
    maxMarks: 3,
    chosenCount: 2,
    errors: [],
    hasExclusiveOptions: false,
    policyInlineResults: [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "warnings.undervote_between",
        feedbackScreen: "ballot_and_review_page",
        feedbackType: "on_screen_message",
      },
    ],
    activeScreen: "review_page",
  },
};
