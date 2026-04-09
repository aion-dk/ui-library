import type { Meta } from "@/types";
import { AVOptionCounter } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVOptionCounter> = {
  title: "Design System/Atoms/AVOptionCounter",
  component: AVOptionCounter,
  tags: ["autodocs"],
  argTypes: {
    maxAmount: {
      control: { type: "number", min: 0, max: 99, step: 1 },
    },
    disabled: {
      control: { type: "boolean" },
    },
    invalid: {
      control: { type: "boolean" },
    },
    isQuadratic: {
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
  components: { AVOptionCounter },
  setup() {
    return { args };
  },
  template: '<AVOptionCounter v-bind="args" />',
});

export const Unchecked = {
  render: Template,

  args: {
    maxAmount: 15,
  },
};

export const Checked = {
  render: Template,

  args: {
    amount: 6,
    maxAmount: 15,
  },
};

export const QuadraticCheckedWithHelpTooltip = {
  render: Template,

  args: {
    amount: 6,
    maxAmount: 15,
    isQuadratic: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    amount: 6,
    maxAmount: 15,
    disabled: true,
  },
};

export const Invalid = {
  render: Template,

  args: {
    amount: 6,
    maxAmount: 15,
    invalid: true,
  },
};
