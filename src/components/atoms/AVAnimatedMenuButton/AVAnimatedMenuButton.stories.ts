import type { Meta } from "@/types";
import { AVAnimatedMenuButton } from "@/components";
import { SUPPORTED_LOCALES, ANIMATED_MENU_BUTTON_VARIANTS } from "@/constants";

const meta: Meta<typeof AVAnimatedMenuButton> = {
  title: "Design System/Atoms/AVAnimatedMenuButton",
  component: AVAnimatedMenuButton,
  tags: ["autodocs"],
  argTypes: {
    isOpened: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ANIMATED_MENU_BUTTON_VARIANTS,
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    "onUpdate:isOpened": { action: "v-model: VALUE CHANGED" },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVAnimatedMenuButton },
  setup() {
    return { args };
  },
  template: '<AVAnimatedMenuButton v-bind="args" />',
});

export const DarkClosed = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },

  args: {
    theme: "dark",
  },
};

export const DarkCrossOpened = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },

  args: {
    isOpened: true,
    variant: "cross",
    theme: "dark",
  },
};

export const DarkArrowDownOpened = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },

  args: {
    isOpened: true,
    variant: "arrow-down",
    theme: "dark",
  },
};

export const LightClosed = {
  render: Template,

  args: {
    isOpened: false,
    theme: "light",
  },
};

export const LightCrossOpened = {
  render: Template,

  args: {
    isOpened: true,
    variant: "cross",
    theme: "light",
  },
};

export const LightArrowDownOpened = {
  render: Template,

  args: {
    isOpened: true,
    variant: "arrow-down",
    theme: "light",
  },
};
