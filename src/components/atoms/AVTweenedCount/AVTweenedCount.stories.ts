import type { Meta } from "@/types";
import { AVTweenedCount } from "@/components";

const meta: Meta<typeof AVTweenedCount> = {
  title: "Design System/Atoms/AVTweenedCount",
  component: AVTweenedCount,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
    },
    count: {
      control: { type: "number", min: 0, max: 99999, step: 50 },
    },
    duration: {
      control: { type: "number", min: 1, max: 10, step: 1 },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVTweenedCount },
  setup() {
    return { args };
  },
  template: '<AVTweenedCount v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    id: "storybook",
    count: 100,
    duration: 5,
  },
};
