import type { Meta } from "@/types";
import { SUPPORTED_LOCALES } from "@/constants";
import { AVSplitWeightHelper } from "@/components";

const meta: Meta<typeof AVSplitWeightHelper> = {
  title: "Design System/Molecules/AVSplitWeightHelper",
  component: AVSplitWeightHelper,
  tags: ["autodocs"],
  argTypes: {
    assignedWeight: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    unusedWeight: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    activeAssigned: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSplitWeightHelper },
  setup() {
    return { args };
  },
  template: '<AVSplitWeightHelper v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    assignedWeight: 4,
    unusedWeight: 6,
    activeAssigned: 4,
  },
};
