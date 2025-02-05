import type { Meta } from "@/types";
import { AVOptionLiveResults } from "@/components";
import { LIVE_RESULT_MODES, SUPPORTED_LOCALES } from "@/constants";
import { getLiveResult } from "@/examples";

const meta: Meta<typeof AVOptionLiveResults> = {
  title: "Design System/Atoms/AVOptionLiveResults",
  component: AVOptionLiveResults,
  tags: ["autodocs"],
  argTypes: {
    partialResults: {
      control: { type: "object" },
    },
    mode: {
      control: { type: "select" },
      options: LIVE_RESULT_MODES,
    },
    showPercentage: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVOptionLiveResults },
  setup() {
    return { args };
  },
  template: '<AVOptionLiveResults v-bind="args" />',
});

export const InternalWithoutPercentage = {
  render: Template,

  args: {
    partialResults: getLiveResult(["blank"]).blank,
  },
};

export const InternalWithPercentage = {
  render: Template,

  args: {
    partialResults: getLiveResult(["blank"], true).blank,
    showPercentage: true,
  },
};

export const ExternalWithoutPercentage = {
  render: Template,

  args: {
    mode: "external",
    partialResults: getLiveResult(["blank"]).blank,
  },
};

export const ExternalWithPercentage = {
  render: Template,

  args: {
    mode: "external",
    partialResults: getLiveResult(["blank"], true).blank,
    showPercentage: true,
  },
};
