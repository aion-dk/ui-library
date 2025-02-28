import type { Meta } from "@/types";
import { AVAnimatedMenuButton } from "@/components";

const meta: Meta<typeof AVAnimatedMenuButton> = {
  title: "Design System/Atoms/AVAnimatedMenuButton",
  component: AVAnimatedMenuButton,
  tags: ["autodocs"],
  argTypes: {
    isOpened: {
      control: { type: "boolean" },
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

  parameters: {
    backgrounds: { default: "dark" },
  },

  args: {
    theme: "dark",
  },
};

export const DarkCrossOpened = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },

  args: {
    isOpened: true,
    variant: "cross",
    theme: "dark",
  },
};

export const DarkArrowDownOpened = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
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
