import type { Meta } from "@/types";
import { AVOptionCheckbox } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVOptionCheckbox> = {
  title: "Design System/Atoms/AVOptionCheckbox",
  component: AVOptionCheckbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    optionReference: {
      control: { type: "text" },
    },
    checkBoxIndex: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    rank: {
      control: { type: "number", min: 0, max: 9, step: 1 },
    },
    disabled: {
      control: { type: "boolean" },
    },
    exclusiveError: {
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
  components: { AVOptionCheckbox },
  setup() {
    return { args };
  },
  template: '<AVOptionCheckbox v-bind="args" />',
});

export const Unchecked = {
  render: Template,

  args: {
    checked: false,
    optionReference: "",
    checkBoxIndex: 0,
    rank: null,
    disabled: false,
  },
};

export const Checked = {
  render: Template,

  args: {
    checked: true,
    optionReference: "",
    checkBoxIndex: 0,
    rank: null,
    disabled: false,
  },
};

export const Ranked = {
  render: Template,

  args: {
    checked: true,
    optionReference: "",
    checkBoxIndex: 0,
    rank: 3,
    disabled: false,
  },
};

export const DisabledUnchecked = {
  render: Template,

  args: {
    checked: false,
    optionReference: "",
    checkBoxIndex: 0,
    rank: null,
    disabled: true,
  },
};

export const DisabledChecked = {
  render: Template,

  args: {
    checked: true,
    optionReference: "",
    checkBoxIndex: 0,
    rank: null,
    disabled: true,
  },
};

export const DisabledCheckedRanked = {
  render: Template,

  args: {
    checked: true,
    optionReference: "",
    checkBoxIndex: 0,
    rank: 3,
    disabled: true,
  },
};
