import type { Meta } from "@/types";
import { AVSpinner } from "@/components";
import { BOOTSTRAP_BASIC_SIZES, BOOTSTRAP_COLORS, SPINNER_VARIANTS } from "@/constants";

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
      options: [
        "ar",
        "ca",
        "da",
        "de",
        "en",
        "es",
        "fi",
        "fr",
        "is",
        "nl",
        "pl",
        "pt",
        "ro",
        "ru",
        "sv",
      ],
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

export const Light = {
  render: Template,

  args: {
    color: "light",
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Small = {
  render: Template,

  args: {
    color: "danger",
    size: "sm",
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
