import type { Meta } from "@/types";
import { AVWaitingDots } from "@/components";

const meta: Meta<typeof AVWaitingDots> = {
  title: "Design System/Atoms/AVWaitingDots",
  component: AVWaitingDots,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVWaitingDots },
  setup() {
    return { args };
  },
  template: '<AVWaitingDots v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {},
};
