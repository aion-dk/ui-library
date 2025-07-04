import type { Meta } from "@/types";
import { AVSpinner } from "@/components";
import {
  BOOTSTRAP_BASIC_SIZES,
  BOOTSTRAP_COLORS,
  SPINNER_VARIANTS,
  SUPPORTED_LOCALES,
} from "@/constants";

const meta: Meta<typeof AVSpinner> = {
  title: "Design System/Atoms/AVSpinner",
  component: AVSpinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: BOOTSTRAP_BASIC_SIZES,
    },
    color: {
      control: { type: "select" },
      options: BOOTSTRAP_COLORS,
    },
    variant: {
      control: { type: "select" },
      options: SPINNER_VARIANTS,
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSpinner },
  setup() {
    return { args };
  },
  template: '<AVSpinner v-bind="args" />',
});

export const Primary = {
  render: Template,

  args: {
    color: "primary",
  },
};

export const Theme = {
  render: Template,

  args: {
    color: "theme",
  },
};

export const Light = {
  render: Template,

  args: {
    color: "light",
  },

  globals: {
    backgrounds: { value: "dark" },
  },
};

export const Small = {
  render: Template,

  args: {
    color: "danger",
    size: "sm",
  },
};

export const Large = {
  render: Template,

  args: {
    color: "info",
    size: "lg",
  },
};

export const Grow = {
  render: Template,

  args: {
    color: "success",
    variant: "spinner-grow",
  },
};

export const GrowSmall = {
  render: Template,

  args: {
    size: "sm",
    variant: "spinner-grow",
  },
};
