import type { Meta } from "@/types";
import { iconNames } from "@/helpers/iconHelper";
import { AVIcon } from "@/components";

const meta: Meta<typeof AVIcon> = {
  title: "Design System/Icons",
  component: AVIcon,
  parameters: {
    a11y: { disable: true }, // Disable a11y as we don't really have control over FontAwesom imported icons
  },
  argTypes: {
    icon: {
      control: { type: "select" },
      options: iconNames,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVIcon },
  setup() {
    return { args };
  },
  template: "<div style='width: 98vw; height: 96vh; display: flex; align-items: center; justify-content: center;'><AVIcon v-bind='args' /></div>",
});

export const Default = {
  render: Template,

  args: {
    icon: "bolt",
  },
};
