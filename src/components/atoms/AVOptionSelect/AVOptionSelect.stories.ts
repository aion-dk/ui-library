import type { Meta } from "@/types";
import { AVOptionSelect } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVOptionSelect> = {
  title: "Design System/Atoms/AVOptionSelect",
  component: AVOptionSelect,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    rank: {
      control: { type: "number", min: 0, max: 9, step: 1 },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVOptionSelect },
  setup() {
    return { args };
  },
  template: '<AVOptionSelect v-bind="args" />',
});

export const Unchecked = {
  render: Template,

  args: {
    checked: false,
    rank: null,
  },
};

export const Checked = {
  render: Template,

  args: {
    checked: true,
    rank: null,
  },
};

export const Ranked = {
  render: Template,

  args: {
    checked: true,
    rank: 3,
  },
};
