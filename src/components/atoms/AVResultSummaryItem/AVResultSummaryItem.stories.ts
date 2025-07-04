import type { Meta } from "@/types";
import { AVResultSummaryItem } from "@/components";

const meta: Meta<typeof AVResultSummaryItem> = {
  title: "Design System/Atoms/AVResultSummaryItem",
  component: AVResultSummaryItem,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    reference: {
      control: { type: "text" },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVResultSummaryItem },
  setup() {
    return { args };
  },
  template: '<AVResultSummaryItem v-bind="args" />',
});

export const Light = {
  render: Template,

  args: {
    title: "Some result summary information",
    value: "56",
    reference: "test",
    theme: "light",
  },
};

export const Dark = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    title: "Some result summary information",
    value: "56",
    reference: "test",
    theme: "dark",
  },
};
