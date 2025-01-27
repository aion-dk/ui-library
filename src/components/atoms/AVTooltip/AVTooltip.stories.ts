import type { Meta } from "@/types";
import { AVTooltip } from "@/components";
import { FLOATING_VUE_TOOLTIP_POSITION } from "@/constants";
import { iconNames } from "@/helpers/iconHelper";

const meta: Meta<typeof AVTooltip> = {
  title: "Design System/Atoms/AVTooltip",
  component: AVTooltip,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
    position: {
      control: { type: "select" },
      options: FLOATING_VUE_TOOLTIP_POSITION,
    },
    icon: {
      control: { type: "select" },
      options: iconNames,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVTooltip },
  setup() {
    return { args };
  },
  template:
    '<div style="height: 400px; width: 100%; display: flex; align-items: center; justify-content: center;"><p>This is some text with a really weird<AVTooltip v-bind="args" /> word in the middle.</p></div>',
});

const Template2 = (args: Meta) => ({
  components: { AVTooltip },
  setup() {
    return { args };
  },
  template:
    '<div style="height: 400px; width: 100%; display: flex; align-items: center; justify-content: center;"><AVTooltip v-bind="args" /></div>',
});

export const Right = {
  render: Template,

  args: {
    content: "This means that this is not an ordinary word",
    icon: "circle-question",
    position: "right",
  },
};

export const Left = {
  render: Template,

  args: {
    content: "This means that this is not an ordinary word",
    icon: "circle-question",
    position: "left",
  },
};

export const Top = {
  render: Template,

  args: {
    content: "This means that this is not an ordinary word",
    icon: "circle-question",
    position: "top",
  },
};

export const Bottom = {
  render: Template,

  args: {
    content: "This means that this is not an ordinary word",
    icon: "circle-question",
    position: "bottom",
  },
};

export const WithText = {
  render: Template2,

  args: {
    text: "Tooltip",
    content: "This means that this is not an ordinary word",
    position: "right",
    icon: "circle-question",
  },
};
