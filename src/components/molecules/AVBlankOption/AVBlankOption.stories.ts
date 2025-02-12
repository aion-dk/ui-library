import type { Meta } from "@/types";
import { AVBlankOption } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getLiveResult } from "@/examples";

const meta: Meta<typeof AVBlankOption> & {
  argTypes: { onToggleBlank: { action: string } };
} = {
  title: "Design System/Molecules/AVBlankOption",
  component: AVBlankOption,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    accentColor: {
      control: { type: "color" },
    },
    observerMode: {
      control: { type: "boolean" },
    },
    partialResults: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    onToggleBlank: {
      action: "toggleBlank: BLANK TOGGLED",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVBlankOption },
  setup() {
    return { args };
  },
  template: '<AVBlankOption v-bind="args" />',
});

export const Unchecked = {
  render: Template,

  args: {
    checked: false,
    error: false,
  },
};

export const Checked = {
  render: Template,

  args: {
    checked: true,
    error: false,
  },
};

export const Disabled = {
  render: Template,

  args: {
    disabled: true,
    checked: false,
    error: false,
  },
};

export const WithAccentColor = {
  render: Template,

  args: {
    accentColor: "#BB22FF",
    checked: false,
    error: false,
  },
};

export const WithLiveResults = {
  render: Template,

  args: {
    disabled: false,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"]).blank,
  },
};

export const WithLiveResultsAndPercentage = {
  render: Template,

  args: {
    disabled: false,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"], true).blank,
  },
};

export const WithLiveResultsAndDisabled = {
  render: Template,

  args: {
    disabled: true,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"]).blank,
  },
};

export const WithLiveResultsAndPercentageAndDisabled = {
  render: Template,

  args: {
    disabled: true,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"], true).blank,
  },
};

export const ObserverMode = {
  render: Template,

  args: {
    observerMode: true,
    checked: false,
    error: false,
  },
};

export const ObserverModeWithLiveResults = {
  render: Template,

  args: {
    disabled: false,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"]).blank,
    observerMode: true,
  },
};

export const ObserverModeWithLiveResultsAndPercentage = {
  render: Template,

  args: {
    disabled: false,
    checked: false,
    error: false,
    partialResults: getLiveResult(["blank"], true).blank,
    observerMode: true,
  },
};

export const ExclusiveError = {
  render: Template,

  args: {
    checked: true,
    error: true,
  },
};
