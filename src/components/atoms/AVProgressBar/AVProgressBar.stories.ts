import type { Meta } from "@/types";
import { AVProgressBar } from "@/components";

const meta: Meta<typeof AVProgressBar> = {
  title: "Design System/Atoms/AVProgressBar",
  component: AVProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    hidePercentage: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVProgressBar },
  setup() {
    return { args };
  },
  template: '<AVProgressBar v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    value: 34,
  },
};

export const Finished = {
  render: Template,

  args: {
    value: 100,
  },
};

export const HidePercentage = {
  render: Template,

  args: {
    value: 34,
    hidePercentage: true,
  },
};
